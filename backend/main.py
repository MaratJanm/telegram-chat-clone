from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from contextlib import asynccontextmanager
from datetime import datetime
from typing import List, Optional
import uuid
import os
import asyncio
import asyncpg

# Database connection pool
db_pool: Optional[asyncpg.Pool] = None

DATABASE_URL = os.environ.get("DATABASE_URL")


async def init_db():
    global db_pool
    if not DATABASE_URL:
        print("No DATABASE_URL, running without database")
        return
    
    # Retry connection
    db_url = DATABASE_URL.replace("postgres://", "postgresql://")
    
    for attempt in range(10):
        try:
            print(f"Connecting to database (attempt {attempt + 1}/10)...")
            db_pool = await asyncpg.create_pool(db_url, min_size=1, max_size=10)
            
            # Create table
            async with db_pool.acquire() as conn:
                await conn.execute('''
                    CREATE TABLE IF NOT EXISTS messages (
                        id UUID PRIMARY KEY,
                        text TEXT NOT NULL,
                        timestamp VARCHAR(10) NOT NULL,
                        is_outgoing BOOLEAN NOT NULL,
                        created_at TIMESTAMP DEFAULT NOW()
                    )
                ''')
            print("Database connected successfully!")
            return
        except Exception as e:
            print(f"Database connection failed: {e}")
            if attempt < 9:
                await asyncio.sleep(2)
            else:
                print("Could not connect to database, running without persistence")


async def close_db():
    global db_pool
    if db_pool:
        await db_pool.close()


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield
    await close_db()


app = FastAPI(title="Telegram Chat API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Models
class MessageCreate(BaseModel):
    text: str
    is_outgoing: bool = True


class Message(BaseModel):
    id: str
    text: str
    timestamp: str
    is_outgoing: bool


class MessagesResponse(BaseModel):
    messages: List[Message]


# In-memory fallback
messages_memory: List[dict] = []


@app.get("/")
def root():
    return {"status": "ok", "service": "Telegram Chat API"}


@app.get("/api/messages", response_model=MessagesResponse)
async def get_messages():
    if db_pool:
        async with db_pool.acquire() as conn:
            rows = await conn.fetch(
                'SELECT id, text, timestamp, is_outgoing FROM messages ORDER BY created_at ASC'
            )
            messages = [
                {
                    "id": str(row["id"]),
                    "text": row["text"],
                    "timestamp": row["timestamp"],
                    "is_outgoing": row["is_outgoing"]
                }
                for row in rows
            ]
            return {"messages": messages}
    return {"messages": messages_memory}


@app.post("/api/messages", response_model=Message)
async def create_message(message: MessageCreate):
    if not message.text.strip():
        raise HTTPException(status_code=400, detail="Message text cannot be empty")
    
    new_message = {
        "id": str(uuid.uuid4()),
        "text": message.text.strip(),
        "timestamp": datetime.now().strftime("%H:%M"),
        "is_outgoing": message.is_outgoing
    }
    
    if db_pool:
        async with db_pool.acquire() as conn:
            await conn.execute(
                '''INSERT INTO messages (id, text, timestamp, is_outgoing) 
                   VALUES ($1, $2, $3, $4)''',
                uuid.UUID(new_message["id"]),
                new_message["text"],
                new_message["timestamp"],
                new_message["is_outgoing"]
            )
    else:
        messages_memory.append(new_message)
    
    return new_message


@app.delete("/api/messages")
async def clear_messages():
    global messages_memory
    if db_pool:
        async with db_pool.acquire() as conn:
            await conn.execute('DELETE FROM messages')
    else:
        messages_memory = []
    return {"status": "ok", "message": "All messages cleared"}


if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)