const Task = require("../models/Task");


const getAllTasks = async (req, res) => {
  try {
    
    const tasks = await Task.find({ user: req.user.id });

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, priority, deadline, status } = req.body;

    
    if (!title) {
      return res.status(400).json({ success: false, message: "Title is required" });
    }

    const task = await Task.create({
      user: req.user.id,   
      title,
      description,
      priority,
      deadline,
      status,
    });

    res.status(201).json({ success: true, message: "Task created", task });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

   
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    
    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    const { title, description, priority, deadline, status } = req.body;

    
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (priority !== undefined) task.priority = priority;
    if (deadline !== undefined) task.deadline = deadline;
    if (status !== undefined) task.status = status;

    await task.save();

    res.status(200).json({ success: true, message: "Task updated", task });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

  
    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    await task.deleteOne();

    res.status(200).json({ success: true, message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

module.exports = { getAllTasks, createTask, updateTask, deleteTask };