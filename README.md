# TaskSphere — Full-Stack Task Management Application

TaskSphere is a full-stack **MERN task management application** designed to help users securely create, organize, track, and manage their tasks.

The application implements **JWT-based authentication, protected routes, user-specific task ownership, complete CRUD operations, task search and filtering, priority and status management, and a responsive React interface**.

The project follows a modular backend architecture with separate **routes, controllers, models, middleware, and configuration layers**.

---

## 🚀 Live Demo

### Frontend

**TaskSphere Web Application**
https://tasksphere-frontend-three.vercel.app

### Backend API

**TaskSphere REST API**
https://tasksphere-nexg.onrender.com

### GitHub Repository

https://github.com/GitWithKomal/TaskSphere

---

## ✨ Key Features

### 🔐 Authentication & Security

* User registration and login
* JWT-based authentication
* Password hashing with bcrypt
* Protected API routes
* Authentication middleware
* User-specific task access
* Authorization checks to prevent users from modifying other users' tasks

### 📋 Task Management

* Create tasks
* View personal tasks
* Update existing tasks
* Delete tasks
* Task ownership using MongoDB user references
* Task priority management
* Task status management
* Deadline support

### 🔎 Task Organization

* Search tasks
* Filter tasks
* Organize tasks based on priority and status
* Track task progress from the dashboard

### 🎨 Frontend

* Responsive user interface
* React-based component architecture
* Tailwind CSS styling
* Dashboard-oriented task management experience
* Authentication-aware navigation
* Interactive task operations

### ⚙️ Backend

* RESTful API architecture
* Express.js controllers and routes
* MongoDB database integration
* Mongoose data modeling
* Centralized authentication middleware
* Environment-based configuration
* Error handling for API operations

---

# 🛠️ Tech Stack

## Frontend

| Technology   | Purpose                   |
| ------------ | ------------------------- |
| React        | Frontend UI               |
| Vite         | Development/build tooling |
| Tailwind CSS | Styling                   |
| React Router | Client-side routing       |
| Axios        | HTTP/API communication    |

## Backend

| Technology | Purpose                    |
| ---------- | -------------------------- |
| Node.js    | JavaScript runtime         |
| Express.js | Backend/API framework      |
| MongoDB    | Database                   |
| Mongoose   | MongoDB ODM                |
| JWT        | Authentication             |
| bcrypt     | Password hashing           |
| CORS       | Cross-origin communication |
| dotenv     | Environment configuration  |

## Deployment

| Platform      | Usage               |
| ------------- | ------------------- |
| Vercel        | Frontend deployment |
| Render        | Backend deployment  |
| MongoDB Atlas | Cloud database      |

---

# 🏗️ Application Architecture

TaskSphere follows a modular full-stack architecture:

```text
                    ┌─────────────────────┐
                    │     React Client    │
                    │   Vite + Tailwind   │
                    └──────────┬──────────┘
                               │
                         HTTP / REST API
                               │
                               ▼
                    ┌─────────────────────┐
                    │    Express Server   │
                    │       Node.js       │
                    └──────────┬──────────┘
                               │
                 ┌─────────────┼─────────────┐
                 │             │             │
                 ▼             ▼             ▼
             Middleware      Routes      Controllers
                 │             │             │
                 │             └─────────────┘
                 │
                 ▼
            JWT Authentication
                 │
                 ▼
              Mongoose
                 │
                 ▼
          ┌─────────────────┐
          │     MongoDB     │
          │     Database    │
          └─────────────────┘
```

---

# 🔐 Authentication Flow

TaskSphere uses JWT authentication to secure protected resources.

```text
User
 │
 │ Login credentials
 ▼
React Frontend
 │
 │ POST /api/auth/login
 ▼
Express API
 │
 ▼
Authentication Controller
 │
 ├── Find user by email
 │
 ├── Compare password using bcrypt
 │
 └── Generate JWT
 │
 ▼
JWT Token
 │
 ▼
Frontend
 │
 │ Authorization: Bearer <token>
 ▼
Protected API Route
 │
 ▼
JWT Middleware
 │
 ├── Verify token
 │
 └── Attach authenticated user
 │
 ▼
Controller
 │
 ▼
MongoDB
```

The authenticated user's ID is attached to the request through the authentication middleware.

This allows the backend to enforce user-level ownership of tasks.

---

# 📋 Task Ownership & Authorization

Each task is associated with the user who created it.

```text
User
 │
 ├── Task 1
 ├── Task 2
 └── Task 3
```

When retrieving tasks, the backend queries using the authenticated user's ID.

```js
Task.find({ user: req.user.id });
```

This ensures that users only receive their own tasks.

For update and delete operations, the backend also verifies that the task belongs to the authenticated user before allowing the operation.

```text
User A
  │
  ├── Task A1 ✓ Can access
  └── Task A2 ✓ Can access

User B
  │
  └── Task A1 ✗ Unauthorized
```

This provides an additional authorization layer beyond simply verifying that the user is logged in.

---

# 🔌 REST API

## Authentication

| Method | Endpoint           | Description                      |
| ------ | ------------------ | -------------------------------- |
| `POST` | `/api/auth/signup` | Register a new user              |
| `POST` | `/api/auth/login`  | Authenticate user and return JWT |

## Tasks

| Method   | Endpoint         | Description                           |
| -------- | ---------------- | ------------------------------------- |
| `GET`    | `/api/tasks`     | Get tasks belonging to logged-in user |
| `POST`   | `/api/tasks`     | Create a new task                     |
| `PUT`    | `/api/tasks/:id` | Update an existing task               |
| `DELETE` | `/api/tasks/:id` | Delete a task                         |

The API is structured around REST principles and separates routing from controller/business logic.

---

# 📁 Project Structure

```text
TaskSphere/
│
├── Backend/
│   │
│   ├── config/
│   │   ├── db.js
│   │   └── generateToken.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   └── tasks.js
│   │
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── Frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   └── ...
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# 🧩 Backend Architecture

The backend follows a separation-of-concerns approach.

### Routes

Routes define the API endpoints and connect requests to their corresponding controllers.

```text
Request
   ↓
Route
   ↓
Middleware
   ↓
Controller
```

### Controllers

Controllers contain the application's business logic.

For example, the task controller handles:

* retrieving tasks
* creating tasks
* updating tasks
* deleting tasks
* checking task ownership

### Models

Mongoose models define the structure of MongoDB documents.

Main models:

```text
User
Task
```

### Middleware

Authentication middleware verifies JWT tokens before protected resources are accessed.

---

# 🗄️ Data Model

## User

```text
User
├── _id
├── name
├── email
└── password
```

Passwords are hashed before being stored.

## Task

```text
Task
├── _id
├── user
├── title
├── description
├── priority
├── deadline
├── status
└── timestamps
```

The `user` field establishes ownership between a task and its creator.

---

# 🔄 CRUD Workflow

TaskSphere implements complete CRUD functionality.

```text
CREATE
POST /api/tasks
      ↓
Create task
      ↓
MongoDB

READ
GET /api/tasks
      ↓
Retrieve user's tasks
      ↓
MongoDB

UPDATE
PUT /api/tasks/:id
      ↓
Verify ownership
      ↓
Update task
      ↓
MongoDB

DELETE
DELETE /api/tasks/:id
      ↓
Verify ownership
      ↓
Delete task
```

---

# ⚙️ Environment Variables

Create a `.env` file inside the backend directory.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

> Never commit `.env` files or expose JWT secrets and database credentials publicly.

---

# 💻 Local Installation

## 1. Clone the repository

```bash
git clone https://github.com/GitWithKomal/TaskSphere.git
```

```bash
cd TaskSphere
```

---

## 2. Setup Backend

```bash
cd Backend
npm install
```

Create your `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend:

```bash
npm start
```

or, if using nodemon:

```bash
npm run dev
```

Backend will run on:

```text
http://localhost:5000
```

---

## 3. Setup Frontend

Open another terminal:

```bash
cd Frontend
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will be available through the Vite development URL shown in the terminal.

---

# 🧪 API Testing

The REST APIs can be tested using tools such as:

* Postman
* Thunder Client
* Browser developer tools
* Frontend application

Authentication-protected requests require a valid JWT token.

Example:

```http
Authorization: Bearer <JWT_TOKEN>
```

---

# 🚀 Deployment

TaskSphere is deployed using a separate frontend/backend architecture.

```text
                    Internet
                       │
          ┌────────────┴────────────┐
          │                         │
          ▼                         ▼
       Vercel                    Render
      Frontend                   Backend
          │                         │
          └────────────┬────────────┘
                       │
                       ▼
                  MongoDB Atlas
```

### Frontend

Deployed on **Vercel**

### Backend

Deployed on **Render**

### Database

Hosted using **MongoDB Atlas**

---

# 🎯 Learning Outcomes

Through TaskSphere, the project demonstrates practical understanding of:

* MERN stack development
* REST API design
* MVC-style backend organization
* JWT authentication
* Password hashing
* Authentication middleware
* Authorization and resource ownership
* MongoDB and Mongoose
* CRUD operations
* React component architecture
* Client-server communication
* API integration
* Environment variables
* CORS
* Frontend/backend deployment

---

# 🔮 Future Improvements

Potential future enhancements include:

* Real-time task updates
* Drag-and-drop task organization
* Task reminders and notifications
* Calendar integration
* Role-based access control
* Advanced analytics and productivity dashboards
* Refresh token authentication
* Automated testing
* Docker-based deployment
* CI/CD pipeline

---

# 👩‍💻 Author

**Komal Nimje**

MCA Graduate | Full Stack Developer

### Connect

* GitHub: https://github.com/GitWithKomal
* LinkedIn: https://www.linkedin.com/in/komal-nimje-71593a286

---

# ⭐ Project

If you find this project useful, consider giving the repository a star.

**TaskSphere — Manage tasks. Stay organized. Get things done.**
