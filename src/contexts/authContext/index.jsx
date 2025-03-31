import React, { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebase';
import { supabase } from '../../../supaBaseclient';

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


    const handleAuthStateChange = async (session) => {
      setLoading(true);
      const user = session?.user || null; 
      setCurrentUser(user);
      console.log(user)
      if (user) {
        try {
          await fetchUserData(user); // Fetch user-related data
          setIsLoggedIn(true);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setIsLoggedIn(false);
      }

      setLoading(false);
    };

    useEffect(() => {
      const { data: authListener } = supabase.auth.onAuthStateChange(
        (event, session) => {
          handleAuthStateChange(session);
        }
      );
    
      return () => {
        authListener.subscription.unsubscribe(); // Cleanup on unmount
      };
    }, []);

    const fetchUserData = async (user) => {
      try {
        
          const email = user?.email ;
          const response = await fetch(`${import.meta.env.VITE_API_URL}/getuser`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body : JSON.stringify({email})
          });
      
        // Check if response is OK
        if (!response.ok) {
          console.error("API Error:", response.status, response.statusText);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const data = await response.json();
        // console.log("User data fetched:", data.data[0]);
    
        setuser(data.data[0]);
        setRole(data.data[0]?.role || '');
        setOrg(data.data[0]?.org || '');
        setParticipated(data.data[0]?.["participated-events"] || []);
        setOngoingEvents(data.data[0]?.["ongoing-events"] || []); 
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };
    
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/events-get`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log("events fetched")
    
        const data = await response.json();
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
