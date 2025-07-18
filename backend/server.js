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

// Serve static files from frontend build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
