import React, { useEffect, useState } from 'react';

const formatTime = (ts) => {
    const d = new Date(String(ts).replace(' ', 'T') + 'Z');
    return isNaN(d) ? ts : d.toLocaleString();
};

function Inbox() {
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState('Loading...');

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (!storedUser || !storedUser.userId) return;

        const loadMessages = () => {
            fetch(`http://localhost:3001/api/messages/${storedUser.userId}`)
                .then((res) => {
                    if (!res.ok) throw new Error('Failed to fetch messages');
                    return res.json();
                })
                .then((data) => {
                    setMessages(data);
                    setStatus(data.length === 0 ? 'No messages yet. Share your link and messages will show up here.' : '');
                })
                .catch(() => setStatus('Failed to load messages.'));
        };

        loadMessages();
        // check for new messages every 10 seconds
        const timer = setInterval(loadMessages, 10000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div>
            {status && <p className="empty">{status}</p>}

            <ul className="message-list">
                {messages.map((m) => (
                    <li key={m.id} className="message-item">
                        <p>{m.message}</p>
                        <small>{formatTime(m.timestamp)}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Inbox;