// import React, { useState , useEffect } from 'react';
// import { useAuth } from '../contexts/authContext';
// import { doSignInWithEmail ,doSignInWithGoogle ,doCreateUserWithEmailAndPassword} from '../../auth';
// import Profile from './Profile';

// function UserLogin() {
//   const [signingIn, setSigningIn] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const { currentUser } = useAuth();



//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(''); 

//     if (!/\S+@\S+\.\S+/.test(email)) {
//       setError('Invalid email format');
//       return;
//     }

//     if (!signingIn) {
//       setSigningIn(true);
//       try {
//         await doCreateUserWithEmailAndPassword(email, password);
//         // setIsLoggedIn(true)
//         console.log(currentUser)
//       } catch (error) {
//         setError(`Error signing in: ${error.message}`);
//         console.error("Error signing in: ", error);
//         // setIsLoggedIn(flase)
//       } finally {
//         setSigningIn(false);
//       }
//     }
//   };

//   const handlegoogle = async (e)=>{
//     doSignInWithGoogle()
//   }

//   return (<>
//     <div className="w-full lg:w-1/2 p-16">

//       <h2 className="text-3xl font-bold mb-6">COHESIONX</h2>
//       <h3 className="text-2xl font-semibold mb-8">Sign In to COHESIONX</h3>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-6">
//           <label htmlFor="email" className="block text-white text-sm font-bold mb-2">YOUR email</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter your email"
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
//             required
//           />
//         </div>
//         <div className="mb-6">
//           <label htmlFor="password" className="block text-white text-sm font-bold mb-2">PASSWORD</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Enter your password"
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
//             required
//           />
//         </div>
//         {error && <p className="text-red-500 text-xs italic">{error}</p>}
//         <button
//           type="submit"
//           className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full ${signingIn ? 'opacity-50 cursor-not-allowed' : ''}`}
//           disabled={signingIn}
//         >
//           {signingIn ? 'Signing In...' : 'Sign Up'}
//         </button>
//         <p className="text-center mt-4">Or</p>
//         <button
//           type="button"
//           className=" text-white font-semibold py-2 px-4 "
//           onClick={handlegoogle}
//         >
//           <span className='border border-gray-200 rounded w-full px-4 py-2 hover:text-red-300'>Sign Up with Google</span>
//         </button>
//       </form>
//     </div>

//     </>
//   );
// }

// export default UserLogin;

import React, { useState } from "react";
import { Eye, EyeOff, User } from "lucide-react";
import { doSignInWithGoogle, doCreateUserWithEmailAndPassword } from "../../auth";
import { useAuth } from "../contexts/authContext";

const GoogleIcon = () => (
  <span className="w-5 h-5 inline-block" aria-hidden="true">
    <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
      <g>
        <path fill="#4285F4" d="M43.611 20.083h-1.777V20H24.04v8.001h11.186c-1.482 4.158-5.447 7.16-11.186 7.16-6.575 0-11.918-5.343-11.918-11.918S17.465 11.325 24.04 11.325c3.057 0 5.827 1.14 7.974 3.007l6.012-6.012C34.074 5.203 29.323 3 24.04 3 12.85 3 3.877 11.973 3.877 23.161s8.973 20.161 20.163 20.161c11.647 0 19.746-8.184 19.746-19.747 0-1.325-.14-2.344-.341-3.492z" />
        <path fill="#34A853" d="M6.36 14.695l6.572 4.821c1.781-3.499 5.173-5.934 9.316-5.934 2.625 0 5.005.901 6.868 2.382l5.25-5.25C31.355 7.546 27.981 6.001 24.04 6.001c-5.83 0-10.777 3.97-12.976 8.694z" />
        <path fill="#FBBC05" d="M24.04 43.321c4.897 0 8.998-1.617 11.998-4.39l-5.515-4.517c-2.042 1.431-4.649 2.272-7.376 2.272-5.667 0-10.46-3.834-12.184-9.106l-5.657 4.362c2.99 5.903 8.956 9.379 16.734 9.379z" />
        <path fill="#EA4335" d="M43.611 20.083h-1.777V20H24.04v8.001h11.186c-.528 2.048-1.697 3.76-3.515 5.265h.001l5.535 4.495c3.217-2.975 5.07-7.355 5.07-12.495 0-1.169-.106-2.332-.316-3.482z" />
      </g>
    </svg>
  </span>
);

const UserLogin = () => {
  const { currentUser } = useAuth();
  const [mode, setMode] = useState("login");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [loginValues, setLoginValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const [signupValues, setSignupValues] = useState({
    username: "",
    email: "",
    password: "",
    showPassword: false,
  });

  const toggleVisibility = (form) => {
    if (form === "login") {
      setLoginValues({ ...loginValues, showPassword: !loginValues.showPassword });
    } else {
      setSignupValues({ ...signupValues, showPassword: !signupValues.showPassword });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError("");
      await doSignInWithGoogle();
    } catch (err) {
      setError("Google Sign In Failed: " + err.message);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    const { email, password } = signupValues;

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email format");
      return;
    }

    setLoading(true);
    try {
      await doCreateUserWithEmailAndPassword(email, password);
      console.log("User created:", currentUser);
    } catch (err) {
      setError("Signup Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("Login not implemented");
  };

  const slideClass = mode === "login" ? "translate-x-0" : "-translate-x-1/2";

  return (
    <main className="w-full max-w-lg glass-morphism bg-[#181834]/90 rounded-3xl shadow-2xl px-3 py-8 flex flex-col items-center transition-all">
      <div className="flex flex-col items-center mb-3">
        <span className="bg-gradient-to-br from-primary to-blue-400 p-3 rounded-full mb-1 shadow-lg">
          <User className="w-9 h-9 text-white" />
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold font-playfair text-gradient-primary text-center tracking-tight">
          COHESION-X
        </h1>
        <span className="text-sm text-gray-400 font-inter tracking-wide">
          User login
        </span>
      </div>

      <div className="flex items-center w-full max-w-xs mx-auto bg-white/5 p-1 rounded-xl border border-gray-800 mb-5">
        <button
          className={`flex-1 py-2 rounded-xl transition-all duration-300 outline-none text-white ${mode === "login" ? "bg-gray-600 font-black" : ""}`}
          onClick={() => setMode("login")}
        >
          Login
        </button>
        <button
          className={`flex-1 py-2 rounded-xl transition-all duration-300 outline-none text-white ${mode === "signup" ? "bg-gray-600 font-black" : ""}`}
          onClick={() => setMode("signup")}
        >
          Signup
        </button>
      </div>

      <div className="relative w-full max-w-md overflow-x-hidden h-[360px] sm:h-[330px] select-none">
      {/* <div className="relative w-full max-w-md overflow-x-hidden select-none"> */}
        <div className={`absolute top-0 left-0 flex w-[200%] h-full transition-transform duration-600 ease-in-out ${slideClass}`}>
          {/* Login Form */}
          <form onSubmit={handleLogin} className="w-1/2 pr-2 flex flex-col gap-5 justify-center">
            <input
              type="email"
              placeholder="Email"
              value={loginValues.email}
              onChange={(e) => setLoginValues({ ...loginValues, email: e.target.value })}
              className="px-4 py-3 rounded-xl bg-[#1f1f35] text-white border border-primary/30"
              required
            />
            <div className="relative">
              <input
                type={loginValues.showPassword ? "text" : "password"}
                placeholder="Password"
                value={loginValues.password}
                onChange={(e) => setLoginValues({ ...loginValues, password: e.target.value })}
                className="px-4 py-3 pr-10 rounded-xl bg-[#1f1f35] text-white border border-primary/30 w-full"
                required
              />
              <button
                type="button"
                onClick={() => toggleVisibility("login")}
                className="absolute right-3 top-3 text-gray-400"
              >
                {loginValues.showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl"
            >
              Login
            </button>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="mt-2 bg-white text-black py-2 px-4 rounded-xl flex items-center justify-center gap-2"
            >
              <GoogleIcon /> Sign in with Google
            </button>
          </form>

          {/* Signup Form */}
          <form onSubmit={handleSignup} className="w-1/2 p-2 flex flex-col gap-5 justify-center">
            <input
              type="text"
              placeholder="Username"
              value={signupValues.username}
              onChange={(e) => setSignupValues({ ...signupValues, username: e.target.value })}
              className="px-4 py-3 rounded-xl bg-[#1f1f35] text-white border border-primary/30"
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={signupValues.email}
              onChange={(e) => setSignupValues({ ...signupValues, email: e.target.value })}
              className="px-4 py-3 rounded-xl bg-[#1f1f35] text-white border border-primary/30"
              required
            />
            <div className="relative">
              <input
                type={signupValues.showPassword ? "text" : "password"}
                placeholder="Password"
                value={signupValues.password}
                onChange={(e) => setSignupValues({ ...signupValues, password: e.target.value })}
                className="px-4 py-3 pr-10 rounded-xl bg-[#1f1f35] text-white border border-primary/30 w-full"
                required
              />
              <button
                type="button"
                onClick={() => toggleVisibility("signup")}
                className="absolute right-3 top-3 text-gray-400"
              >
                {signupValues.showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-xl"
            >
              {loading ? "Signing up..." : "Signup"}
            </button>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="mt-2 bg-white text-black py-2 px-4 rounded-xl flex items-center justify-center gap-2"
            >
              <GoogleIcon /> Sign up with Google
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default UserLogin;
