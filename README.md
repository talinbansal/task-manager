# Task Manager App

## Overview
A web-based task manager application that helps users organize, prioritize, and manage daily tasks. Users can add, edit, and delete tasks, with overdue tasks automatically highlighted. The app also includes a smart backend module for basic natural language processing (NLP), allowing for potential AI-based task suggestions and classification.

## Tech Stack
**Frontend:** React (TypeScript), Bootstrap  
**Backend:** Node.js, Express.js  
**Database:** SQLite  
**AI Module:** Node.js (Hugging Face Inference API)

## Features
### ✅ Task CRUD (Create, Read, Update, Delete)
Users can add new tasks with specific dates and times, edit existing ones, and delete completed or irrelevant tasks.

### 💡 AI-Powered Task Tagging
An integrated NLP module using Hugging Face's inference API analyzes each task's description and automatically assigns a category tag (e.g., work, study, personal, other) to help organize and prioritize tasks.

### 🔁 Real-time Sync
Frontend and backend are synced for seamless task updates without manual refreshes.

## Installation & Setup

### Install Client Dependencies
```
cd client/task-manager-project
npm install
```

### Install Backend Dependencies
```
cd ../../../staff
npm install
```

### Set Up Environment Variables
#### Create a .env file inside the staff/ directory and add:
```
PORT=5001
HUGGING_FACE_KEY=your_hugging_face_api_key
```

### Start the Backend Server
```
node server.js
```

### Start the Frontend App
#### In a new terminal
```
cd client/task-manager-project
npm run dev
```

#### The frontend will run on http://localhost:5173, and the backend on http://localhost:5001.

### Clone the Repository
```bash
git clone https://github.com/talinbansal/task-manager.git
cd task-manager-project
```

## API Endpoints (Backend-Express)
| Method |     Endpoint    |            Description            |
| ------ | --------------- | --------------------------------- |
| GET    | /populate_tasks | Fetch all tasks from the database |
| POST   |     /tasks      | Add a new task                    |
| POST   |  /update_tasks  | Update a task                     |
| POST   |  /delete_tasks  | Delete a task                     |
| POST   |    /classify    | Classify a task                   |

## Project Structure
```
task-manager-project/
├── client/
│   └── task-manager-project/
│       ├── public/
│       ├── src/
│       │   ├── components/
│       │   │   ├── AddTask/
│       │   │   ├── EditTask/
│       │   │   └── EnterTask/
│       │   ├── App.tsx
│       │   └── main.tsx
│       └── vite.config.ts
├── staff/
│   ├── server.js
│   ├── tasks.db
│   ├── nlp/
│   │   └── classifier.js
├── package.json
└── .env
```
