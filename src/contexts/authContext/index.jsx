import React, { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebase';
import events from '../../Events.json'

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
        const response = await fetch('http://localhost:3000/api-auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });
    
        const data = await response.json();
    
        setuser(data.user);
        setRole(data.user.role || null);
        setOrg(data.user.org || null);
        setParticipated(data.user["participated-events"] || []);
        setOngoingEvents(data.user["ongoing-events"] || []);
        console.log("User data fetched:", data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3000/Events', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        const data = await response.json();
        // setEvents(data);
        setEvents(events);
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
