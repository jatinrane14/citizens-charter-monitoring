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
function App() {
  const [isLogin ,setIsLogin] = useState(false);
  const [user,setUser] = useState(false);
  useEffect(()=>{
    let token = localStorage.getItem("token")
  },[localStorage.getItem("token")])
  return (
    <MyContext.Provider value={{isLogin,user}}>
    <Router>
      <Navbar/>
      <Routes>
          <Route path='/' element={<HomePage/>}></Route>
          <Route path='/login' element={<CitizenLogin/>}></Route>
          <Route path='/staff/login' element={<StaffLogin/>}></Route>
          <Route path='/track/shipment' element={<TrackService/>}></Route>
      </Routes>
      <Footer></Footer>
    </Router>
    </MyContext.Provider>
  )
}

export default App
