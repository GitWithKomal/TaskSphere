import { useEffect, useState } from "react";
import API from "../api";
import { toast } from "react-toastify";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Pending");
  const [priority, setPriority] = useState("Medium");

  const [search, setSearch] = useState("");

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const logoutHandler = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const { data } = await API.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(data.tasks);
    } catch (err) {
      console.log(err.response?.data);
      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const createTask = async () => {
    try {
      if (!title.trim()) {
        toast.error("Task title required");
        return;
      }

      const token = localStorage.getItem("token");

      await API.post(
        "/tasks",
        {
          title,
          status,
          priority,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setTitle("");
      setStatus("Pending");
      setPriority("Medium");

      fetchTasks();

      toast.success("Task Added");
    } catch (err) {
      console.log(err.response?.data);
      toast.error("Failed to add task");
    }
  };

  const deleteTask = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchTasks();

      toast.success("Task Deleted");
    } catch (err) {
      console.log(err.response?.data);
      toast.error("Failed to delete task");
    }
  };

  const updateTask = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/tasks/${id}`,
        {
          title: editTitle,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setEditingTaskId(null);
      setEditTitle("");

      fetchTasks();

      toast.success("Task Updated");
    } catch (err) {
      console.log(err.response?.data);
      toast.error("Failed to update task");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>

          <button
            onClick={logoutHandler}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          <input
            type="text"
            placeholder="Enter task"
            className="border p-2 rounded flex-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border p-2 rounded"
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="border p-2 rounded"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <button
            type="button"
            onClick={createTask}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Add Task
          </button>
        </div>

        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        />

        {loading ? (
          <p className="text-center mt-10">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p>No tasks yet</p>
        ) : (
          tasks
            .filter((task) =>
              task.title.toLowerCase().includes(search.toLowerCase()),
            )
            .map((task) => (
              <div
                key={task._id}
                className={`p-4 mb-3 rounded-lg flex justify-between items-center border-l-4
                ${
                  task.priority === "High"
                    ? "border-red-500 bg-red-50"
                    : task.priority === "Medium"
                      ? "border-yellow-500 bg-yellow-50"
                      : "border-green-500 bg-green-50"
                }`}
              >
                <div>
                  {editingTaskId === task._id ? (
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="border p-1 rounded"
                    />
                  ) : (
                    <h3 className="font-semibold">{task.title}</h3>
                  )}

                  <p>
                    <span
                      className={`text-sm font-semibold
                      ${
                        task.status === "Completed"
                          ? "text-green-600"
                          : task.status === "In Progress"
                            ? "text-yellow-600"
                            : "text-gray-600"
                      }`}
                    >
                      Status: {task.status}
                    </span>
                  </p>

                  <p>
                    <span
                      className={`text-sm font-semibold
                      ${
                        task.priority === "High"
                          ? "text-red-600"
                          : task.priority === "Medium"
                            ? "text-yellow-600"
                            : "text-green-600"
                      }`}
                    >
                      Priority: {task.priority}
                    </span>
                  </p>
                </div>

                <div className="flex gap-2">
                  {editingTaskId === task._id ? (
                    <button
                      onClick={() => updateTask(task._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingTaskId(task._id);
                        setEditTitle(task.title);
                      }}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                  )}

                  <button
                    onClick={() => deleteTask(task._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;
