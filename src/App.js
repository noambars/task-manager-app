import React, { useState } from 'react';
import Login from './components/Login';
import Tasks from './Tasks';

/**
 * App - Root component of the application.
 *
 * State:
 * - isAuthenticated (boolean): Tracks if a user is authenticated.
 *
 * Functions:
 * - handleLogin: Updates `isAuthenticated` to `true` after a successful login.
 *
 * Renders:
 * - The `Tasks` component if the user is authenticated.
 * - The `Login` component if the user is not authenticated.
 *   Passes `handleLogin` as a prop to `Login` for state update on successful login.
 */
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // handleLogin - Function to set user as authenticated
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <div>
      {isAuthenticated ? (
        <Tasks /> // Displays task management UI when logged in
      ) : (
        <Login onLogin={handleLogin} /> // Displays login screen with login handler
      )}
    </div>
  );
};

export default App;
