import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/authContext';
import Profilepage from '../Dsiplaycomponents/Profilepage';
import Dashboard from '../Dsiplaycomponents/Dashboard.jsx';
import Settings from '../Dsiplaycomponents/Settings';
import VIIT from '../Dsiplaycomponents/VIIT';
import Help from '../Dsiplaycomponents/Help';  // Assuming Help is defined somewhere
import Suggeestions from '../Dsiplaycomponents/Suggeestions'; // Assuming Suggestions is defined somewhere

const Profile = () => {
  const { currentUser, IsLoggedIn, updateIsLoggedIn, user } = useAuth();
  const [Display, setDisplay] = useState('Profilepage');

  useEffect(() => {
    if (currentUser) {
      updateIsLoggedIn(true);
      console.log(user);
    }
  }, [currentUser]);

  const handleDisplaySet = (e) => {
    setDisplay(e.target.value);
  };

  return (
    <>
      <div className="pt-20 h-full">
        {IsLoggedIn && currentUser && (
          <div className="mx-5 sm:mx-10 lg:mx-10 my-5 p-4 sm:p-6 md:p-10 lg:p-20">
            <div className="flex gap-4 flex-col sm:flex-row bglightblue p-5 items-center">
              <div className="image flex w-1/3 sm:w-1/5 p-4 sm:p-0 justify-center">
                <img src={currentUser.photoURL} alt="profile img" className="w-1.5/4 h-full rounded-full" />
              </div>
              <div className="personal flex flex-col text-left w-full justify-center sm:w-3/5 p-4">
                <div className="flex mb-2 uppercase text-xl font-bold">
                  {currentUser.displayName}
                </div>
                <div className="flex mb-2">
                  {currentUser.desc || user.desc}
                </div>
              </div>
              <div>
                <img src="https://www.static-contents.youth4work.com/university/Documents/Colleges/collegeLogo/418791.JPG?v=20161103190851" className='w-15 h-20 rounded-full' alt="img" />
              </div>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap mt-4 gap-5">
              {/* Sidebar options */}
              <div className="options bglightblue p-5 sm:p-10 w-full sm:w-1/4 lg:w-1/5 rounded-lg">
                <div className='pb-4'><button onClick={handleDisplaySet} value='Profilepage' className="w-full sm:w-auto">Profile</button></div>
                <div className='pb-4'><button onClick={handleDisplaySet} value='Dashboard' className="w-full sm:w-auto">Dashboard</button></div>
                <div className='pb-4'><button onClick={handleDisplaySet} value='Settings' className="w-full sm:w-auto">Settings</button></div>
                <div className='pb-4'><button onClick={handleDisplaySet} value='Help' className="w-full sm:w-auto">Help</button></div>
                <div className='pb-4'><button onClick={handleDisplaySet} value='Suggestions' className="w-full sm:w-auto">About</button></div>
                <div className='pb-4'><button onClick={handleDisplaySet} value='VIIT' className="w-full sm:w-auto">VIIT</button></div>
              </div>
              {/* Display selected component */}
              <div className="display w-full sm:w-3/4 lg:w-4/5 mt-4 sm:mt-0">
                {Display === 'Profilepage' ? (
                  <Profilepage />
                ) : Display === 'Dashboard' ? (
                  <Dashboard />
                ) : Display === 'Settings' ? (
                  <Settings />
                ) : Display === 'Help' ? (
                  <Help />
                ) : Display === 'VIIT' ? (
                  <VIIT />
                ) : Display === 'Suggestions' ? (
                  <Suggeestions />
                ) : (
                  <div><h1>Page Not Found</h1></div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
