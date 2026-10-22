import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Message from '../components/Message';

const Send = () => {
  const { recipientId } = useParams();
  const loggedIn = !!JSON.parse(localStorage.getItem("user"));

  return (
    <div className="page">
      {loggedIn ? (
        <Navbar />
      ) : (
        <header className="public-header">
          <Link to="/login" className="brand">Ngilo</Link>
        </header>
      )}

      <main className="container">
        <Message recipientId={recipientId} />
      </main>
    </div>
  );
};

export default Send;