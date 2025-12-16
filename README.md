# Telegram Chat Clone

Простой клон чата Telegram для одного пользователя.
Стек: React + TypeScript + Tailwind CSS + Vite (фронтенд), FastAPI (бэкенд), Docker + Docker Compose.

## Структура проекта
telegram-chat/
├── backend/
│   ├── main.py          # Основной файл бэкенда с API
│   ├── Dockerfile       # Docker-образ бэкенда
│   └── requirements.txt # Зависимости Python
├── frontend/
│   ├── src/
│   │   ├── App.tsx          # Главный компонент React
│   │   ├── index.css        # Основные стили
│   │   ├── main.tsx         # Точка входа React
│   │   ├── vite-env.d.ts    # Типы для Vite
│   │   ├── api/
│   │   │   └── messages.ts  # API-клиент для сообщений
│   │   ├── components/
│   │   │   ├── Chat.tsx         # Главный компонент чата
│   │   │   ├── ChatHeader.tsx   # Заголовок чата
│   │   │   ├── Message.tsx      # Одно сообщение
│   │   │   ├── MessageInput.tsx # Поле ввода сообщения
│   │   │   └── MessageList.tsx  # Список сообщений
│   │   └── types/
│   │       └── index.ts     # Типы TypeScript
│   ├── public/
│   ├── Dockerfile           # Docker-образ фронтенда
│   └── nginx.conf           # Конфиг Nginx для продакшена
├── docker-compose.yml       # Запуск многоконтейнерного приложения
├── .env                     # Переменные окружения
└── README.md                # Описание проекта


## Запуск локально (рекомендуется)

```bash
docker compose up --build
```

Фронтенд: http://localhost:3000
API: http://localhost:8000

## Запуск без Docker
Бэкенд:
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
Фронтенд:
```bash
cd ..
cd frontend
npm install
npm run dev
```

## API

| Метод   | Эндпоинт        | Описание                   |
|---------|-----------------|----------------------------|
| GET     | `/api/messages` | Получить все сообщения     |
| POST    | `/api/messages` | Отправить новое сообщение  |
| DELETE  | `/api/messages` | Очистить все сообщения     |


