import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile'
import Register from './pages/Register';
import Login from './pages/Login'
import Inbox from './pages/Inbox';
import Send from './pages/Send';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/inbox" element={<Inbox />}/>
        <Route path="/send/:recipientId" element={<Send />}/>
      </Routes>
    </Router>
  );
}

export default App;