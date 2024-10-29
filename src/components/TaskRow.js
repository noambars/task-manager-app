// TaskRow.js

import React from 'react';

/**
 * TaskRow - Component representing a single row in the task table.
 *
 * Props:
 * - task (object): The task data, containing `id`, `title`, `description`, and `completed` status.
 * - deleteTask (function): Callback function to delete the task; receives the task object.
 * - startEdit (function): Callback function to initiate task editing; receives the task object.
 * - toggleComplete (function): Callback function to toggle the completion status of the task.
 *
 * Renders:
 * - Task ID, title, and description in table cells.
 * - A checkbox to mark the task as completed or not, linked to the `toggleComplete` function.
 * - Edit and Delete buttons to trigger editing and deletion, passing the task data as a parameter.
 */
const TaskRow = ({ task, deleteTask, startEdit, toggleComplete }) => {
  return (
    <tr>
      <td>{task.id}</td>
      <td>{task.title}</td>
      <td>{task.description}</td>
      <td>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleComplete(task)}
        />
      </td>
      <td>
        <button onClick={() => startEdit(task)}>Edit</button>
        <button onClick={() => deleteTask(task)}>Delete</button> {/* Passes entire task object */}
      </td>
    </tr>
  );
};

export default TaskRow;
