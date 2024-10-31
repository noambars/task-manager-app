
// TaskFilterSortControls.js
import React from 'react';

/**
 * TaskFilterSortControls - Component to control filtering and sorting of tasks.
 *
 * Props:
 * - filter (string): Current filter value ('all', 'completed', or 'incomplete') for task status.
 * - sortField (string): Field by which tasks are sorted ('title' or 'id').
 * - sortOrder (string): Order of sorting ('asc' for ascending, 'desc' for descending).
 * - handleFilterChange (function): Callback function to handle changes in filter selection.
 * - handleSortFieldChange (function): Callback function to handle changes in sort field selection.
 * - handleSortChange (function): Callback function to handle changes in sort order selection.
 *
 * Renders:
 * - A dropdown for filtering tasks by status (all, completed, incomplete).
 * - A dropdown for selecting the field to sort by (title or ID).
 * - A dropdown for selecting the sorting order (ascending or descending).
=======
import React from 'react';

/**
 * TaskFilterSortControls - Component providing controls for filtering and sorting tasks.
 *
 * Props:
 * - filter (string): The current filter value for task status ("all", "completed", or "incomplete").
 * - sortField (string): The field by which tasks are currently sorted ("title" or "id").
 * - sortOrder (string): The current sort order ("asc" for ascending or "desc" for descending).
 * - handleFilterChange (function): Callback function to update the filter selection.
 * - handleSortFieldChange (function): Callback function to update the sorting field.
 * - handleSortChange (function): Callback function to update the sorting order.
 *
 * Renders:
 * - Filter dropdown for selecting task status.
 * - Sort field dropdown for selecting the field to sort by.
 * - Sort order dropdown to set the order of sorting.
 */
const TaskFilterSortControls = ({ filter, sortField, sortOrder, handleFilterChange, handleSortFieldChange, handleSortChange }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0' }}>
      <div>
        <label>Filter by Status: </label>
        <select value={filter} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>
      <div style={{ paddingLeft: '20px' }}>
        <label>Sort by: </label>
        <select value={sortField} onChange={handleSortFieldChange}>
          <option value="title">Title</option>
          <option value="id">ID</option>
        </select>
        <select value={sortOrder} onChange={handleSortChange}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  );
};

export default TaskFilterSortControls;
