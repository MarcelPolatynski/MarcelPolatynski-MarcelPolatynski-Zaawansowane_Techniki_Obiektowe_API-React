import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import AddCar from './components/AddCar';
import CarList from './components/CarList';
import EditCar from './components/EditCar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/addcar" element={<AddCar />} />
        <Route path="/carlist" element={<CarList />} />
        <Route path="/editcar/:carId" element={<EditCar />} />
      </Routes>
    </Router>
  );
}

export default App;
