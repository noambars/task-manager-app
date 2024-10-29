import React from 'react';
import TaskRow from './TaskRow';

/**
 * TaskTable - Component for displaying a table of tasks.
 *
 * Props:
 * - tasks (array): List of task objects to display, where each object contains
 *   `id`, `title`, `description`, and `completed` properties.
 * - deleteTask (function): Callback function to delete a specific task.
 * - startEdit (function): Callback function to initiate editing for a specific task.
 * - toggleComplete (function): Callback function to toggle the completion status of a specific task.
 *
 * Renders:
 * - A table with columns: ID, Title, Description, Completed (checkbox), and Actions.
 * - Each task is displayed as a separate row, rendered by the `TaskRow` component.
 */
const TaskTable = ({ tasks, deleteTask, startEdit, toggleComplete }) => {
    return (
        <table border="1" style={{ width: '80%', marginTop: '20px' }}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Completed</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map((task) => (
                    <TaskRow
                        key={task.id}
                        task={task}
                        deleteTask={deleteTask}
                        startEdit={startEdit}
                        toggleComplete={toggleComplete} // Passing toggleComplete function to TaskRow
                    />
                ))}
            </tbody>
        </table>
    );
};

export default TaskTable;
