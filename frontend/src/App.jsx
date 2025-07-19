import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

// Use deployed backend in production, local in development
const BASE_URL = import.meta.env.PROD
  ? 'https://todo-backend-orti.onrender.com'
  : '';

function Navbar({ user, onLogout }) {
  return (
    <nav className="w-full">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex justify-between items-center bg-white/80 backdrop-blur-xl px-8 py-6 border-b border-neutral-200 shadow-sm w-full"
      >
        <div className="font-extrabold text-2xl tracking-tight text-gray-900 flex items-center gap-3">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><polygon points="16,4 28,28 4,28" fill="#111"/></svg>
          SM's To-Do
        </div>
        <div>
          {user ? (
            <>
              <span className="mr-6 font-semibold text-gray-600">Hello, {user.username}</span>
              <button
                onClick={onLogout}
                className="bg-gray-900 hover:bg-gray-700 text-white font-semibold py-2 px-5 rounded-full shadow transition-all duration-200"
              >
                Logout
              </button>
            </>
          ) : null}
        </div>
      </motion.div>
    </nav>
  );
}

function AuthForm({ onLogin, onRegister, loading, error, success }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const usernameRef = useRef();

  useEffect(() => {
    usernameRef.current?.focus();
  }, [isRegister]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegister) {
      await onRegister(username, password);
    } else {
      await onLogin(username, password);
    }
  };

  return (
    <motion.form
      layout
      className="auth-form bg-white/80 backdrop-blur-xl rounded-2xl p-10 mb-8 border border-neutral-200 shadow-lg w-full max-w-xl mx-auto"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
    >
      <h2 className="mb-8 text-center text-gray-900 font-extrabold text-3xl tracking-tight">Sign in to Swapnadeep's todo</h2>
      <input
        ref={usernameRef}
        type="text"
        placeholder="Username"
        value={username}
        required
        autoComplete="username"
        onChange={e => setUsername(e.target.value)}
        disabled={loading}
        className="w-full mb-6 px-5 py-4 rounded-xl border border-neutral-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all text-lg"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        required
        autoComplete={isRegister ? "new-password" : "current-password"}
        onChange={e => setPassword(e.target.value)}
        disabled={loading}
        className="w-full mb-6 px-5 py-4 rounded-xl border border-neutral-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all text-lg"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full mb-4 py-4 bg-gray-900 text-white font-semibold rounded-full shadow hover:bg-gray-700 transition-all duration-200 text-lg"
      >
        {loading ? (isRegister ? 'Registering...' : 'Logging in...') : (isRegister ? 'Register' : 'Login')}
      </button>
      <div className="text-center mb-2">
        <button
          type="button"
          className="switch text-gray-600 underline bg-transparent border-none cursor-pointer text-base"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
        </button>
      </div>
      <AnimatePresence>
        {error && (
          <motion.div
            className="error bg-red-50 text-red-600 rounded-xl py-3 px-5 text-center font-semibold mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            {error}
          </motion.div>
        )}
        {success && (
          <motion.div
            className="success bg-green-50 text-green-700 rounded-xl py-3 px-5 text-center font-semibold mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            {success}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.form>
  );
}

function HomepageHero() {
  return (
    <motion.section
      className="w-full h-full flex flex-col items-center justify-center px-8 py-20 animate-fadein"
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="flex items-center gap-6 mb-6">
        <svg width="56" height="56" viewBox="0 0 32 32" fill="none">
          <polygon points="16,4 28,28 4,28" fill="#111"/>
        </svg>
        <span className="text-5xl font-extrabold text-gray-900 tracking-tight drop-shadow">Swapnadeep's todo</span>
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 text-center drop-shadow">
        Organize your day, professionally.
      </h1>
      <p className="text-gray-600 text-xl mb-8 text-center max-w-xl">
        Secure, fast, and beautifully minimal.<br />Manage your tasks with confidence and style.
      </p>
    </motion.section>
  );
}

function Footer() {
  return (
    <footer className="w-full py-6 bg-white/80 border-t border-neutral-200 text-center text-gray-500 text-base font-medium mt-auto">
      &copy; {new Date().getFullYear()} Swapnadeep's todo &mdash; Inspired by Apple.com
    </footer>
  );
}

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return token && username ? { token, username } : null;
  });
  const inputRef = useRef();

  useEffect(() => {
    if (user) fetchTodos();
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    if (user) inputRef.current?.focus();
  }, [user, todos]);

  const fetchTodos = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await axios.get(`${BASE_URL}/api/todos`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setTodos(res.data);
    } catch (err) {
      setError('Failed to fetch todos.');
    }
    setLoading(false);
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await axios.post(`${BASE_URL}/api/todos`, { text: input, date, time }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setInput('');
      setDate('');
      setTime('');
      setSuccess('Todo added!');
      fetchTodos();
    } catch (err) {
      setError('Failed to add todo.');
      setLoading(false);
    }
  };

  const toggleTodo = async (id, completed) => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await axios.patch(`${BASE_URL}/api/todos/${id}`, { completed }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setSuccess('Todo updated!');
      fetchTodos();
    } catch (err) {
      setError('Failed to update todo.');
      setLoading(false);
    }
  };

  const deleteTodo = async (id) => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await axios.delete(`${BASE_URL}/api/todos/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setSuccess('Todo deleted!');
      fetchTodos();
    } catch (err) {
      setError('Failed to delete todo.');
      setLoading(false);
    }
  };

  const handleLogin = async (username, password) => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await axios.post(`${BASE_URL}/api/auth/login`, { username, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username);
      setUser({ token: res.data.token, username: res.data.username });
      setSuccess('Login successful!');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    }
    setLoading(false);
  };

  const handleRegister = async (username, password) => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await axios.post(`${BASE_URL}/api/auth/register`, { username, password });
      setSuccess('Registration successful! Logging in...');
      await handleLogin(username, password);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUser(null);
    setTodos([]);
    setInput('');
    setDate('');
    setTime('');
    setError('');
    setSuccess('Logged out!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200 flex flex-col items-center justify-start w-full font-sans">
      <Navbar user={user} onLogout={handleLogout} />
      <div className="w-full flex flex-col items-center justify-start flex-1">
        {!user ? (
          <div className="w-full flex flex-col md:flex-row items-stretch justify-center min-h-[70vh]">
            <div className="md:w-1/2 flex items-center justify-center border-b md:border-b-0 md:border-r border-neutral-200 bg-white/80">
              <HomepageHero />
            </div>
            <div id="auth" className="md:w-1/2 flex items-center justify-center bg-white/80">
              <AuthForm onLogin={handleLogin} onRegister={handleRegister} loading={loading} error={error} success={success} />
            </div>
          </div>
        ) : (
          <>
            <motion.form
              layout
              onSubmit={addTodo}
              className="flex flex-wrap gap-6 mb-10 items-center bg-white/80 backdrop-blur-xl rounded-2xl p-8 border-b border-neutral-200 w-full max-w-2xl mx-auto shadow-lg"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Add a new todo"
                disabled={loading}
                required
                aria-label="Todo text"
                className="flex-1 px-5 py-4 rounded-xl border border-neutral-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all text-lg"
              />
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                disabled={loading}
                required
                aria-label="Todo date"
                className="min-w-[120px] px-5 py-4 rounded-xl border border-neutral-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all text-lg"
              />
              <input
                type="time"
                value={time}
                onChange={e => setTime(e.target.value)}
                disabled={loading}
                required
                aria-label="Todo time"
                className="min-w-[100px] px-5 py-4 rounded-xl border border-neutral-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all text-lg"
              />
              <button
                type="submit"
                disabled={loading || !input.trim() || !date || !time}
                className="py-4 px-8 bg-gray-900 text-white font-semibold rounded-full shadow hover:bg-gray-700 transition-all duration-200 text-lg"
              >
                {loading ? 'Adding...' : 'Add'}
              </button>
            </motion.form>
            <AnimatePresence>
              {error && (
                <motion.div
                  className="error bg-red-50 text-red-600 rounded-xl py-3 px-5 text-center font-semibold animate-fadein w-full max-w-2xl mx-auto mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  {error}
                </motion.div>
              )}
              {success && (
                <motion.div
                  className="success bg-green-50 text-green-700 rounded-xl py-3 px-5 text-center font-semibold animate-fadein w-full max-w-2xl mx-auto mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  {success}
                </motion.div>
              )}
            </AnimatePresence>
            {loading && !todos.length ? (
              <div className="text-center text-gray-500 mt-8 animate-fadein w-full max-w-2xl mx-auto text-lg">Loading...</div>
            ) : (
              <ul className="mt-2 w-full max-w-2xl mx-auto">
                {todos.length === 0 ? (
                  <motion.div
                    className="text-center text-gray-400 mt-8 animate-fadein text-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    No todos yet. Add your first!
                  </motion.div>
                ) : (
                  <AnimatePresence>
                    {todos.map((todo) => (
                      <motion.li
                        key={todo._id}
                        className="flex items-center py-5 border-b border-neutral-200 transition-all animate-fadein"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        layout
                      >
                        <input
                          type="checkbox"
                          checked={todo.completed}
                          onChange={() => toggleTodo(todo._id, !todo.completed)}
                          disabled={loading}
                          aria-label={`Mark ${todo.text} as ${todo.completed ? 'incomplete' : 'complete'}`}
                          className="accent-gray-900 w-7 h-7 mr-5 transition-all"
                        />
                        <span className={`flex-1 flex flex-col ${todo.completed ? 'line-through text-gray-400' : 'text-gray-900'} font-semibold text-lg`}>
                          {todo.text}
                          <span className="todo-meta text-gray-500 text-base mt-1">
                            {todo.date} {todo.time}
                            {todo.reminded && (
                              <span className="ml-2 text-green-500 font-semibold">⏰ Reminder sent</span>
                            )}
                          </span>
                        </span>
                        <button
                          onClick={() => deleteTodo(todo._id)}
                          disabled={loading}
                          aria-label={`Delete ${todo.text}`}
                          className="bg-gray-900 text-white font-semibold py-2 px-5 rounded-full shadow ml-4 hover:bg-gray-700 transition-all duration-200"
                        >
                          Delete
                        </button>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                )}
              </ul>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
