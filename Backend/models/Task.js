const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    // ─── Who owns this task? ───────────────────────────────
    // This stores the logged-in user's MongoDB _id
    // So every task "belongs to" one specific user
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",        // ← links to your existing User model
      required: true,
    },

    // ─── Task Details ──────────────────────────────────────
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    priority: {
  type: String,
  enum: ["Low", "Medium", "High"],
  default: "Medium",
},

    deadline: {
      type: Date,         // e.g. "2025-06-30"
      default: null,
    },

    status: {
  type: String,
  enum: ["Pending", "In Progress", "Completed"],
  default: "Pending",
},
  },
  {
    timestamps: true,     // auto-adds createdAt + updatedAt
  }
);

module.exports = mongoose.model("Task", taskSchema);