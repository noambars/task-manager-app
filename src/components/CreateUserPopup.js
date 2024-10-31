
import React, { useState } from 'react';
import axios from 'axios';

/**
 * CreateUserPopup - A popup component for creating a new user.
 * Allows user to enter a username and password, then sends a request to the backend
 * to create the user. Displays success or error messages based on the response.
 *
 * Props:
 * - closePopup (function): Function to close the popup when "Cancel" is clicked.
 */
const CreateUserPopup = ({ closePopup }) => {
  // State variables for user inputs and response messages
  const [username, setUsername] = useState(''); // Stores the username input
  const [password, setPassword] = useState(''); // Stores the password input
  const [error, setError] = useState(''); // Error message for failed user creation
  const [success, setSuccess] = useState(''); // Success message for successful user creation

  /**
   * handleCreateUser - Sends a POST request to create a new user with the provided
   * username and password. Displays an error message if creation fails, or success message if successful.
   */
  const handleCreateUser = async () => {
    try {
      await axios.post('http://127.0.0.1:5000/register', { username, password });
      setSuccess('User created successfully!');
      setError('');
      setUsername('');
      setPassword('');
    } catch (err) {
      setError('Failed to create user. Please try a different username.');
      setSuccess('');
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <h2>Create User</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleCreateUser} style={styles.button}>Create</button>
        <button onClick={closePopup} style={styles.button}>Cancel</button>
        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}
      </div>
    </div>
  );
};

/**
 * styles - An object containing CSS styling for the popup and overlay elements.
 */
const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  popup: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '400px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
  },
  input: {
    width: '90%',
    margin: '8px 0',
    padding: '8px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    margin: '5px',
    padding: '8px 12px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
  },
  success: {
    color: 'green',
  },
};

export default CreateUserPopup;
