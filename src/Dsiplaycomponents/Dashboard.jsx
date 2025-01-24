import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/authContext'
import Dashevent from './Dashevent'


const Dashboard = () => {
  const {Events , Participated , OngoingEvents} = useAuth()
  const [ParticipatedEvents, setParticipatedEvents] = useState([])
  const [Ongoing, setOngoing] = useState([])

  useEffect(() => {
    
    const matchedEvents = Events.filter(event =>
      Participated.includes(String(event.id)) 
    );
    setParticipatedEvents(matchedEvents);

    const matchevents = Events.filter(event =>{
      console.log(typeof OngoingEvents[0] , typeof event.id)
      return OngoingEvents.includes(event.id) 
    }
    );
    setOngoing(matchevents);
  }, [])
  
  return (
    <>
        <div className="bglightblue w-ful h-full rounded-lg p-4">
            <div className="header underline">YOUR DASHBOARD</div>
            <div className="eventsparticipated text-left flex flex-col mt-10 ">
              <span className="header headerblue m-0 px-4 py-3 rounded-t-xl w-64 text-xl h-auto">Previously participated</span>
              <div className="events headerblue rounded-tr-xl rounded-b-xl flex flex-wrap gap-4 p-10">
              {ParticipatedEvents.length > 0 ? (
                  ParticipatedEvents.map(event => (
                    <div key={event.id}>
                      <Dashevent events={event}/>
                    </div>
                  ))
                ) : (
                  <p>No participated events</p>   
                )}
              </div>
            </div>
            <div className="eventsparticipated text-left flex flex-col mt-10 ">
              <span className="header headerblue m-0 px-4 py-3 rounded-t-xl w-64 text-xl h-auto">Ongoing Events</span>
              <div className="events headerblue rounded-tr-xl rounded-b-xl flex flex-wrap gap-4 p-10">
              {Ongoing.length > 0 ? (
                  Ongoing.map(event => (
                    <div key={event.id}>
                      <Dashevent events={event}/>
                    </div>
                  ))
                ) : (
                  <p>No Ongoing events</p>   
                )}
              </div>
            </div>



              
        </div>  
    </>
  )
}

export default Dashboard
