import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FaRegMoon, FaSun } from 'react-icons/fa'; // Moon and Sun icons from react-icons
import '/Users/saisritejpalacharla/Downloads/prathap15d/my-react-app/src/App.css'; // Ensure you have an updated CSS file for styling

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Work',
    priority: 'Medium',
    dueDate: '',
    status: 'Not Started',
  });
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const loadPreferencesAndTasks = async () => {
      try {
        // Fetch tasks from the backend
        const response = await axios.get('http://localhost:5002/tasks'); // Ensure this URL matches your backend endpoint
        setTasks(response.data); // Populate tasks with data from backend
  
        // Load dark mode preference from localStorage
        const isDarkMode = JSON.parse(localStorage.getItem('darkMode')) || false;
        setDarkMode(isDarkMode);
  
        // Apply dark mode class if enabled
        if (isDarkMode) {
          document.body.classList.add('dark-mode');
        } else {
          document.body.classList.remove('dark-mode');
        }
      } catch (error) {
        console.error('Error loading tasks or preferences:', error);
      }
    };
  
    // Call the function to load preferences and tasks
    loadPreferencesAndTasks();
  }, []);
  

  // Handle form input changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add a new task
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedTasks = [...tasks, formData];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setFormData({
      title: '',
      description: '',
      category: 'Work',
      priority: 'Medium',
      dueDate: '',
      status: 'Not Started',
    });
  };

  // Delete a task
  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  // Update task status
  const handleStatusChange = (index, newStatus) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', !darkMode);

    if (!darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  return (
    <div className="task-container">
      <header className="task-header">
        <h2>Create a New Task</h2>
        <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          {darkMode ? <FaSun size={24} /> : <FaRegMoon size={24} />}
        </button>
      </header>

      {/* Task Creation Form */}
      <form className="task-form" onSubmit={handleFormSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleFormChange}
          required
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleFormChange}
        />

        <label>Category:</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleFormChange}
        >
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Health">Health</option>
          <option value="Other">Other</option>
        </select>

        <label>Priority:</label>
        <select
          name="priority"
          value={formData.priority}
          onChange={handleFormChange}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <label>Due Date:</label>
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleFormChange}
        />

        <label>Status:</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleFormChange}
        >
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <button type="submit">Create Task</button>
      </form>

      {/* Task List */}
      <section className="task-list">
        {tasks.map((task, index) => (
          <div key={index} className="task-item">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Category: {task.category}</p>
            <p>Priority: {task.priority}</p>
            <p>Due: {task.dueDate}</p>
            <p>Status:</p>
            <select
              value={task.status}
              onChange={(e) => handleStatusChange(index, e.target.value)}
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <button onClick={() => handleDeleteTask(index)}>Delete</button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default TasksPage;
