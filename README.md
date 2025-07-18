# Swapnadeep's To-Do App

[Live Demo](https://to-do-app-9wfa.onrender.com)

A modern, full-stack To-Do application built with React, Node.js, Express, and MongoDB.  
Designed for speed, security, and a beautiful user experience.

---

## 🚀 Features

- **User Authentication:** Secure registration and login with JWT.
- **Task Management:** Add, edit, complete, and delete todos.
- **Due Date & Time:** Assign date and time to each task.
- **Responsive UI:** Mobile-first, clean, and minimal design inspired by Apple.
- **Persistent Storage:** All data stored securely in MongoDB Atlas.
- **Animations:** Smooth transitions and feedback using Framer Motion.
- **Protected API:** Only authenticated users can access their tasks.
- **Production Ready:** Deployed on Render (frontend & backend), scalable and secure.

---

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Framer Motion, Axios
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcrypt
- **Deployment:** Render (Frontend & Backend), MongoDB Atlas

---

## 📦 Project Structure

```
To-Do-App/
├── backend/      # Express API, MongoDB models, auth, todos routes
├── frontend/     # React app, components, styles, Vite config
└── README.md     # Project documentation
```

---

## 🌐 Live Demo

Try it now: [https://to-do-app-9wfa.onrender.com](https://to-do-app-9wfa.onrender.com)

---

## 📝 Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/To-Do-App.git
cd To-Do-App
```

### 2. Backend Setup

```bash
cd backend
npm install
# Create a .env file (see .env.example) with your MongoDB URI and JWT secret
npm start
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

### 4. Environment Variables

- **Backend:**  
  - `MONGO_URI` - MongoDB Atlas connection string  
  - `JWT_SECRET` - JWT secret key  
  - `FRONTEND_ORIGIN` - Frontend URL (for CORS)

- **Frontend:**  
  - No special env needed for deployment (uses Vite config)

---

## 🧑‍💻 API Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get JWT
- `GET /api/todos` - Get all todos (auth required)
- `POST /api/todos` - Add new todo (auth required)
- `PATCH /api/todos/:id` - Update todo (auth required)
- `DELETE /api/todos/:id` - Delete todo (auth required)

---

## 📱 Screenshots

![Homepage](https://i.imgur.com/your-homepage-screenshot.png)
![Todo List](https://i.imgur.com/your-todolist-screenshot.png)
<!-- Replace with your own screenshots -->

---

## 💡 Why This Project?

- Demonstrates full-stack development skills.
- Shows understanding of authentication, REST APIs, and secure data handling.
- Implements modern UI/UX practices.
- Ready for real-world deployment and scaling.
- Code is clean, modular, and follows best practices.

---

## 🏆 What Makes It Job-Ready?

- **Security:** JWT auth, password hashing, CORS.
- **Scalability:** Cloud database, stateless API, production deployment.
- **Modern Frontend:** React, Tailwind, animations, accessibility.
- **Professional Documentation:** Easy to understand, well-organized.
- **CI/CD Ready:** Easily deployable on cloud platforms.

---

## 📬 Contact

Made by [Swapnadeep Mishra](https://www.linkedin.com/in/swapnadeepmishra3/)

---

> **Tip for Interviewers:**  
> The codebase is modular, readable, and demonstrates real-world skills in authentication, RESTful API design, frontend architecture, and cloud deployment.
