const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const { validateTask, validateTaskUpdate } = require('../middleware/validation');

// Get all tasks (with optional status filter)
router.get('/', async (req, res, next) => {
    try {
        const { status } = req.query;
        let filter = {};

        if (status === 'active') {
            filter.completed = false;
        } else if (status === 'completed') {
            filter.completed = true;
        }

        const tasks = await Task.find(filter).sort({ createdAt: -1 });

        res.json({
            success: true,
            count: tasks.length,
            data: tasks,
        });
    } catch (error) {
        next(error);
    }
});

// Get single task by ID
router.get('/:id', async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found',
            });
        }

        res.json({
            success: true,
            data: task,
        });
    } catch (error) {
        next(error);
    }
});

// Create a new task
router.post('/', validateTask, async (req, res, next) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json({
            success: true,
            data: task,
        });
    } catch (error) {
        next(error);
    }
});

// Update a task
router.put('/:id', validateTaskUpdate, async (req, res, next) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found',
            });
        }

        res.json({
            success: true,
            data: task,
        });
    } catch (error) {
        next(error);
    }
});

// Delete a task
router.delete('/:id', async (req, res, next) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found',
            });
        }

        res.json({
            success: true,
            data: {},
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
