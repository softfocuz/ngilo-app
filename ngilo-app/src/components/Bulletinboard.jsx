import React, { useEffect, useState } from 'react';

const formatDate = (ts) => {
  const d = new Date(String(ts).replace(' ', 'T') + 'Z');
  return isNaN(d) ? ts : d.toLocaleDateString();
};

// one pinned sticky note
function Note({ msg, index }) {
  return (
    <li className={`note sticky paper-${index % 4} pin-${index % 4}`}>
      <span className="pushpin" />
      <p className="note-text">{msg.message}</p>
      <p className="note-from">From: {msg.fromName || 'Anonymous'}</p>
      <small className="note-date">{formatDate(msg.timestamp)}</small>
    </li>
  );
}

function Bulletinboard({ userId }) {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState('Pinning your notes...');

  useEffect(() => {
    const load = () => {
      fetch(`http://localhost:3001/api/messages/${userId}`)
        .then((res) => {
          if (!res.ok) throw new Error('Failed to fetch messages');
          return res.json();
        })
        .then((data) => {
          setMessages(data);
          setStatus(data.length === 0 ? 'Nothing pinned yet. Share your link and notes will show up here!' : '');
        })
        .catch(() => setStatus('Failed to load your board.'));
    };

    load();
    const timer = setInterval(load, 15000);
    return () => clearInterval(timer);
  }, [userId]);

  return (
    <section className="board-wrap">
      <h2 className="board-title">My Bulletin Inbox</h2>

      <div className="corkboard">
        {status && <p className="board-empty">{status}</p>}

        {messages.length > 0 && (
          <ul className="note-grid">
            {messages.map((m, i) => (
              <Note key={m.id} msg={m} index={i} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default Bulletinboard;