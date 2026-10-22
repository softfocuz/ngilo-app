import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Bulletinboard from '../components/Bulletinboard';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [count, setCount] = useState(null);
  const [since, setSince] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser || !storedUser.userId) {
      navigate('/login');
      return;
    }

    setUser(storedUser);

    fetch(`http://localhost:3001/api/messages/${storedUser.userId}`)
      .then((res) => res.json())
      .then((data) => setCount(data.length))
      .catch(() => {});

    fetch(`http://localhost:3001/api/user/${storedUser.userId}`)
      .then((res) => res.json())
      .then((data) => {
        // server stores UTC "YYYY-MM-DD HH:MM:SS"
        const d = new Date(String(data.created_at).replace(' ', 'T') + 'Z');
        if (!isNaN(d)) setSince(d.toLocaleDateString());
      })
      .catch(() => {});
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="page">
      <Navbar />

      <main className="container">
        <div className="card profile-card">
          <div className="avatar">{user.username.charAt(0).toUpperCase()}</div>
          <h1 className="profile-name">{user.username}</h1>
          <p className="profile-handle">@{user.username}</p>
          {since && <p className="member-since">Member since {since}</p>}

          <div className="stats">
            <div className="stat">
              <div className="num">{count === null ? '–' : count}</div>
              <div className="label">Messages received</div>
            </div>
          </div>

          <div className="profile-actions">
            <Link to="/" className="btn">Get My Link</Link>
            <Link to="/inbox" className="btn btn-outline">Open Inbox</Link>
            <button className="btn btn-danger" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        </div>

        <Bulletinboard userId={user.userId} />
      </main>
    </div>
  );
};

export default Profile;