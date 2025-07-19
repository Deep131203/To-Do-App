const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// CORS setup: allow frontend origin in production, allow all in development
const allowedOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:3000';
app.use(cors({
  origin: allowedOrigin,
  credentials: true
}));

app.use(express.json());

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/todo-app';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/todos', require('./routes/todos'));

const Todo = require('./models/Todo');

// Reminder scheduler (runs every minute)
setInterval(async () => {
  const now = new Date();
  const currentDate = now.toISOString().slice(0, 10); // YYYY-MM-DD
  const currentTime = now.toTimeString().slice(0, 5); // HH:MM

  // Find todos that match current date & time and haven't been reminded
  const todos = await Todo.find({
    date: currentDate,
    time: currentTime,
    reminded: false
  }).populate('user');

  for (const todo of todos) {
    // TODO: Replace with email or push notification logic
    console.log(`Reminder for user ${todo.user.username}: ${todo.text} at ${todo.date} ${todo.time}`);

    // Mark as reminded
    todo.reminded = true;
    await todo.save();
  }
}, 60 * 1000); // every minute

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
