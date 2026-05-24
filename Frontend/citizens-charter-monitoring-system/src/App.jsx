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
import ManagerDashboard from './Pages/StaffDashboard/Manager/ManagerDashhboard';
import ClerkDashboard from './Pages/StaffDashboard/Clerk/ClerkDashboard'
import CitizenRegister from './Pages/Auth/Regester/CitizenRegister'
import AdminDashboard from './Pages/Admin/AdminDashboard'
import ListMyComplaints from './Pages/Services/ListMyComplaints'
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
  const hideNavbarPaths = ["/clerk/dashboard","/manager/dashboard","/admin/dashboard","/official/dashboard"];
  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);
  return (
    <MyContext.Provider value={{isLogin,user,setIsLogin,setUser}}>

      {!shouldHideNavbar && <Navbar/>}
      <Routes>
          <Route path='/' element={<HomePage/>}></Route>
          <Route path='/login' element={<CitizenLogin/>}></Route>
          <Route path='/register' element={<CitizenRegister></CitizenRegister>}></Route>
          <Route path='/staff/login' element={<StaffLogin/>}></Route>
          <Route path='/track/shipment' element={<TrackService/>}></Route>
          <Route path='/user/complaints' element={<ListMyComplaints/>}></Route>
          <Route path='/staff/dashboard' element={<StaffDashboard/>}></Route>
          <Route path='/manager/dashboard' element={<ManagerDashboard/>}></Route>
          <Route path='/clerk/dashboard' element={<ClerkDashboard/>}></Route>
          <Route path='/admin/dashboard' element={<AdminDashboard/>}></Route>
          <Route path='/official/dashboard' element={<AdminDashboard/>}></Route>
      </Routes>
      <Footer></Footer>
    </MyContext.Provider>
  )
}

export default App
