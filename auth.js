import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth';
import { auth } from './firebase'; // Adjust the path if necessary
// import { useAuth } from './src/contexts/authContext';

// Function to sign in with email and password 
export const doSignInWithEmail = async (email, password) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'user@example.com', password: 'password123' }),
          });
          const data = await response.json();
          console.log(data);
    } catch (error) {
        console.error("Error signing in with email and password: ", error);
        throw error;
    }
}

export const doCreateUserWithEmailAndPassword = async (email, password) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password}),
      });
      const data = await response.json();
      console.log(data);
}

// Function to sign in with Google
export const doSignInWithGoogle = async () => {
    console.log("hi")
    const response = await fetch(`${import.meta.env.VITE_API_URL}google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider : "google"}),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url; 
      } else {
        console.error("Google sign-in error:", data.error);
      }
}

// Function to sign out
export const doSignOut = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Error signing out: ", error);
        throw error;
    }
}