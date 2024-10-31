import React from 'react';

/**
 * LoadingErrorMessages - Displays loading and error messages conditionally.
 * 
 * Props:
 * - loading (boolean): Indicates if a loading message should be displayed.
 * - error (string): The error message to display if an error has occurred.
 * 
 * Renders:
 * - A loading message when `loading` is true.
 * - An error message, styled in red, when `error` contains a message.
 */
const LoadingErrorMessages = ({ loading, error }) => {
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default LoadingErrorMessages;
