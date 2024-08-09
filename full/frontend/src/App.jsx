import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './Pages/Home/Home';
import NotFound from './Pages/NotFound/NotFound';
import Success from './Pages/Success/Success';
import Mainmenu from './Pages/Menu/Mainmenu';
import Login from './Pages/Login/Login';
import Register from './Pages/Login/Register';
import Admin from './Pages/Login/Admin';

import Reserv from './Pages/Login/Reserv';
import UserDashboard from './Pages/Login/UserDashboard';
import Ordermgt from './Pages/Login/Ordermgt';
import UserManagement from './Pages/Login/UserManagement';
import Order1 from './Pages/Order/Order1';
import Ordercon from './Pages/Order/Ordercon';
import './App.css';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/success' element={<Success />} />
          <Route path='menu' element={<Mainmenu />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path="/login/dashboard" element={<UserDashboard />} /> 
          <Route path='/admin' element={<Admin />}>
            <Route path="users" element={<UserManagement />} />
            <Route path="orders" element={<Ordermgt />} />
            <Route path="reserv" element={<Reserv />} />
            <Route index element={<UserManagement />} /> {/* Default route */}
          </Route>
          <Route path='order' element={<Order1 />} />
          <Route path='ordercon' element={<Ordercon />} />
          <Route path='*' element={<NotFound />} /> {/* Catch-all route */}
        </Routes>
        <Toaster />
      </Router>
    </>
  );
};

export default App;
