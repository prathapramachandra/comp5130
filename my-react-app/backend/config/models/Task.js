const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String },
        category: { type: String, enum: ['Work', 'Personal', 'Health', 'Other'] },
        priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' },
        dueDate: { type: Date },
        status: { type: String, enum: ['Not Started', 'In Progress', 'Completed'], default: 'Not Started' },
    },
    { timestamps: true }
);


const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
