import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AddCar = () => {
  const [car, setCar] = useState({ brand: '', model: '', year: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const handleAddCar = async () => {
    try {
      const response = await axios.post('https://localhost:7132/api/cars', car);
      console.log(response.data);
      setSuccessMessage('Samochód został dodany pomyślnie');
    } catch (error) {
      console.error('Błąd dodawania samochodu:', error);
      setError('Błąd dodawania samochodu');
    }
  };

  return (
    <div>
      <h2>Dodaj Samochód</h2>
      <label>Marka:</label>
      <input type="text" value={car.brand} onChange={(e) => setCar({ ...car, brand: e.target.value })} />
      <br />
      <label>Model:</label>
      <input type="text" value={car.model} onChange={(e) => setCar({ ...car, model: e.target.value })} />
      <br />
      <label>Rok:</label>
      <input type="text" value={car.year} onChange={(e) => setCar({ ...car, year: e.target.value })} />
      <br />
      <button onClick={handleAddCar}>Dodaj Samochód</button>

      <p><Link to="/carlist">Powrót do listy samochodów</Link>.</p>

      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AddCar;
