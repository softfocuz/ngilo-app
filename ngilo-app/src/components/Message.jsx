import React, { useState }  from  'react';

function Message({ recipientId: presetId }) {
    const [link, setLink] = useState('');
    const [message, setMessage] = useState('');
    const [fromName, setFromName] = useState('');
    const [status, setStatus] = useState('');

    const handleSend = async () => {
        setStatus(''); 

        try {
            const parts = link.split('/send/');
            const recipientId = presetId || parts[1];

            if (!recipientId || !message.trim()) {
                setStatus('Please enter a valid recipient link and a message.');
                return;
            }
            const res = await fetch('http://localhost:3001/api/send-message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ recipientId, message, fromName }),
            });

            const text = await res.text();

            if (!res.ok) {
                setStatus(`Error: ${text}`);
                return;
            }

            setStatus('Message sent anonymously!');
            setMessage('');
            setFromName('');
            setLink('');
        } catch (error) {
            setStatus('Error sending message. Please try again later.');
            console.error('Send message error', error);
        }
    };

    return (
        <div className="card" style={{ maxWidth: 600, margin: '0 auto', padding: 20}}>
            <h2>Send Anonymous Message</h2>
            {!presetId && (
                <input
                    className="input"
                    type="text"
                    placeholder="Paste recipient's link here (e.g.,  https://ngilo.app/send/abc123)"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    style={{ width: '100%', padding: 8, marginBottom: 10 }} 
                />
            )}
            <input
                className="input"
                type="text"
                maxLength={40}
                placeholder="From: your name (leave blank to stay Anonymous)"
                value={fromName}
                onChange={(e) => setFromName(e.target.value)}
                style={{ width: '100%', padding: 8, marginBottom: 10 }}
            />
            <textarea 
                className="input"
                placeholder="Your anonymous message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                style={{ width: '100%', padding: 10, marginBottom: 10 }}
            />
            <button className="btn" onClick={handleSend} style={{ padding: '10px 20px' }}>
                Send
            </button>
            {status && <p style= {{ marginTop: 10 }}> {status}</p>}
        </div>
    );
}

export default Message;