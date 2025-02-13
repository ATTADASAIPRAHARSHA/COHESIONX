import React, { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [IsLoggedIn, setIsLoggedIn] = useState(false);
  const [Events, setEvents] = useState([]);
  const [Role, setRole] = useState('user'); 
  const [Org, setOrg] = useState(null); 
  const [Participated, setParticipated] = useState([])
  const [OngoingEvents, setOngoingEvents] = useState([])
  const [user, setuser] = useState({})


    const handleAuthStateChange = async () => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        setCurrentUser(user);
        setLoading(true);
    
        if (user) {
          try {
            await fetchUserData(user); // Fetch user-related data
            setIsLoggedIn(true);
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        } else {
          setIsLoggedIn(false); // No user, set logged-out state
        }
    
        setLoading(false);
      });
    
      return unsubscribe;
    };

    const fetchUserData = async (user) => {
      try {
        const token = await user.getIdToken(); 
        const response = await fetch(`${import.meta.env.VITE_API_URL}api-auth`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
    
        // Check if response is OK
        if (!response.ok) {
          console.error("API Error:", response.status, response.statusText);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        // Check if response is valid JSON
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await response.text();
          throw new Error(`Unexpected response format: ${text}`);
        }
    
        const data = await response.json();
        console.log("User data fetched:", data);
    
        setuser(data.user);
        setRole(data.user?.role || '');
        setOrg(data.user?.org || '');
        setParticipated(data.user?.["participated-events"] || []);
        setOngoingEvents(data.user?.["ongoing-events"] || []);
        console.log("User data fetched:", data);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };
    
    
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}events-get`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        const data = await response.json();
        console.log("events fetched")
        setEvents(data);
        console.log("events fetched")
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    
  

    useEffect(() => {
      let unsubscribe;
    
      const initialize = async () => {
        unsubscribe = await handleAuthStateChange(); 
        fetchEvents(); 
      };
    
      initialize();
    
      return () => {
        if (unsubscribe) {
          unsubscribe(); 
        }
      };
    }, []);
    
    
    

  const updateIsLoggedIn = (status) => {
    setIsLoggedIn(status);
  };

  const value = {
    currentUser,
    loading,
    IsLoggedIn,
    updateIsLoggedIn,
    Events,
    setEvents,
    Role,
    setRole,
    Org,
    Participated,
    OngoingEvents,
    user,
    fetchEvents
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* Only render children once loading is done */}
    </AuthContext.Provider>
  );
}
