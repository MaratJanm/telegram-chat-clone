# Telegram Chat Clone

Простой клон чата Telegram для одного пользователя.
Стек: React + TypeScript + Tailwind CSS + Vite (фронтенд), FastAPI (бэкенд), Docker + Docker Compose.

## Структура проекта
telegram-chat/
├── backend/
│   ├── main.py          # Основной файл бэкенда с API эндпоинтами
│   ├── Dockerfile       # Файл для создания Docker-образа бэкенда
│   └── requirements.txt # Зависимости Python для бэкенда
├── frontend/
│   ├── src/
│   │   ├── App.tsx      # Главный компонент React приложения
│   │   ├── index.css    # Основные стили приложения
│   │   ├── main.tsx     # Точка входа в React приложение
│   │   ├── vite-env.d.ts # Определения типов для Vite
│   │   ├── api/
│   │   │   └── messages.ts # API клиент для работы с сообщениями
│   │   ├── components/
│   │   │   ├── Chat.tsx          # Главный компонент чата
│   │   │   ├── ChatHeader.tsx    # Компонент заголовка чата
│   │   │   ├── Message.tsx       # Компонент отдельного сообщения
│   │   │   ├── MessageInput.tsx  # Компонент ввода сообщения
│   │   │   └── MessageList.tsx   # Компонент списка сообщений
│   │   └── types/
│   │       └── index.ts   # Определения типов TypeScript
│   ├── public/
│   ├── Dockerfile       # Файл для создания Docker-образа фронтенда
│   └── nginx.conf       # Конфигурация Nginx для продакшена
├── docker-compose.yml   # Файл для описания и запуска многоконтейнерных приложений
├── .env                 # Файл с переменными окружения
└── README.md            # Этот файл с описанием проекта


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
