import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditCar = () => {
  const { carId } = useParams();

  const [car, setCar] = useState({
    brand: '',
    model: '',
    year: '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(`https://localhost:7132/api/cars/${carId}`);
        setCar(response.data);
      } catch (error) {
        console.error('Błąd pobierania informacji o samochodzie:', error);
        setError('Błąd pobierania informacji o samochodzie');
      }
    };

    fetchCar();
  }, [carId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCar((prevCar) => ({
      ...prevCar,
      [name]: value,
    }));
  };

  const handleUpdateCar = async () => {
    try {
      await axios.put(`https://localhost:7132/api/cars/${carId}`, car);
      setSuccessMessage('Edycja powiodła się');
      setError(''); 
    } catch (error) {
      console.error('Błąd aktualizacji samochodu:', error);
      setSuccessMessage(''); 
      setError('Błąd edycji');
    }
  };

  return (
    <div>
      <h2>Edytuj Samochód</h2>
      <div>
        <form>
          <label>Marka:</label>
          <input type="text" name="brand" value={car.brand} onChange={handleInputChange} />

          <label>Model:</label>
          <input type="text" name="model" value={car.model} onChange={handleInputChange} />

          <label>Rok produkcji:</label>
          <input type="text" name="year" value={car.year} onChange={handleInputChange} />

          <button type="button" onClick={handleUpdateCar}>
            Zaktualizuj Samochód
          </button>
        </form>

        <a href="/carlist">
            <button>Powrót</button>
        </a>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      </div>
    </div>
  );
};

export default EditCar;
