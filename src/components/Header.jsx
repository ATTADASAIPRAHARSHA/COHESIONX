import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { doSignOut } from '../../auth';

const Header = () => {
  const { currentUser, IsLoggedIn, updateIsLoggedIn ,Role } = useAuth();
  const navigate = useNavigate();
  const [Scrolled, setScrolled] = useState(false);
  const roundref = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0.01) {
        roundref.current.style.borderRadius = '50px'
        setScrolled(true);
      } else {
        roundref.current.style.borderRadius = '10px'
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (currentUser) {
      updateIsLoggedIn(true);
    } else {
      updateIsLoggedIn(false);
    }
  }, [currentUser]);

  const handleLogout = () => {
    updateIsLoggedIn(false);
    doSignOut();
  };

  const handleProfileClick = () => {
    navigate('/authentication');
  };

  return (
    <div
      className={`w-full fixed t-0 z-20 px-10 py-6  transition-opacity duration-300 ${
        Scrolled ? 'opacity-80' : 'opacity-100'
      } hover:opacity-100 ` }
    >
      <nav ref={roundref}
      style={{ borderRadius: '10px' }}  className={`transition-all duration-1000 duration-800 shadow-gray-500  py-1 bgdarkblue`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img
                className="h-12 w-auto rounded-full"
                src="/title.png"
                alt="Event Tracker Logo"
              />
            </div>

            {/* Navigation Links */}
            <div className="flex space-x-8 text-xl">
              <Link to="/" className="text-white hover:text-blue-600 px-3 py-2 font-medium">
                Home
              </Link>
              <Link to="/event" className="text-white hover:text-blue-600 px-3 py-2 font-medium">
                Events
              </Link>
              <Link to="/calendar" className="text-white hover:text-blue-600 px-3 py-2 font-medium">
                Calendar
              </Link>
              { Role === "user" ?
                <Link to="/contact" className="text-white hover:text-blue-600 px-3 py-2 font-medium">
                  Contact
                </Link> :
                <Link to="/Manage" className="text-white hover:text-blue-600 px-3 py-2 font-medium">
                  Manage
                </Link>
              }
            </div>

            {/* User Profile or Sign Up */}
            {IsLoggedIn && currentUser ? (
              <div className="flex items-center space-x-4">
                <button onClick={handleProfileClick} className="text-white rounded-full">
                    <img className="w-14 h-14 rounded-full border-2 border-black" src={currentUser.photoURL} alt="" />
                  {/* <div className="text-gray-800 hover:text-blue-600 px-3 py-2 w-14 h-14 font-medium border-2 rounded-full border-black">
                  </div> */}
                </button>
                <button onClick={handleLogout} className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700">
                  <div className="text-gray-800 hover:text-gray-100 px-3 py-2 font-bold">
                    Log Out
                  </div>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <button className="bglightblue text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  <Link to="/authentication" className="text-gray-800 hover:text-blue-600 px-3 py-2 font-medium font-bold">
                    Sign Up
                  </Link>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
