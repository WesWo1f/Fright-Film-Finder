import React, { useState } from 'react';
import axios from 'axios';
import "../styles/signUp.css"

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = { username, password };
    // Replace with your server endpoint
    await axios.post('http://localhost:5000/signup', user);
    setUsername('');
    setPassword('');
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;