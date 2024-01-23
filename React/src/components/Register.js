import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
  const [newUser, setNewUser] = useState({ username: '', password: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('https://localhost:7132/api/users/register', newUser);
      console.log(response.data);
      setSuccessMessage('Rejestracja zakończona sukcesem');
      
    } catch (error) {
      console.error('Błąd rejestracji:', error);
      setError('Błąd rejestracji');
    }
  };

  return (
    <div>
      <h2>Rejestracja</h2>
      <label>Login:</label>
      <input type="text" value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} />
      <br />
      <label>Hasło:</label>
      <input type="password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
      <br />
      <button onClick={handleRegister}>Zarejestruj</button>
    
      <p><Link to="/login">Powrót do strony logowania</Link>.</p>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Register;
