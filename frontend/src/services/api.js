const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const API_URL = `${API_BASE_URL}/tasks`;

export const api = {
  async getTasks(filter = 'all') {
    try {
      const url = filter !== 'all' 
        ? `${API_URL}?status=${filter}` 
        : API_URL;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  // Create a new task
  async createTask(taskData) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create task');
      }
      const result = await response.json();
      return result.data; 
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  // Update a task
  async updateTask(id, updates) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update task');
      }
      const result = await response.json();
      return result.data; 
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },

  // Delete a task
  async deleteTask(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
      const result = await response.json();
      return result.data; 
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  },
};
