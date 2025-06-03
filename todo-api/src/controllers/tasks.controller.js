const Task = require("../models/task.model");

module.exports = {
    createTask: async (req, res) => {
        const { title, content } = req.body;
        
        if (!title || !content) return res.status(400).send("Title and content required");

        try {
            const newTask = new Task({ title, content });
            await newTask.save();

            res.status(201).send("Task created successfully");
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getAllTask: async (req, res) => {
        try {
            const tasks = await Task.find();
            return res.status(200).json(tasks);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getTaskById: async (req, res) => {
        try {
            const { id } = req.params;
            const task = await Task.findById(id);
            return res.status(200).json(task);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    deleteTaskById: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedTask = await Task.findByIdAndDelete(id);
            if (!deletedTask) {
                return res.status(404).json({ message: `Task ${id} not found` });
            }
            res.status(200).json({ message: "Task deleted successfully" });
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },
    putTaskById: async (req, res) => {
        try {
            const { id } = req.params;
            const task = await Task.findById(id);
            if (!task) {
                return res.status(404).json({ message: `Task ${id} not found` });
            }
            if (!req || !req.body) {
                return res.status(400).json({ message: "No body" });
            }

            const { title, content, completed } = req.body;
            if (title === undefined || title === undefined || title === undefined) {
                return res.status(400).json({ message: "Fields title, content and completed required" });
            }
            task.title = title;
            task.content = content;
            task.completed = completed;
            await task.save();

            res.status(200).json({ message: "Task updated successfully" });
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },
    patchTaskById: async (req, res) => {
        try {
            const { id } = req.params;
            const task = await Task.findById(id);
            if (!task) {
                return res.status(404).json({ message: `Task ${id} not found` });
            }
            if (!req || !req.body) {
                return res.status(400).json({ message: "No body" });
            }

            const { title, content, completed } = req.body;
            if (title === undefined && title === undefined && title === undefined) {
                return res.status(400).json({ message: "At least one of the following fields is required : title, content and completed" });
            }
            task.title = title ?? task.title;
            task.content = content ?? task.content;
            task.completed = completed ?? task.completed;
            await task.save();

            res.status(200).json({ message: "Task updated successfully" });
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    }
};
