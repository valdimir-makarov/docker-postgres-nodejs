// App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch('/showUserData');
    const data = await response.json();
    setUsers(data);
  };

  const createUser = async () => {
    await fetch('/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
    });
    setName('');
    setEmail('');
    fetchData();
  };

  const getUserById = async () => {
    const response = await fetch(`/UniqueUserById/${userId}`);
    const data = await response.json();
    setUserDetails(data);
  };

  return (
    <div className="App">
      <h1>User Management App</h1>
      <div>
        <h2>All Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name} - {user.email}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Create New User</h2>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button onClick={createUser}>Create User</button>
      </div>
      <div>
        <h2>Get User by ID</h2>
        <input type="text" placeholder="User ID" value={userId} onChange={(e) => setUserId(e.target.value)} />
        <button onClick={getUserById}>Get User</button>
        {userDetails && (
          <div>
            <h3>User Details</h3>
            <p>Name: {userDetails.name}</p>
            <p>Email: {userDetails.email}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
