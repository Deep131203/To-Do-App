const router = require('express').Router();
const Todo = require('../models/Todo');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Auth middleware
function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
}

// Get all todos for user
router.get('/', auth, async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.userId }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create todo
router.post('/', auth, async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    date: req.body.date,
    time: req.body.time,
    user: req.user.userId
  });
  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update todo
router.patch('/:id', auth, async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user.userId });
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    if (req.body.text) todo.text = req.body.text;
    if (req.body.completed !== undefined) todo.completed = req.body.completed;
    if (req.body.date) {
      todo.date = req.body.date;
      todo.reminded = false; // Reset reminder if date/time changes
    }
    if (req.body.time) {
      todo.time = req.body.time;
      todo.reminded = false; // Reset reminder if date/time changes
    }
    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete todo
router.delete('/:id', auth, async (req, res) => {
  try {
    await Todo.deleteOne({ _id: req.params.id, user: req.user.userId });
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
