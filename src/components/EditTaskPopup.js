
import React, { useState, useEffect } from 'react';

/**
 * EditTaskPopup - A modal popup component for editing task details.
 * Allows the user to modify the title and description of a selected task and save changes.
 * 
 * Props:
 * - task (object): The task to be edited, containing initial values for title and description.
 * - saveChanges (function): Callback function to save the updated task data.
 * - closePopup (function): Callback function to close the popup without saving changes.
 */
const EditTaskPopup = ({ task, saveChanges, closePopup }) => {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');

  // Update the input fields when a new task is passed in
  useEffect(() => {
    setTitle(task?.title || '');
    setDescription(task?.description || '');
  }, [task]);

  /**
   * handleSave - Validates title input and triggers the saveChanges callback
   * with updated task information.
   */
  const handleSave = () => {
    if (title.trim() === '') {
      alert('Title is required');
      return;
    }
    saveChanges({ ...task, title, description });
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <h3>Edit Task</h3>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
          style={styles.input}
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task Description"
          style={styles.textarea}
        />
        <div style={styles.buttonContainer}>
          <button onClick={handleSave} style={styles.saveButton}>Save</button>
          <button onClick={closePopup} style={styles.cancelButton}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

// Inline styling for the component
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
    width: '100%',
    margin: '8px 0',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  textarea: {
    width: '100%',
    height: '80px',
    margin: '8px 0',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '15px',
  },
  saveButton: {
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#4CAF50',
    color: 'white',
  },
  cancelButton: {
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#f44336',
    color: 'white',
  },
};

export default EditTaskPopup;
