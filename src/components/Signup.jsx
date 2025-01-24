import React, { useState, useEffect } from 'react';
import AdminLogin from './AdminLogin';
import UserLogin from './UserLogin';
import ModeratorLogin from './ModeratorLogin';
import ImageComponent from './ImageComponent';
import './Signup.css';
import Profile from './Profile';
import { useAuth } from '../contexts/authContext';

const roleDetails = {
  1: { name: 'Admin', component: <AdminLogin /> },
  2: { name: 'Moderator', component: <ModeratorLogin /> },
  3: { name: 'User', component: <UserLogin /> }
};

const Signup = () => {
  const [selectedRole, setSelectedRole] = useState(3);
  const [image, setImage] = useState('User');
  const { currentUser, IsLoggedIn, updateIsLoggedIn } = useAuth();

  useEffect(() => {
    return () => {
      if (currentUser) updateIsLoggedIn(true);
    };
  }, [currentUser, updateIsLoggedIn]);

  const handleAuth = (index) => {
    setSelectedRole(index);
    setImage(roleDetails[index].name);
  };

  return (
    <>
      {IsLoggedIn ? (
        <Profile />
      ) : (
        <div className='pt-20 h-full'>
        <div className="flex flex-col lg:flex-row justify-around bg-gray-100 mt-10 ">
          <div className="flex justify-center mt-2 w-full lg:w-1/2 relative z-10">
            <ImageComponent Image={image} />

            <div className="flex flex-col justify-around items-center w-full z-10 bg-black text-white bg-opacity-30 px-5 rounded-md">
              {Object.keys(roleDetails).map((roleIndex) => (
                <div
                  key={roleIndex}
                  className={`p-5 w-full lg:w-1/2 text-center text-2xl font-semibold rounded-full transition-all duration-500 ${
                    selectedRole == roleIndex ? 'bg-blue-500' : ''
                  }`}
                >
                  <button onClick={() => handleAuth(roleIndex)}>
                    {roleDetails[roleIndex].name}
                  </button>
                </div>
              ))}
            </div>
          </div>
            {roleDetails[selectedRole].component}
          
        </div>
        </div>
      )}
    </>
  );
};

export default Signup;
