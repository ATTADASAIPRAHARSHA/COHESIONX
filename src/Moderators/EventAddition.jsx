import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

const EventAddition = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const navigate = useNavigate();
  const { Events, fetchEvents } = useAuth();
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    start: "",
    end: "",
    desc: "",
    images: ["", ""],
    org: "",
    content: "",
    points: [""],
    registe: false,
    registestart: "",
    registeend: "",
    registelink: "",
  });

  const formatTimestamp = (datetime) => {
    if (!datetime) return null;
    const date = new Date(datetime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };


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
    formData.id = Events.length + 1;
    console.log(Events.length)
    console.log("event submitted ")

    const formattedData = {
      ...formData,
      start: formatTimestamp(formData.start),
      end: formatTimestamp(formData.end),
      registestart: formatTimestamp(formData.registestart),
      registeend: formatTimestamp(formData.registeend),
    };
    console.log(formattedData)
    const response = await fetch(`${import.meta.env.VITE_API_URL}/events-post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedData),
    });

  };


  const handlecreatebutton = () => {
    document.getElementById('eventform').scrollIntoView({ behavior: 'smooth' });
  }

  const cancelevent = () => {
    navigate('/manage');
  }

  const addPoint = () => {
    setFormData({ ...formData, points: [...formData.points, ""] });
  };
  return (
    <div className='pt-40 text-white text-3xl'>
      <div className='grid grid-cols-[3fr_2fr] gap-4 px-10 place-items-center backdrop-blur-'>

        <div className="flex flex-col justify-start items-start">
          <div className='text-5xl my-2'>Add New Event</div>
          <div className='text-xl mb-4'>Easily submit all the details for your upcoming campus event in just a few clicks.</div>
          <div className='text-xl flex gap-4'>
            <button className='border p-2 border-white' onClick={() => handlecreatebutton()}>Create</button>
            <button className="text-red-800 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-white" onClick={() => cancelevent()}>Cancel</button>
          </div>
        </div>

        <div className=''>
          <img src="./events.png" className='w-full h-full rounded-xl' alt="" />
        </div>

      </div>
      <div className='my-24 text-3xl '>Create. Share. Celebrate – Submit Your Event!</div>
      <div className='flex flex-col my-10 gap-10' id='eventform'>
        <div>Event form</div>
        <div className="form flex flex-col gap-y-10 mx-20">
          <div className="grid items-center mx-10 p-2 gap-20">
            <div className='flex flex-col text-left gap-2'>
              <div className=" relative text-left ">
                <input className="w-full outline-none bg-transparent border-b border-white focus:border-white transition-all duration-300 " placeholder='Event Title' id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange} type="text" />
              </div>
              <div className='text-lg'>Make Your Event Stand Out: Add a Catchy Event Title!</div>
            </div>

          </div>
          <div className="grid  items-center mx-10 p-2 gap-20">
            <div className='flex flex-col text-left gap-2'>
              <div className="text-center relative">
                <textarea className=" w-full h-auto min-h-[200px] outline-none rounded-xl bg-transparent border border-white focus:border-white transition-all duration-300 p-4"
                  id="desc"
                  name="desc"
                  value={formData.desc}
                  onChange={handleChange} placeholder='Description' type="text" />
              </div>
              <div className='text-lg'>Engage Your Audience: Craft a Captivating Event Description!</div>
            </div>

          </div>
          <div className="grid items-center mx-10 p-2 gap-20">
            <div className='flex flex-col text-left gap-2'>
              <div className="text-left ">
                <input className="outline-none bg-transparent border-b border-white focus:border-white transition-all duration-300 text-white 
                 [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:brightness-200"
                  id="start"
                  name="start"
                  value={formData.start}
                  onChange={handleChange} type="datetime-local" />

              </div>
              <div className='text-lg'>Set the Stage: Choose the Perfect Start Date & Time!</div>
            </div>

          </div>
          <div className="grid items-center mx-10 p-2 gap-20">
            <div className='flex flex-col text-left gap-2'>
              <div className="text-left ">
                <input className=" outline-none bg-transparent border-b border-white focus:border-white transition-all duration-300 text-white 
                 [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:brightness-200"
                  id="end"
                  name="end"
                  value={formData.end}
                  onChange={handleChange} type="datetime-local" />

              </div>
              <div className='text-lg'>Wrap It Up: Select the Ideal End Date & Time!</div>
            </div>

          </div>
          <div className="grid items-center mx-10 p-2 gap-20">
            <div className='flex flex-col text-left gap-2'>
              <div className=" relative text-left ">
                <input className="w-full outline-none bg-transparent border-b border-white focus:border-white transition-all duration-300 " placeholder='Organiser'
                  id="org"
                  name="org"
                  value={formData.org}
                  onChange={handleChange} type="text" />
              </div>
              <div className='text-lg'>Lead the Way: Enter the Organizing Department or Club!</div>
            </div>

          </div>
          <div className="grid items-center mx-10 p-2 gap-20">
            <div className='flex flex-col text-left gap-2'>
              <div className='text-lg'>Capture the Moment: Add Engaging Event Images!</div>
              <div className=" relative text-left ">
                {formData.images.map((image, index) => (
                  <input
                    key={index}
                    type="text"
                    name={`images-${index}`}
                    value={image}
                    onChange={(e) => handleImagesChange(e, index)}
                    className="border p-2 w-full mb-2 bg-transparent border-b text-xl"
                    placeholder={`Image URL ${index + 1}`}
                  />
                ))}
                <button onClick={() => addPoint()}><img src="./gallery.png" className='w-[50px] h-[50px]' alt="" /> </button>
              </div>

            </div>

          </div>
          <div className="grid items-center mx-10 p-2 gap-20">
            <div className='flex flex-col text-left gap-2'>
              <div className='text-lg'>Highlight Key Details: Add Informative Event Points!</div>
              <div className=" relative text-left ">
                {formData.points.map((point, index) => (
                  <input
                    key={index}
                    type="text"
                    name={`points-${index}`}
                    value={point}
                    onChange={(e) => handlePointsChange(e, index)}
                    className="border p-2 w-full mb-2 bg-transparent border-b text-xl"
                    placeholder={`Point ${index + 1}`}
                  />
                ))}
                <button onClick={() => addPoint()}><img src="./addpoint.png" className='w-[50px] h-[50px]' alt="" /> </button>
              </div>

            </div>

          </div>
          <div className="grid  items-center mx-10 p-2 gap-20">
            <div className='flex flex-col text-left gap-2'>
              <div className="text-center relative">
                <textarea className=" w-full h-auto min-h-[200px] outline-none rounded-xl bg-transparent border border-white focus:border-white transition-all duration-300 p-4"
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange} placeholder='Extra Description' type="text" />
              </div>
              <div className='text-lg'>Add More Details: Include Any Extra Information!</div>
            </div>

          </div>
          <div className="m-4 flex flex-col justify-center gap-4">
            <label htmlFor="registe" className="block text-3xl">
              Registration Status:
            </label>
            <div className='flex gap-2 justify-center'>
              <input
                type="checkbox"
                id="registe"
                name="registe"
                checked={formData.registe}
                onChange={(e) => setFormData({ ...formData, registe: e.target.checked })}
              />
              <span className='text-3xl'>Open for Registration</span>
            </div>
          </div>
          {formData.registe && <>
            <div className="grid items-center mx-10 p-2 gap-20">
              <div className='flex flex-col text-left gap-2'>
                <div className="text-left ">
                  <input className="outline-none bg-transparent border-b border-white focus:border-white transition-all duration-300 text-white 
                            [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:brightness-200"
                    type="datetime-local" />

                </div>
                <div className='text-lg'>Kickstart the Excitement: Set the Registration Opening Date & Time!</div>
              </div>

            </div>
            <div className="grid items-center mx-10 p-2 gap-20">
              <div className='flex flex-col text-left gap-2'>
                <div className="text-left ">
                  <input className="outline-none bg-transparent border-b border-white focus:border-white transition-all duration-300 text-white 
                            [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:brightness-200"
                    type="datetime-local" />

                </div>
                <div className='text-lg'>Secure the Deadline: Choose the Registration Closing Date & Time!</div>
              </div>

            </div>


            <div className="grid items-center mx-10 p-2 gap-20">
              <div className='flex flex-col text-left gap-2'>
                <div className="text-left ">
                  <input
                    className="w-full outline-none bg-transparent border-b border-white focus:border-white transition-all duration-300"
                    placeholder='Registration Link'
                    type="text"
                    name="registelink"
                    value={formData.registelink}
                    onChange={handleChange}
                  />
                </div>
                <div className='text-lg'>Guide Participants: Provide the Registration Link!</div>
              </div>
            </div>

          </>
          }
          <button type="submit" onClick={handleSubmit} className="underline w-auto rounded-xl text-white p-2 mt-4">
            Add Event
          </button>
        </div>
      </div>

    </div>
  )
}

export default EventAddition
