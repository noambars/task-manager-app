
import React, { useState } from 'react';
import axios from 'axios';
import CreateUserPopup from './CreateUserPopup';

/**
 * Login - Component for user login with options for creating a new user.
 * 
 * Props:
 * - onLogin (function): Function to call upon successful login to update application state.
 * 
 * State:
 * - username (string): Stores the entered username.
 * - password (string): Stores the entered password.
 * - error (string): Stores any login error messages.
 * - isCreateUserOpen (boolean): Controls visibility of the CreateUserPopup component.
 * 
 * Functions:
 * - handleLogin: Sends a login request to the backend, stores the received JWT in localStorage, and triggers `onLogin` on success.
 * - setIsCreateUserOpen: Toggles the visibility of the CreateUserPopup.
 * 
 * Renders:
 * - A login form with fields for `username` and `password`, and buttons for "Login" and "Create User".
 * - Displays error message if login fails.
 * - Includes a `CreateUserPopup` component that opens when the "Create User" button is clicked.
 */
const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);

  // Handles user login by sending credentials to backend and saving the token on success
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/login', { username, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      onLogin();  // Updates application state upon successful login
    } catch (err) {
      setError('Login failed. Please check your username and password.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', width: '300px' }}>
        <h2 style={{ marginBottom: '20px' }}>Login</h2>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          style={{ marginBottom: '10px', padding: '8px', width: '100%' }}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          style={{ marginBottom: '20px', padding: '8px', width: '100%' }}
        />
        <button 
          onClick={handleLogin} 
          style={{ padding: '10px', marginBottom: '10px', width: '100%', cursor: 'pointer' }}
        >
          Login
        </button>
        <button 
          onClick={() => setIsCreateUserOpen(true)} 
          style={{ padding: '10px', width: '100%', cursor: 'pointer' }}
        >
          Create User
        </button>
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

        {isCreateUserOpen && (
          <CreateUserPopup
            closePopup={() => setIsCreateUserOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Login;
