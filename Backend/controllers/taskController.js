const Task = require("../models/Task");

// ─────────────────────────────────────────────────────────
// GET /api/tasks — Get all tasks of logged-in user
// ─────────────────────────────────────────────────────────
const getAllTasks = async (req, res) => {
  try {
    // req.user.id comes from your JWT middleware automatically
    // This ensures user ONLY sees their own tasks — not others'
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

// ─────────────────────────────────────────────────────────
// POST /api/tasks — Create a new task
// ─────────────────────────────────────────────────────────
const createTask = async (req, res) => {
  try {
    const { title, description, priority, deadline, status } = req.body;

    // title is the only required field
    if (!title) {
      return res.status(400).json({ success: false, message: "Title is required" });
    }

    const task = await Task.create({
      user: req.user.id,   // ← attaches logged-in user to this task
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

// ─────────────────────────────────────────────────────────
// PUT /api/tasks/:id — Update a task
// ─────────────────────────────────────────────────────────
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    // Check if task exists
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    // Check if this task belongs to the logged-in user
    // Prevents User A from editing User B's tasks
    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    const { title, description, priority, deadline, status } = req.body;

    // Only update fields that were sent — ignore the rest
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

// ─────────────────────────────────────────────────────────
// DELETE /api/tasks/:id — Delete a task
// ─────────────────────────────────────────────────────────
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    // Check if task exists
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    // Check if this task belongs to the logged-in user
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