import React, { useState , useEffect } from 'react';
import { useAuth } from '../contexts/authContext';
import { doSignInWithEmail ,doSignInWithGoogle } from '../../auth';
import Profile from './Profile';

function UserLogin() {
  const [signingIn, setSigningIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { currentUser } = useAuth();
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email format');
      return;
    }

    if (!signingIn) {
      setSigningIn(true);
      try {
        await doSignInWithEmail(email, password);
        // setIsLoggedIn(true)
        console.log(currentUser)
      } catch (error) {
        setError(`Error signing in: ${error.message}`);
        console.error("Error signing in: ", error);
        // setIsLoggedIn(flase)
      } finally {
        setSigningIn(false);
      }
    }
  };

  const handlegoogle = async (e)=>{
    doSignInWithGoogle()
  }

  return (<>
    <div className="w-full lg:w-1/2 p-16">
      
      <h2 className="text-3xl font-bold mb-6">COHESIONX</h2>
      <h3 className="text-2xl font-semibold mb-8">Sign In to COHESIONX</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">YOUR email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">PASSWORD</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        {error && <p className="text-red-500 text-xs italic">{error}</p>}
        <button
          type="submit"
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full ${signingIn ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={signingIn}
        >
          {signingIn ? 'Signing In...' : 'Sign Up'}
        </button>
        <p className="text-center mt-4">Or</p>
        <button
          type="button"
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-200 rounded w-full"
          onClick={handlegoogle}
        >
          Sign Up with Google
        </button>
      </form>
    </div>

    </>
  );
}

export default UserLogin;
