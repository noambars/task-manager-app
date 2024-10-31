
import React from 'react';

/**
 * TaskForm - Component for adding or editing a task.
 *
 * Props:
 * - title (string): Current title of the task.
 * - setTitle (function): Callback to update the title state.
 * - description (string): Current description of the task.
 * - setDescription (function): Callback to update the description state.
 * - addTask (function): Callback to handle adding or updating a task.
 * - isEditing (boolean): Determines whether the form is in edit mode (true) or add mode (false).
 *
 * Renders:
 * - Input fields for task title and description.
 * - A button to submit the form, labeled 'Add Task' in add mode or 'Save' in edit mode.
 */
const TaskForm = ({ title, setTitle, description, setDescription, addTask, isEditing }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={addTask}>{isEditing ? 'Save' : 'Add Task'}</button>
    </div>
  );
};

export default TaskForm;
