# 🚀 TaskSphere

TaskSphere is a fullstack MERN task management application that allows users to securely manage their daily tasks with authentication, task prioritization, and status tracking.

---

## 🌟 Features

- 🔐 JWT Authentication
- 🔒 Protected Routes
- 📝 Full CRUD Operations
- 📌 Task Status Management
- ⚡ Priority Levels (Low, Medium, High)
- 🔍 Search Functionality
- 🎨 Dynamic UI Colors
- 📱 Responsive Design
- 🔔 Toast Notifications
- ⏳ Loading States

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- Tailwind CSS
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

---

## 📂 Project Structure

TaskSphere/
│
├── Backend/
│ ├── config/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ └── server.js
│
└── Frontend/
├── src/
├── public/
└── vite.config.js

---

## ⚙️ Environment Variables

Create a `.env` file inside the Backend folder and add:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
