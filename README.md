# Task Management Application

## Overview
This is a full-stack task management application with a React frontend and a Flask backend. MySQL is used for database storage.

## Prerequisites
- **Node.js** (v14 or higher)
- **Python** (v3.x)
- **MySQL** (any recent version)

## Getting Started

### 1. Backend Setup (Flask API)
1. **Navigate to the backend directory**:
   cd path/to/backend-directory
2. **Create a virtual environment**:
    python -m venv venv
    source venv/bin/activate  # For Windows: `venv\Scripts\activate`
3. **Set up MySQL database**:
    Log in to MySQL and create the database:
        CREATE DATABASE Task;
    Update the database connection details in app.py with your MySQL credentials.
4. **Create required tables in the database**:
    CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) UNIQUE,
    password VARCHAR(255)
    );

    CREATE TABLE tasks (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        completed BOOLEAN DEFAULT FALSE,
        user_id INT,
        FOREIGN KEY (user_id) REFERENCES users(id)
    );
5. **Run the Flask server**

### 2. Frontend Setup (React Application)
1. **Navigate to the frontend directory**:
    cd path/to/frontend-directory
2. **Install dependencies**:
    npm install
3. **Run the React development server**:
    npm start

### Usage
    Open the application in your browser at http://localhost:3000.
    Register a new user to log in to the application.
    Manage tasks: add, edit, delete, and filter tasks.
### Troubleshooting
    Database Connection Issues: Ensure MySQL is running and accessible. Verify connection settings in app py.
    CORS Errors: Check that CORS is enabled in app.py to allow requests from http://localhost:3000.
    Missing Dependencies: Run pip install -r requirements.txt and npm install to ensure all packages are installed.


# Database Schema
    The database consists of two main tables: users and tasks.
# Tables
    users:
        id (INT, Primary Key, Auto Increment): Unique identifier for each user.
        username (VARCHAR(100), Unique): Stores the unique username for each user.
        password (VARCHAR(255)): Stores the hashed password of the user.
    tasks:
    id (INT, Primary Key, Auto Increment): Unique identifier for each task.
    title (VARCHAR(255), NOT NULL): Title of the task, required for every entry.
    description (TEXT): Description of the task.
    completed (BOOLEAN, Default FALSE): Indicates whether the task is completed or not.
    user_id (INT, Foreign Key): References the id in the users table, linking each task to a specific user.
# Relationships
    There is a one-to-many relationship between users and tasks, where each user can have multiple tasks but each task belongs to only one user.


# API Endpoints
    The API exposes various endpoints for user management and task operations. Below are the details of each endpoint:

# Authentication and User Management
    POST /register: Registers a new user.
        Request Body: { "username": "<username>", "password": "<password>" }
        Response: Success message on successful registration, or error if the username is taken.
    POST /login: Authenticates a user and provides a JWT token.
        Request Body: { "username": "<username>", "password": "<password>" }
        Response: A JWT token for accessing secured endpoints.
# Task Management (Requires Authorization)
    Add the token in the Authorization header as Bearer <token> for each of these requests:
    GET /tasks: Fetches all tasks for the authenticated user.
        Response: List of tasks associated with the logged-in user.
    GET /tasks/<task_id>: Retrieves details of a specific task by task_id.
        Response: The task details if it exists and belongs to the authenticated user, or an error if it does not.
    POST /tasks: Creates a new task.
        Request Body: { "title": "<title>", "description": "<description>", "completed": false }
        Response: Success message and status code 201 on successful creation.
    PUT /tasks/<task_id>: Updates an existing task.
        Request Body: { "title": "<new_title>", "description": "<new_description>", "completed": <true_or_false> }
        Response: Success message if the update is successful, or an error if the task is not found.
    DELETE /tasks/<task_id>: Deletes a specific task.
        Response: Success message if the deletion is successful, or an error if the task is not found.





