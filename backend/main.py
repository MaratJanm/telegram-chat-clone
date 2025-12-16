from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
from typing import List
import uuid
import logging

app = FastAPI(title="Telegram Chat API")
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# CORS настройки
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Модели данных
class MessageCreate(BaseModel):
    text: str

class Message(BaseModel):
    id: str
    text: str
    timestamp: str
    is_read: bool = True

# Хранилище сообщений в памяти
messages_store: List[Message] = []

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Telegram Chat API"}

@app.get("/api/messages", response_model=List[Message])
def get_messages():
    """Получить все сообщения"""
    try:
        logger.info("Fetching all messages")
        return messages_store
    except Exception as e:
        logger.error(f"Error fetching messages: {str(e)}")
        raise

@app.post("/api/messages", response_model=Message)
def create_message(message: MessageCreate):
    """Создать новое сообщение"""
    try:
        logger.info(f"Creating new message: {message.text}")
        new_message = Message(
            id=str(uuid.uuid4()),
            text=message.text,
            timestamp=datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            is_read=True
        )
        messages_store.append(new_message)
        logger.info(f"Message created successfully with ID: {new_message.id}")
        return new_message
    except Exception as e:
        logger.error(f"Error creating message: {str(e)}")
        raise

@app.delete("/api/messages")
def clear_messages():
    """Очистить все сообщения"""
    try:
        logger.info("Clearing all messages")
        messages_store.clear()
        logger.info("All messages cleared successfully")
        return {"status": "ok", "message": "All messages cleared"}
    except Exception as e:
        logger.error(f"Error clearing messages: {str(e)}")
        raise

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)