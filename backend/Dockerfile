FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY main.py .

# Эта строка необязательна
EXPOSE 10000

# КЛЮЧЕВОЕ ИСПРАВЛЕНИЕ: используем exec-форму и shell
CMD exec gunicorn main:app -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:$PORT