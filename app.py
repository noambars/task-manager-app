from flask import Flask, jsonify, request
from flask_cors import CORS
import pymysql
import bcrypt
import jwt
import datetime
from functools import wraps

# Initialize the Flask application and set the secret key for JWT
app = Flask(_name_)
SECRET_KEY = 'noam123'

# Enable CORS to allow cross-domain requests
CORS(app, supports_credentials=True)

def get_db_connection():
    """
    Establishes a connection to the MySQL database.
    Returns the connection object or None if there's a connection error.
    """
    try:
        connection = pymysql.connect(
            host='localhost',
            user='root',
            password='123',
            database='Task'
        )
        return connection
    except pymysql.MySQLError as e:
        print("Database connection error:", e)
        return None

@app.route('/register', methods=['POST'])
def register():
    """
    Registers a new user with a username and password.
    Checks if the username already exists and returns an appropriate response.
    """
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400
    
    connection = get_db_connection()
    if connection is None:
        return jsonify({"error": "Failed to connect to the database"}), 500
    
    try:
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
        existing_user = cursor.fetchone()
        if existing_user:
            return jsonify({"error": "Username already exists"}), 400
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        cursor.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username, hashed_password))
        connection.commit()
        return jsonify({"message": "User created successfully"}), 201
    except Exception as e:
        print("Error during user registration:", e)
        return jsonify({"error": "Failed to create user"}), 500
    finally:
        cursor.close()
        connection.close()

@app.route('/login', methods=['POST'])
def login():
    """
    Authenticates a user by verifying the username and password.
    Returns a JWT token if authentication is successful.
    """
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400
    
    connection = get_db_connection()
    if connection is None:
        return jsonify({"error": "Failed to connect to the database"}), 500
    
    try:
        cursor = connection.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
        user = cursor.fetchone()
        if user and bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
            token = jwt.encode({
                'user_id': user['id'],
                'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
            }, SECRET_KEY, algorithm='HS256')
            return jsonify({'token': token}), 200
        else:
            return jsonify({'error': 'Invalid username or password'}), 401
    except Exception as e:
        print("Error during login:", e)
        return jsonify({'error': 'Failed to login'}), 500
    finally:
        cursor.close()
        connection.close()

def token_required(f):
    """
    Decorator that checks for a valid JWT token in the request header.
    Returns an error if the token is missing or invalid.
    """
    @wraps(f)
    def wrapper(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token or "Bearer" not in token:
            return jsonify({'error': 'Token is missing or invalid'}), 403
        token = token.split(" ")[1]
        try:
            data = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            user_id = data['user_id']
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token has expired'}), 403
        except jwt.InvalidTokenError:
            return jsonify({'error': 'Invalid token'}), 403
        return f(user_id, *args, **kwargs)
    return wrapper

@app.route('/tasks', methods=['GET'])
@token_required
def get_tasks(user_id):
    """
    Retrieves all tasks for the authenticated user.
    """
    connection = get_db_connection()
    if connection is None:
        return jsonify({"error": "Failed to connect to the database"}), 500
    try:
        cursor = connection.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT * FROM tasks WHERE user_id = %s", (user_id,))
        tasks = cursor.fetchall()
        return jsonify(tasks)
    except Exception as e:
        print("Error during fetching tasks:", e)
        return jsonify({'error': 'Failed to fetch tasks'}), 500
    finally:
        cursor.close()
        connection.close()

@app.route('/tasks/<int:task_id>', methods=['GET'])
@token_required
def get_task(user_id, task_id):
    """
    Retrieves a specific task by ID for the authenticated user.
    """
    connection = get_db_connection()
    if connection is None:
        return jsonify({"error": "Failed to connect to the database"}), 500
    try:
        cursor = connection.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT * FROM tasks WHERE id = %s AND user_id = %s", (task_id, user_id))
        task = cursor.fetchone()
        if task:
            return jsonify(task), 200
        else:
            return jsonify({'error': 'Task not found'}), 404
    except Exception as e:
        print("Error during fetching task:", e)
        return jsonify({'error': 'Failed to retrieve task'}), 500
    finally:
        cursor.close()
        connection.close()

@app.route('/tasks', methods=['POST'])
@token_required
def create_task(user_id):
    """
    Creates a new task for the authenticated user.
    Requires a title; description is optional.
    """
    data = request.get_json()
    title = data.get('title')
    description = data.get('description')
    if not title or title.strip() == "":
        return jsonify({'error': 'Title is required'}), 400
    
    connection = get_db_connection()
    if connection is None:
        return jsonify({"error": "Failed to connect to the database"}), 500
    
    try:
        completed = data.get('completed', False)
        cursor = connection.cursor()
        cursor.execute("INSERT INTO tasks (title, description, completed, user_id) VALUES (%s, %s, %s, %s)",
                       (title, description, completed, user_id))
        connection.commit()
        return jsonify({'message': 'Task created successfully'}), 201
    except Exception as e:
        print("Error during task creation:", e)
        return jsonify({'error': 'Failed to create task'}), 500
    finally:
        cursor.close()
        connection.close()

@app.route('/tasks/<int:id>', methods=['PUT'])
@token_required
def update_task(user_id, id):
    """
    Updates an existing task for the authenticated user.
    Requires both title and description fields.
    """
    data = request.get_json()
    title = data.get('title')
    description = data.get('description')
    if title is None or description is None:
        return jsonify({"error": "Title and description are required"}), 400
    
    connection = get_db_connection()
    if connection is None:
        return jsonify({"error": "Failed to connect to the database"}), 500
    
    try:
        completed = data.get('completed')
        cursor = connection.cursor()
        cursor.execute("UPDATE tasks SET title = %s, description = %s, completed = %s WHERE id = %s AND user_id = %s",
                       (title, description, completed, id, user_id))
        connection.commit()
        return jsonify({'message': 'Task updated successfully'})
    except Exception as e:
        print("Error during task update:", e)
        return jsonify({'error': 'Failed to update task'}), 500
    finally:
        cursor.close()
        connection.close()

@app.route('/tasks/<int:id>', methods=['DELETE'])
@token_required
def delete_task(user_id, id):
    """
    Deletes a specific task by ID for the authenticated user.
    """
    connection = get_db_connection()
    if connection is None:
        return jsonify({"error": "Failed to connect to the database"}), 500
    
    try:
        cursor = connection.cursor()
        cursor.execute("DELETE FROM tasks WHERE id = %s AND user_id = %s", (id, user_id))
        connection.commit()
        return jsonify({'message': 'Task deleted successfully'})
    except Exception as e:
        print("Error during task deletion:", e)
        return jsonify({'error': 'Failed to delete task'}), 500
    finally:
        cursor.close()
        connection.close()

if _name_ == '_main_':
    app.run(debug=True)