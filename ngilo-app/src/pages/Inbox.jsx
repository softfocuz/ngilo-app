import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import InboxMessages from '../components/Inbox';

const Inbox = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser || !storedUser.userId) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="page">
      <Navbar />

      <main className="container">
        <h1 className="page-title">Your Inbox</h1>
        <p className="page-sub">Anonymous messages sent to you</p>

        <InboxMessages />
      </main>
    </div>
  );
};

export default Inbox;