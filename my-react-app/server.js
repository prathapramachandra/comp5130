const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('/Users/saisritejpalacharla/Downloads/prathap15d/my-react-app/backend/config/db.js');
const Task = require('/Users/saisritejpalacharla/Downloads/prathap15d/my-react-app/backend/config/models/Task.js'); // Mongoose model for tasks

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Routes
app.get('/tasks', async (req, res) => {
    console.log('Fetching tasks...');
    try {
      const tasks = await Task.find();
      res.json(tasks);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      res.status(500).send('Server Error');
    }
  });
  

app.post('/tasks', async (req, res) => {
    try {
        const newTask = new Task(req.body);
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

app.put('/tasks/:id', async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTask);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

app.delete('/tasks/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task Deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

const PORT = process.env.PORT || 6002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
