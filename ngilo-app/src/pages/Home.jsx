import React, {useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import GenerateLink from '../components/GenerateLink';
import Message from '../components/Message';
 
const Home = () => {
  const [greeting, setGreeting] = useState("");
  const [username, setUsername] = useState("User");
  const [showComponent, setShowComponent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const hour = new Date().getHours();
    setGreeting(
      hour < 12 ? 'Good Morning':
      hour < 18 ? 'Good Afternoon':
      'Good Evening'
    );

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser || !storedUser.userId) {
      navigate('/login');
      return;
    }

    if (storedUser && storedUser.userId) {
      fetch(`http://localhost:3001/api/user/${storedUser.userId}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch user");
          return res.json();
        })
        .then((data) => setUsername(data.username))
        .catch(() => {
          setUsername(storedUser.username || "User");
        });
    }
  }, [navigate]);


  return (
    <>
    <Navbar />
    <div style={{ padding: "2rem", textAlign: "center"}}>
      <h1>{greeting}, {username}!</h1>
      <p>What would you like to do?</p>

      <button className="btn" onClick={() => setShowComponent('message')}
      style={{ marginRight: "1rem", padding: "10px 20px" }}
      >
        Send Anonymous Message
      </button>

      <button
      className="btn"
      onClick={() => setShowComponent('generate')}
      style={{ padding: "10px 20px"}}>
        Generate Link
      </button>

      <div className="user-msg" style={{ marginTop: '2rem'}}>
        {showComponent === 'generate' && <GenerateLink />}
        {showComponent === 'message' && <Message />}
      </div>

      {showComponent === null && (
        <section className="how">
          <h2 className="how-title">How Ngilo works</h2>
          <div className="how-grid">
            <div className="how-card">
              <span className="how-num">1</span>
              <h3>Generate your link</h3>
              <p>Press Generate Link to get your own personal link.</p>
            </div>
            <div className="how-card">
              <span className="how-num">2</span>
              <h3>Share it</h3>
              <p>Send the link to friends so they can message you anonymously.</p>
            </div>
            <div className="how-card">
              <span className="how-num">3</span>
              <h3>Read your messages</h3>
              <p>Open your Inbox or Profile to see every note pinned on your board.</p>
            </div>
          </div>
        </section>
      )}
    </div>
    </>
  );
};

export default Home;