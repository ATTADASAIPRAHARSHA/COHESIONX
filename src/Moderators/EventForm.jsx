import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const EventForm = ({ ShowForm, setShowForm }) => {
    const {Events , fetchEvents} = useAuth();
    const [formData, setFormData] = useState({
        id:"",
        title: "",
        start: "",
        end: "",
        desc: "",
        images: ["", ""], 
        org: "",
        content: "",
        points: ["", "", "", "", "", "", ""], 
        registe: false,
        registestart:"", 
        registeend:"", 
        registelink:"", 
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleImagesChange = (e, index) => {
        const newImages = [...formData.images];
        newImages[index] = e.target.value;
        setFormData({ ...formData, images: newImages });
    };

    const handlePointsChange = (e, index) => {
        const newPoints = [...formData.points];
        newPoints[index] = e.target.value;
        setFormData({ ...formData, points: newPoints });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        fetchEvents();
        console.log("event submitted ")
        formData.id = Events.length+1;
        // console.log(Events.length())
        const response = await fetch('http://localhost:3000/Events', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
        
    };

    return (
        <form onSubmit={handleSubmit} className={`space-y-4 headerblue right-10 left-10 absolute top-40 p-8 ${ShowForm ? 'block' : 'hidden'}`}>
            <div className="relative ">
                <div className="header m-4 text-xl font-bold">
                    EVENT FORM
                </div>
                <div className="info text-justify p-8">
                    The Event Registration Form for moderators on your website allows authorized users to submit or update event details. Moderators can input information like the event title, description, date, time, location, and upload relevant images. This form helps manage events efficiently by collecting essential data for display to users while ensuring accurate and up-to-date event information.
                </div>

                <div className="m-4">
                    <label htmlFor="title" className="block ">
                        Event Title:
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />
                </div>

                <div className="m-4">
                    <label htmlFor="start" className="block ">
                        Start Date & Time:
                    </label>
                    <input
                        type="datetime-local"
                        id="start"
                        name="start"
                        value={formData.start}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />
                </div>

                <div className="m-4">
                    <label htmlFor="end" className="block ">
                        End Date & Time:
                    </label>
                    <input
                        type="datetime-local"
                        id="end"
                        name="end"
                        value={formData.end}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />
                </div>

                <div className="m-4">
                    <label htmlFor="desc" className="block ">
                        Event Description:
                    </label>
                    <textarea
                        id="desc"
                        name="desc"
                        value={formData.desc}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    ></textarea>
                </div>

                <div className="m-4">
                    <label htmlFor="images" className="block ">
                        Event Images (URLs):
                    </label>
                    {formData.images.map((image, index) => (
                        <input
                            key={index}
                            type="text"
                            name={`images-${index}`}
                            value={image}
                            onChange={(e) => handleImagesChange(e, index)}
                            className="border p-2 w-full mb-2"
                            placeholder={`Image URL ${index + 1}`}
                        />
                    ))}
                </div>

                <div className="m-4">
                    <label htmlFor="org" className="block ">
                        Organizer:
                    </label>
                    <input
                        type="text"
                        id="org"
                        name="org"
                        value={formData.org}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />
                </div>

                <div className="m-4">
                    <label htmlFor="content" className="block ">
                        Content:
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        className="border p-2 w-full"
                    ></textarea>
                </div>

                <div className="m-4">
                    <label htmlFor="points" className="block ">
                        Event Points:
                    </label>
                    {formData.points.map((point, index) => (
                        <input
                            key={index}
                            type="text"
                            name={`points-${index}`}
                            value={point}
                            onChange={(e) => handlePointsChange(e, index)}
                            className="border p-2 w-full mb-2"
                            placeholder={`Point ${index + 1}`}
                        />
                    ))}
                </div>

                <div className="m-4">
                    <label htmlFor="registe" className="block ">
                        Registration Status:
                    </label>
                    <input
                        type="checkbox"
                        id="registe"
                        name="registe"
                        checked={formData.registe}
                        onChange={(e) => setFormData({ ...formData, registe: e.target.checked })}
                    />
                    <span>Open for Registration</span>
                </div>
                    { formData.registe && <>
                            <div>
                                <label htmlFor="start" className="block ">
                                Registration Start Date & Time:
                                </label>
                                <input
                                    type="datetime-local"
                                    id="registestart"
                                    name="registestart"
                                    value={formData.registestart}
                                    onChange={handleChange}
                                    className="border p-2 w-full"
                                />
                            </div>
                            <div>
                                <label htmlFor="start" className="block ">
                                Registration End Date & Time:
                                </label>
                                <input
                                    type="datetime-local"
                                    id="registeend"
                                    name="registeend"
                                    value={formData.registeend}
                                    onChange={handleChange}
                                    className="border p-2 w-full"
                                />
                            </div>
                            <div>
                                <label htmlFor="start" className="block ">
                                Registration Link:
                                </label>
                                <input
                                    type="text"
                                    id="registelink"
                                    name="registelink"
                                    value={formData.registelink}
                                    onChange={handleChange}
                                    className="border p-2 w-full"
                                />
                            </div>
                        </>
                    }
                <button type="submit" className="bg-blue-500 rounded-xl text-white p-2 mt-4">
                    Add Event
                </button>

                <div className="close absolute -top-4 right-0 "><button onClick={() => setShowForm(false)}>X</button></div>
            </div>
        </form>
    );
};

export default EventForm;
