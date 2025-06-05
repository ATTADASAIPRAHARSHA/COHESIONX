import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { doSignOut } from '../../auth';

const Header = () => {
  const { currentUser, IsLoggedIn, updateIsLoggedIn, Role, setRole } = useAuth();
  const navigate = useNavigate();
  const [Scrolled, setScrolled] = useState(false);
  const roundref = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0.01) {
        // roundref.current.style.borderRadius = '50px'
        setScrolled(true);
      } else {
        // roundref.current.style.borderRadius = '10px'
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
    setRole('user')
    doSignOut();
  };

  const handleProfileClick = () => {
    navigate('/authentication');
  };

  return (
    <div className={`w-full fixed t-0 z-20 px-10  transition-opacity duration-300 ${Scrolled ? 'opacity-80' : 'opacity-100'
        } hover:opacity-100 bg-gradient-to-b from-black via-black/80 to-transparent`}>
      <nav ref={roundref}
        style={{ borderRadius: '10px' }} className={`transition-all duration-1000 duration-800 shadow-gray-500  py-3 `}>
        <div className="max-w-7xl mx-auto ">
          <div className="flex justify-between items-center h-16">
            <div className='flex items-center gap-14'>
              <div className="flex-shrink-0">
                <img
                  className="h-12 w-auto rounded-full"
                  src="/title.png"
                  alt="Event Tracker Logo"
                />
              </div>

              <div className="flex space-x-6 text-xl">
                <Link to="/" className="text-white hover:text-blue-200 relative after:rounded-xl py-2 font-medium relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gray-400 after:transition-all after:duration-300 hover:after:w-full outline-white">
                  Home
                </Link>
                <Link to="/event" className="text-white hover:text-blue-200 relative relative after:rounded-xl after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gray-400 after:transition-all after:duration-300 hover:after:w-full py-2 font-medium outline-white">
                  Events
                </Link>
                <Link to="/calendar" className="text-white hover:text-blue-200 relative relative after:rounded-xl after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gray-400 after:transition-all after:duration-300 hover:after:w-full py-2 font-medium outline-white">
                  Calendar
                </Link>
                {Role === "admin" || Role === "moderator" ?
                  <Link to="/manage" className="text-white hover:text-blue-200 relative relative after:content-[''] after:rounded-xl after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gray-400 after:transition-all after:duration-300 hover:after:w-full py-2 font-medium outline-white">
                    Manage
                  </Link> :
                  <Link to="/contact" className="text-white hover:text-blue-200 relative relative after:rounded-xl after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gray-400 after:transition-all after:duration-300 hover:after:w-full py-2 font-medium outline-white">
                    Contact
                  </Link> 
                }
              </div>
            </div>
            {IsLoggedIn ? (
              <div className="flex items-center space-x-4">
                <button onClick={handleProfileClick} className="text-white rounded-full">
                  <img className="w-14 h-14 rounded-full border-2 border-black" src={currentUser.user_metadata.avatar_url} alt="" />
                </button>
                <button onClick={handleLogout} className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700">
                  <div className="text-gray-800 hover:text-gray-100 px-3 py-2 font-bold">
                    Log Out
                  </div>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <button className="bglightblue text-white px-4 py-2 transistion-all duartion-1000 rounded-md hover:bg-blue-700">
                  <Link to="/authentication" className="text-gray-800 transistion-all duartion-1000 hover:text-white px-3 py-2 font-medium font-bold">
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
