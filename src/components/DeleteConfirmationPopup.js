// DeleteConfirmationPopup.js
import React from 'react';

/**
 * DeleteConfirmationPopup - A modal popup component to confirm task deletion.
 * Displays a message with the task title and provides options to confirm or cancel.
 * 
 * Props:
 * - isOpen (boolean): Determines if the popup is visible.
 * - onConfirm (function): Callback function to execute when the user confirms deletion.
 * - onCancel (function): Callback function to close the popup without deleting.
 * - taskTitle (string): The title of the task to be deleted, displayed in the popup.
 */
const DeleteConfirmationPopup = ({ isOpen, onConfirm, onCancel, taskTitle }) => {
  if (!isOpen) return null; // If popup is not open, return null to prevent rendering

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        width: '300px',
        textAlign: 'center'
      }}>
        <h3>Delete Task</h3>
        <p>Are you sure you want to delete the task: <strong>{taskTitle}</strong>?</p>
        <div style={{ marginTop: '20px' }}>
          <button 
            onClick={onConfirm} 
            style={{
              marginRight: '10px',
              padding: '5px 10px',
              backgroundColor: '#5bc0de',
              color: 'white',
              border: 'none',
              borderRadius: '4px'
            }}
          >
            Yes, Delete
          </button>
          <button 
            onClick={onCancel} 
            style={{
              padding: '5px 10px',
              backgroundColor: '#d9534f',
              color: 'white',
              border: 'none',
              borderRadius: '4px'
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationPopup;
