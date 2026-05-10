const express = require("express");
const router = express.Router();

// We'll create this file in Step 3
const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

// Your existing JWT middleware — protects all routes below
// ⚠️ Change "protect" to whatever your middleware function is named
const { protect } = require("../middleware/authMiddleware");

// ─── Task Routes (all protected) ──────────────────────────
router.get("/", protect, getAllTasks);       // GET    /api/tasks
router.post("/", protect, createTask);      // POST   /api/tasks
router.put("/:id", protect, updateTask);    // PUT    /api/tasks/:id
router.delete("/:id", protect, deleteTask); // DELETE /api/tasks/:id

// GET /api/tasks — fetch all tasks for the logged-in user
router.get('/', protect, async (req, res) => {
  try {
    // req.user is set by your JWT middleware (protect)
    // We use req.user.id to make sure users only see THEIR tasks
    const tasks = await Task.find({ user: req.user.id });

    res.status(200).json({
      success: true,
      count: tasks.length,  // handy to know how many tasks came back
      data: tasks
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching tasks'
    });
  }
});

module.exports = router;