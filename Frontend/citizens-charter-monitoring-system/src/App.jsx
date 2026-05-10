import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './App.css'
import HomePage from './Pages/Home/home'
import StaffLogin from './Pages/Auth/Login/StaffLogin';
import Login from './Pages/Auth/Login/Login';
import CitizenLogin from './Pages/Auth/Login/Login';
import TrackService from './Pages/Services/TrackServices';
import Navbar from './Components/common/Navbar/Navbar';
import Footer from './Components/common/Footer/Footer';
import { MyContext } from './Context';
import StaffDashboard from './Pages/StaffDashboard/StaffDashboard';
import { ToastContainer } from 'react-toastify';
import { jwtDecode } from "jwt-decode";
function App() {
  const [isLogin ,setIsLogin] = useState(false);
  const [user,setUser] = useState(null);
  const location = useLocation();
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      const decoded = jwtDecode(localStorage.getItem("token"));
      if (decoded.exp < Date.now() / 1000) {
        localStorage.removeItem("token");
      } else {
        if (decoded) {
          console.log(decoded)
          setUser(decoded);
          setIsLogin(true);
        }
      }
    }
  }, [localStorage.getItem("token")]);
  return (
    <MyContext.Provider value={{isLogin,user,setIsLogin,setUser}}>
      <Navbar/>
      <Routes>
          <Route path='/' element={<HomePage/>}></Route>
          <Route path='/login' element={<CitizenLogin/>}></Route>
          <Route path='/staff/login' element={<StaffLogin/>}></Route>
          <Route path='/track/shipment' element={<TrackService/>}></Route>
          <Route path='/staff/dashboard' element={<StaffDashboard/>}></Route>
      </Routes>
      <Footer></Footer>
    </MyContext.Provider>
  )
}

export default App
