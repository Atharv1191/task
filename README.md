# Task Management Application

## Overview

A full-stack Task Management Application built with Node.js, Express, MongoDB, and React/Next.js.
The application allows users to register, login, and manage their tasks securely.

## Tech Stack

Frontend: React / Next.js
Backend: Node.js + Express
Database: MongoDB Atlas
Authentication: JWT
Security: HTTP-only cookies, bcrypt password hashing

## Features

* User Registration and Login
* JWT-based Authentication
* Password hashing using bcrypt
* HTTP-only cookie token storage
* Create, Read, Update, Delete tasks
* Pagination in task listing
* Search tasks by title
* Filter tasks by status
* Users can access only their own tasks
* Protected routes
* Clean and responsive UI

## API Endpoints

### Authentication

POST /api/user/register
POST /api/user/login

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

## Setup Instructions

1. Clone the repository

git clone <repo-url>

2. Install dependencies

npm install

3. Create `.env` file

PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

4. Run the server

npm run dev

## Deployment

Frontend deployed on: Vercel
Backend deployed on: Render / Railway

## Live Demo

Frontend URL:https://task-client-two-omega.vercel.app
Backend API URL:https://task-backend-virid.vercel.app
## Author

Atharv Joshi
