# Task Management Application

## Overview

A full-stack Task Management Application built with Node.js, Express, MongoDB, and React.  
The application allows users to securely register, login, and manage their tasks.

All request and response communication between the client and server is transmitted over **HTTPS**, ensuring encrypted communication. Sensitive data such as passwords are securely hashed using **bcrypt**, and authentication tokens are stored in **HTTP-only cookies** for enhanced security.

---

## Tech Stack

Frontend: React / Next.js  
Backend: Node.js + Express  
Database: MongoDB Atlas  
Authentication: JWT  
Security: HTTP-only cookies, bcrypt password hashing, HTTPS encrypted communication

---

## Features

- User Registration and Login
- JWT-based Authentication
- Password hashing using bcrypt
- HTTP-only cookie token storage
- Create, Read, Update, Delete tasks
- Pagination in task listing
- Search tasks by title
- Filter tasks by status
- Users can access only their own tasks
- Protected routes
- Clean and responsive UI

---

## API Endpoints

### Authentication

POST /api/user/register  
POST /api/user/login  
POST /api/user/logout  

### User

GET /api/user/me  
PUT /api/user/profile  
PUT /api/user/password  

### Tasks

POST /api/tasks  
GET /api/tasks  
GET /api/tasks/:id  
PUT /api/tasks/:id  
DELETE /api/tasks/:id  

Query parameters for tasks:

GET /api/tasks?page=1&limit=10  
GET /api/tasks?search=meeting  
GET /api/tasks?status=true  

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repo-url>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4. Run the server

```bash
npm run dev
```

---

## Deployment

Frontend deployed on: Vercel  
Backend deployed on: Vercel / Render / Railway

---

## Live Demo

Frontend URL:  
https://task-client-two-omega.vercel.app  

Backend API URL:  
https://task-backend-virid.vercel.app  

---

## Author

Atharv Joshi