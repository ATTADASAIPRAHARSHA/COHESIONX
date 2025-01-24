import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../contexts/authContext'

const IndiEvent = () => {
    const { Events , Org , Role} = useAuth();
    const { id } = useParams();
    console.log('URL Parameter id:', id)
    const [IndiEvent, setIndiEvent] = useState({});

    useEffect(() => {
        console.log('useEffect triggered. Events:', Events, 'id:', id);
        const event = Events.find((e) => e.id === parseInt(id));
        console.log('Found event:', event);
        if (!event) {
            console.warn('No event found with id:', id);
        }
        setIndiEvent(event || {});
    }, [Events, id]);

    console.log(IndiEvent);

    const start = IndiEvent.start ? new Date(IndiEvent.start) : null;
    const end = IndiEvent.end ? new Date(IndiEvent.end) : null;
    
    return (<div className=' mx-40 h-full pt-40 '>
        <div className="bg-blue-200 p-8 px-12 rounded">
            <h1 className='text-3xl my-2'>{IndiEvent.title || 'No title available'}</h1>
            <p className='text-lg'>{IndiEvent.desc || 'No description available'}</p>
            <div className="event-images h-96">
                {/* {IndiEvent.images ? (
                    IndiEvent.images.map((image, index) => {
                        console.log('Rendering image:', image);
                        return (
                            <img 
                                key={index} 
                                src={image} 
                                alt={`Event ${IndiEvent.title} image ${index}`}
                                onError={(e) => {
                                    console.error('Image failed to load:', image);
                                    e.target.src = '/fallback-image.png'; // Add a fallback image
                                }}
                            />
                        );
                    })
                ) : (
                    <p>No images available</p>
                )} */}
            </div>
            <div className='my-10 text-justify'><p>{IndiEvent.content}</p></div>
            <div className="points">
                <ul className='list-disc pl-16'>
                    {
                        IndiEvent.points?.map((e)=>{
                            return <li className='text-left p-2'>{e}</li>
                        })
                    }
                </ul>
            </div>
            <div className='my-10 px-12'>

            <div className="details">Event Details</div>
            <div className="timings text-left">Timings: {start ? start.toLocaleTimeString() : 'N/A'}</div>
            <div className="timings text-left">Start Date: {start ? start.toDateString() : 'N/A'}</div>
            <div className="timings text-left">End Date: {end ? end.toDateString() : 'N/A'}</div>

            <div className="venue"></div>
            </div>

            <div className="register">{IndiEvent.registe === 'true' && <button className='bg-blue-500 p-2 rounded-full px-5 '>Register Now</button>}</div>
        </div>
        </div>
    );
}

export default IndiEvent;
