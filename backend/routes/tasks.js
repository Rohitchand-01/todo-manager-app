const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all tasks for authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const { status, priority, search, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    
    // Build filter object
    const filter = { userId: req.user._id };
    
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const tasks = await Task.find(filter).sort(sort);
    
    res.json({
      tasks,
      count: tasks.length
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
});

// Create new task
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Task title is required' });
    }

    const task = new Task({
      title,
      description,
      status,
      priority,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      userId: req.user._id
    });

    await task.save();
    res.status(201).json({ message: 'Task created successfully', task });
  } catch (error) {
    res.status(400).json({ message: error.message || 'Failed to create task' });
  }
});

// Update task
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;
    
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      {
        title,
        description,
        status,
        priority,
        dueDate: dueDate ? new Date(dueDate) : undefined
      },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task updated successfully', task });
  } catch (error) {
    res.status(400).json({ message: error.message || 'Failed to update task' });
  }
});

// Delete task
router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete task' });
  }
});

module.exports = router;
