import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Signup from './components/Signup'
import Header from './components/Header'
import { AuthProvider } from './contexts/authContext'
import Profile from './components/Profile'
import { useAuth } from './contexts/authContext'
import Conatct from './components/Conatct'
import Event from './components/Event'
import Calendar from './components/Calendar'
import './components/tailwind.css'
import IndiEvent from './components/IndiEvent'
import Manage from './Moderators/Manage'

function App() {
  // const {currentUser } = useAuth()

  // useEffect(() => {
  
  //   return () => {
  //     second
  //   }
  // }, [third])
  
  return (
    <>

    <AuthProvider>

    <BrowserRouter
        future={{
          v7_relativeSplatPath: true,
        }}
    >
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/authentication" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/contact" element={<Conatct />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/event" element={<Event />} />
        <Route path="/Manage" element={<Manage />} />
        <Route path="/:id" element={<IndiEvent />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
    </>
  )
}


const About = () => {
  return <h1>About Page</h1>
}

const NotFound = () => {
  return <h1>404 - Page Not Found</h1>
}

export default App
