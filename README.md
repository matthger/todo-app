# To-Do App

A simple full-stack To-Do application built with Django REST Framework, React, TypeScript, and Tailwind CSS.

## Features
- Full CRUD operations for to-dos
- Fields: title, description (optional), status
- Responsive UI with Tailwind CSS
- REST API at `/api/todos/`
- SQLite database

## Project Structure
```
todo-app/
├── backend/ # Django + DRF
│ ├── manage.py
│ ├── todo_api/
│ └── todos/
└── frontend/ # React + TypeScript + Tailwind
    ├── src/
    ├── package.json
    └── tsconfig.json
└── README.md
```

## Setup

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate      # or venv\Scripts\activate on Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
Backend runs at: http://localhost:8000/api/todos/

### Frontend
```bash
cd frontend
npm install
npx @tailwindcss/cli -i ./src/index.css -o ./src/output.css --watch
npm start
```
Frontend runs at: http://localhost:3000/

## API Endpoints
| Method | Endpoint           | Description               |
|--------|--------------------|---------------------------|
| GET    | `/api/todos/`      | List all available to-dos |
| POST   | `/api/todos/`      | Create a new to-do        |
| GET    | `/api/todos/:id/`  | Retrieve a single to-do   |
| PUT    | `/api/todos/:id/`  | Update a to-do            |
| DELETE | `/api/todos/:id/`  | Delete an existing to-do  |
