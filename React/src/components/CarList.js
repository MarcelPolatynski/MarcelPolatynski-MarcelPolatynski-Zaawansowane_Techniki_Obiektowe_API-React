import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CarList = ({ handleLogout }) => {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('https://localhost:7132/api/cars');
        setCars(response.data);
      } catch (error) {
        console.error('Błąd pobierania listy samochodów:', error);
        setError('Błąd pobierania listy samochodów');
      }
    };

    fetchCars();
  }, []);

  const handleDelete = async (carId) => {
    try {
      await axios.delete(`https://localhost:7132/api/cars/${carId}`);
      setCars((prevCars) => prevCars.filter((car) => car.id !== carId));
    } catch (error) {
      console.error('Błąd usuwania samochodu:', error);
      setError('Błąd usuwania samochodu');
    }
  };

  const handleEdit = (carId) => {
    console.log(`Edytuj samochód o ID: ${carId}`);
  };

  return (
    <div>
      <h2>Lista Samochodów</h2>
      <a href="/login">
        <button onClick={handleLogout}>Wyloguj</button>
      </a>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>Marka</th>
                <th>Model</th>
                <th>Rok</th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr key={car.id}>
                  <td>{car.brand}</td>
                  <td>{car.model}</td>
                  <td>{car.year}</td>
                  <td>
                    <button onClick={() => handleEdit(car.id)}><Link to={`/editcar/${car.id}`}>Edytuj</Link></button>
                    <button onClick={() => handleDelete(car.id)}>Usuń</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link to="/addcar">
            <button>Dodaj Samochód</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CarList;
