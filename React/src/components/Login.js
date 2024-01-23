import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://localhost:7132/api/users/login', credentials);
      console.log(response.data);
      navigate('/carlist');
    } catch (error) {
      console.error('Błąd logowania:', error);
      setError('Błędne dane logowania');
    }
  };

  return (
    <div>
      <h2>Logowanie</h2>
      <label>Login:</label>
      <input type="text" value={credentials.username} onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} />
      <br />
      <label>Hasło:</label>
      <input type="password" value={credentials.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
      <br />
      <button onClick={handleLogin}>Zaloguj</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>Nie masz jeszcze konta? <Link to="/register">Zarejestruj się</Link>.</p>
    </div>
  );
};

export default Login;
