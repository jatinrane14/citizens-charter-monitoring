import React, { useContext } from 'react'
import { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MyContext } from '../../../Context';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { NotificationAdd, Notifications } from '@mui/icons-material';

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const {isLogin,setIsLogin,user,setUser} = useContext(MyContext);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenTrackOrder = () => {
    navigate("/track/shipment");
    handleClose();
  };
  const handleLogout=()=>{
    localStorage.removeItem("token");
    setIsLogin(false);
    setUser(false);
    navigate("/login")
  }
  return (
    <nav
      className={`sticky top-0 z-50 bg-gray-950/90 backdrop-blur-md border-b border-white/5 transition-shadow duration-200 ${
        scrolled ? "shadow-lg shadow-black/40" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 no-underline group">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-500 transition-colors">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm-1 14H5V8h14v10zm-7-7a3 3 0 100 6 3 3 0 000-6z" />
              </svg>
            </div>
            <span className="font-semibold text-white text-sm tracking-tight">
              DoP System
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            <Link to={"/"} className="text-sm px-3 py-1.5 rounded-md text-gray-400 hover:text-white hover:bg-white/5 transition-colors duration-150 no-underline">Home</Link>
            <Notifications sx={{fill:"white"}}/>
            {(!isLogin)?
                <React.Fragment>
                    <Link
              to={"/login"}
              className="ml-2 text-sm px-4 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-500 transition-colors duration-150 no-underline"
            >
              Citizen Login
            </Link>
            <Link
              to={"/staff/login"}
              className="ml-2 text-sm px-4 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-500 transition-colors duration-150 no-underline"
            >
              Staff Login
            </Link>
                </React.Fragment>
            :
            <React.Fragment>
                {/* <Link to={"/track/shipment"} className="text-sm px-3 py-1.5 rounded-md text-gray-400 hover:text-white hover:bg-white/5 transition-colors duration-150 no-underline">Track Service</Link> */}
                <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="white"
              >
                <AccountCircle  sx={{fill:"white",scale:"1.5"}}/>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                {/* Menu items for citizen */}
                {(user?.role == "CITIZEN")?
                <MenuItem onClick={handleOpenTrackOrder}>Track Order</MenuItem>
                :null
              }
                {(user?.role == "CITIZEN")?
                <MenuItem onClick={handleOpenTrackOrder}>My complaints</MenuItem>
                :null
              }
                {/* Menus for Postal stcitizenaff */}
                {(user?.role == "POSTAL_STAFF")?
                <MenuItem onClick={handleClose}>Dashboard</MenuItem>
                :null
                
              }
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
            </React.Fragment>
            }
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-1.5 rounded-md text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/5 px-6 py-3 flex flex-col gap-1 bg-gray-950">
            <a
              href="#"
              className="text-sm px-3 py-2 rounded-md text-gray-400 hover:bg-white/5 hover:text-white no-underline"
            >
              Home
            </a>
          <Link to={"/staff/login"}
            className="mt-1 text-sm px-3 py-2 rounded-md bg-blue-600 text-white text-center no-underline"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar
