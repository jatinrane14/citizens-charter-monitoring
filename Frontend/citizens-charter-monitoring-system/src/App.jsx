import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './App.css'
import HomePage from './Pages/Home/home'
import StaffLogin from './Pages/Auth/Login/StaffLogin';
function App() {

  return (
    <Router>

      <Routes>
          <Route path='/' element={<HomePage/>}></Route>
          <Route path='/staff/login' element={<StaffLogin/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
