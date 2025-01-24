import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth';
import { auth } from './firebase'; // Adjust the path if necessary
// import { useAuth } from './src/contexts/authContext';

// Function to sign in with email and password 
export const doSignInWithEmail = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential;
    } catch (error) {
        console.error("Error signing in with email and password: ", error);
        throw error;
    }
}

// Function to create a new user with email and password
export const doCreateUserWithEmailAndPassword = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential;
    } catch (error) {
        console.error("Error creating user with email and password: ", error);
        throw error;
    }
}

// Function to sign in with Google
export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        return result;
    } catch (error) {
        console.error("Error signing in with Google: ", error);
        throw error;
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