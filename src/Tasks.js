// Tasks.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskTable from './components/TaskTable';
import EditTaskPopup from './components/EditTaskPopup';
import TaskFilterSortControls from './components/TaskFilterSortControls';
import LoadingErrorMessages from './components/LoadingErrorMessages';
import DeleteConfirmationPopup from './components/DeleteConfirmationPopup';

// Set default authorization header for axios requests using token from localStorage
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

const Tasks = () => {
  // State variables for managing tasks, UI states, and user inputs
  const [tasks, setTasks] = useState([]); // Complete list of tasks from API
  const [filteredTasks, setFilteredTasks] = useState([]); // Filtered and sorted tasks for display
  const [title, setTitle] = useState(''); // Title input for adding new task
  const [description, setDescription] = useState(''); // Description input for adding new task
  const [editingTask, setEditingTask] = useState(null); // Task selected for editing
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Controls edit popup visibility
  const [loading, setLoading] = useState(false); // Loading state for asynchronous operations
  const [error, setError] = useState(''); // Error message for display
  const [filter, setFilter] = useState('all'); // Filter criteria ('all', 'completed', 'incomplete')
  const [sortField, setSortField] = useState('title'); // Field to sort tasks by ('title' or 'id')
  const [sortOrder, setSortOrder] = useState('asc'); // Sort order ('asc' or 'desc')
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false); // Controls delete confirmation popup visibility
  const [taskToDelete, setTaskToDelete] = useState(null); // Task selected for deletion

  // Fetch tasks when the component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  // Re-apply filters and sorting whenever tasks, filter, or sort settings change
  useEffect(() => {
    applyFiltersAndSorting();
  }, [tasks, filter, sortField, sortOrder]);

  // Fetches tasks from the API
  const fetchTasks = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://127.0.0.1:5000/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(response.data);
    } catch (error) {
      setError("Failed to load tasks.");
    }
  };

  // Applies filtering and sorting to the tasks list
  const applyFiltersAndSorting = () => {
    let newTasks = [...tasks];
    if (filter === 'completed') {
      newTasks = newTasks.filter(task => task.completed);
    } else if (filter === 'incomplete') {
      newTasks = newTasks.filter(task => !task.completed);
    }

    // Sorts tasks by the selected field and order
    newTasks.sort((a, b) => {
      const fieldA = sortField === 'title' ? (a.title ? a.title.toLowerCase() : '') : a.id;
      const fieldB = sortField === 'title' ? (b.title ? b.title.toLowerCase() : '') : b.id;
      return sortOrder === 'asc' ? (fieldA < fieldB ? -1 : 1) : (fieldA > fieldB ? -1 : 1);
    });

    setFilteredTasks(newTasks);
  };

  // Toggles the 'completed' status of a task and updates the server
  const toggleComplete = async (task) => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(`http://127.0.0.1:5000/tasks/${task.id}`, { ...task, completed: !task.completed }, { headers: { Authorization: `Bearer ${token}` } });
      fetchTasks();
    } catch (error) {
      setError("Failed to update task.");
    }
  };

  // Adds a new task with the given title and description
  const addTask = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://127.0.0.1:5000/tasks', { title, description, completed: false }, { headers: { Authorization: `Bearer ${token}` } });
      fetchTasks();
      setTitle('');
      setDescription('');
    } catch (error) {
      setError('Failed to add task.');
    }
    setLoading(false);
  };

  // Deletes the selected task after confirmation
  const deleteTask = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://127.0.0.1:5000/tasks/${taskToDelete.id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchTasks();
      setIsDeletePopupOpen(false);
      setTaskToDelete(null);
    } catch (error) {
      setError('Failed to delete task.');
    }
    setLoading(false);
  };

  // Opens the delete confirmation popup for the selected task
  const openDeletePopup = (task) => {
    setTaskToDelete(task);
    setIsDeletePopupOpen(true);
  };

  // Closes the delete confirmation popup without deleting
  const closeDeletePopup = () => {
    setIsDeletePopupOpen(false);
    setTaskToDelete(null);
  };

  // Saves changes made to an existing task and updates the server
  const handleSaveChanges = async (updatedTask) => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(`http://127.0.0.1:5000/tasks/${updatedTask.id}`, updatedTask, { headers: { Authorization: `Bearer ${token}` } });
      fetchTasks();
      setIsPopupOpen(false);
    } catch (error) {
      setError('Failed to save task changes.');
    }
  };

  // Logs out the user by removing the token and refreshing the page
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Task Manager</h1>

      {/* Component for displaying loading/error messages */}
      <LoadingErrorMessages loading={loading} error={error} />

      {/* Form for adding new tasks */}
      <TaskForm
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        addTask={addTask}
      />

      {/* Filter and sort controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%' }}>
        <div style={{ marginRight: 'auto', paddingRight: '80px' }}>
          <TaskFilterSortControls
            filter={filter}
            sortField={sortField}
            sortOrder={sortOrder}
            handleFilterChange={(e) => setFilter(e.target.value)}
            handleSortFieldChange={(e) => setSortField(e.target.value)}
            handleSortChange={(e) => setSortOrder(e.target.value)}
          />
        </div>
      </div>

      {/* Table displaying list of tasks */}
      <TaskTable
        tasks={filteredTasks}
        deleteTask={openDeletePopup}
        startEdit={(task) => {
          setEditingTask(task);
          setIsPopupOpen(true);
        }}
        toggleComplete={toggleComplete}
      />

      {/* Popup for editing a task */}
      {isPopupOpen && (
        <EditTaskPopup
          task={editingTask}
          saveChanges={handleSaveChanges}
          closePopup={() => setIsPopupOpen(false)}
        />
      )}

      {/* Popup for delete confirmation */}
      <DeleteConfirmationPopup
        isOpen={isDeletePopupOpen}
        onConfirm={deleteTask}
        onCancel={closeDeletePopup}
        taskTitle={taskToDelete?.title}
      />

      {/* Logout button */}
      <button onClick={handleLogout} style={{ marginTop: '20px' }}>Logout</button>
    </div>
  );
};

export default Tasks;
