// import React, { useState, useEffect } from 'react';
// import AdminLogin from './AdminLogin';
// import UserLogin from './UserLogin';
// import ModeratorLogin from './ModeratorLogin';
// import ImageComponent from './ImageComponent';
// import './Signup.css';
// import Profile from './Profile';
// import { useAuth } from '../contexts/authContext';

// const roleDetails = {
//   1: { name: 'Admin', component: <AdminLogin /> },
//   2: { name: 'Moderator', component: <ModeratorLogin /> },
//   3: { name: 'User', component: <UserLogin /> }
// };

// const Signup = () => {
//   const [selectedRole, setSelectedRole] = useState(3);
//   const [image, setImage] = useState('User');
//   const { currentUser, IsLoggedIn, updateIsLoggedIn } = useAuth();

//   useEffect(() => {
//     return () => {
//       if (currentUser) updateIsLoggedIn(true);
//     };
//   }, [currentUser, updateIsLoggedIn]);

//   const handleAuth = (index) => {
//     setSelectedRole(index);
//     setImage(roleDetails[index].name);
//   };

//   return (
//     <>
//       {IsLoggedIn && currentUser ? (
//         <Profile />
//       ) : (
//         <div className='pt-20 h-full text-white'>
//         <div className="flex flex-col lg:flex-row justify-around mt-10">
//           <div className="flex justify-center mt-2 w-full lg:w-1/2 relative z-10">
//             <ImageComponent Image={image} />

//             <div className="flex flex-col justify-around items-center w-full z-10 bg-black text-white bg-opacity-30 px-5 rounded-md">
//               {Object.keys(roleDetails).map((roleIndex) => (
//                 <div
//                   key={roleIndex}
//                   className={`p-5 w-full lg:w-1/2 text-center text-2xl font-semibold rounded-full transition-all duration-500 text-white ${
//                     selectedRole == roleIndex ? 'bg-blue-500' : ''
//                   }`}
//                 >
//                   <button onClick={() => handleAuth(roleIndex)} className="text-white">
//                     {roleDetails[roleIndex].name}
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//             {roleDetails[selectedRole].component}
          
//         </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Signup;


import React, { useState, useEffect } from "react";
import AdminLogin from "./AdminLogin";
import UserLogin from "./UserLogin";
import ModeratorLogin from "./ModeratorLogin";
import Profile from "./Profile";
import { useAuth } from "../contexts/authContext";

const roleDetails = {
  Admin: { name: "Admin", component: <AdminLogin /> },
  Moderator: { name: "Moderator", component: <ModeratorLogin /> },
  User: { name: "User", component: <UserLogin /> },
};

const roleImages = {
  Admin: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
  Moderator: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
  User: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=1200&q=80",
};

const roles = ["Admin", "Moderator", "User"];

export default function Signup() {
  const [selectedRole, setSelectedRole] = useState("User");
  const [image, setImage] = useState(roleImages["User"]);
  const { currentUser, IsLoggedIn, updateIsLoggedIn } = useAuth();

  useEffect(() => {
    return () => {
      if (currentUser) updateIsLoggedIn(true);
    };
  }, [currentUser, updateIsLoggedIn]);

  const handleAuth = (role) => {
    setSelectedRole(role);
    setImage(roleImages[role]);
  };

  return (
    <>
      {IsLoggedIn && currentUser ? (
        <Profile />
      ) : (
        <div className="pt-20 text-white flex">
          {/* Left Side: Background Image */}
          <div
            className="flex flex-col items-center justify-center w-1/2"
            style={{
              background: `url('${roleImages[selectedRole]}') center/cover no-repeat`,
              filter: "blur(0.5px) brightness(0.55)",
              height: "100vh",
            }}
          >
            {/* Role Selection Overlay with Flex Column */}
            <div className="flex flex-col gap-6 items-center z-10 p-4">
              {roles.map((role) => (
                <button
                key={role}
                type="button"
                onClick={() => handleAuth(role)}
                className={`group w-[150px] py-4 px-4 flex items-center justify-center rounded-xl font-semibold text-lg text-white bg-white/10 backdrop-blur-lg border border-white/20 transition-all duration-300 drop-shadow focus:outline-none select-none shadow-lg ${
                  selectedRole === role
                    ? "bg-white text-white shadow-[0_0_0_8px_rgba(55,133,255,0.6)] border-blue-500/80 ring-4 ring-blue-500/40"
                    : "hover:bg-white/20 text-white/90"
                }`}
                style={{
                  boxShadow:
                    selectedRole === role
                      ? "0 0 20px 6px rgba(55, 133, 255, 0.5), 0 2px 12px 0 rgba(13, 23, 70, 0.2)"
                      : "0 1.5px 6px rgba(39, 39, 80, 0.1)",
                }}
                aria-pressed={selectedRole === role}
              >
                {role}
              </button>
              
              
              
              ))}
            </div>
          </div>

          {/* Right Side: Login Component */}
          <div className="relative z-10 flex flex-col items-center gap-8 w-1/2 py-14 px-7 lg:px-10 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30">

            {/* Render the selected role's login component */}
            {roleDetails[selectedRole].component}
          </div>
        </div>
      )}
    </>
  );
}
