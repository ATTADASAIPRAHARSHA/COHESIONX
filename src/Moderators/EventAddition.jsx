import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { supabase } from '../../supaBaseclient';

const EventAddition = () => {

  const navigate = useNavigate();
  const { Events, fetchEvents } = useAuth();
  const [imagefiles, setImagefiles] = useState([])
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    start: "",
    end: "",
    desc: "",
    images: [],
    org: "",
    content: "",
    points: [""],
    registe: false,
    registestart: "",
    registeend: "",
    registelink: "",
    venue: "",           // Add this field
    perks: "",           // Add this field
    rules: "",           // Add this field
    organizerContact: "",// Add this field
    eligibleYear: [],
    eligibleBranch: [''],
  });
  useEffect(() => {
    fetchEvents();
    console.log("events are here")
  }, []);

  const handleBranchCheckbox = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        eligibleBranch: [...prev.eligibleBranch, value],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        eligibleBranch: prev.eligibleBranch.filter((branch) => branch !== value),
      }));
    }
  };




  const handleEligibleYearChange = (e, index) => {
    const updatedEligibleYears = [...formData.eligibleYear];
    updatedEligibleYears[index] = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      eligibleYear: updatedEligibleYears,
    }));
  };

  // Add new empty input field for eligibleYear
  const addEligibleYear = () => {
    setFormData((prevState) => ({
      ...prevState,
      eligibleYear: [...prevState.eligibleYear, ""],
    }));
  };

  // Delete a specific eligible year
  const deleteEligibleYear = (index) => {
    const updatedEligibleYears = formData.eligibleYear.filter((_, i) => i !== index);
    setFormData((prevState) => ({
      ...prevState,
      eligibleYear: updatedEligibleYears,
    }));
  };



  useEffect(() => {
    console.log(Events.length)
    if (Events.length > 0) {
      setFormData((prev) => ({ ...prev, id: Events.length + 1 }));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [Events]);

  useEffect(() => {
    console.log("Updated formData ID:", formData.id);
  }, [formData.id]);

  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);


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

  const handleImagesChange = async (e) => {
    const files = e.target.files;
    if (!files.length) return;
    setImagefiles(Array.from(files))


    const validUrls = Array.from(files).map((file) => {
      return URL.createObjectURL(file);
    })
    console.log("Uploaded Images URLs:", validUrls);

    setFormData({ ...formData, images: validUrls });

  };



  const handlePointsChange = (e, index) => {
    const newPoints = [...formData.points];
    newPoints[index] = e.target.value;
    setFormData({ ...formData, points: newPoints });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(Events.length);
    console.log("Event submitted");

    const uploadPromises = imagefiles.map(async (file, index) => {
      if (!(file instanceof File)) {
        console.error("Invalid file:", file);
        return null;
      }

      const filePath = `uploads/${formData.id}-${index}.png`;

      // Upload file to Supabase
      const { data, error } = await supabase.storage
        .from("images")
        .upload(filePath, file);

      if (error) {
        console.error("Upload Error:", error.message);
        return null;
      }

      // ✅ Fix: Correctly get the public URL
      const { data: publicUrlData } = supabase.storage.from("images").getPublicUrl(filePath);

      if (!publicUrlData || !publicUrlData.publicUrl) {
        console.error("Failed to get public URL for:", filePath);
        return null;
      }

      console.log("Uploaded Image URL:", publicUrlData.publicUrl);
      return publicUrlData.publicUrl;

      localStorage.setItem("formData", "");
    });

    // Wait for all uploads to complete
    const uploadedUrls = (await Promise.all(uploadPromises)).filter(url => url !== null);

    console.log(uploadedUrls);

    const formattedData = {
      ...formData,
      id: Events.length + 1,
      images: uploadedUrls,
      start: formatTimestamp(formData.start),
      end: formatTimestamp(formData.end),
      registestart: formatTimestamp(formData.registestart),
      registeend: formatTimestamp(formData.registeend),
      venue: formData.venue,                // Include this
      perks: formData.perks,                // Include this
      rules: formData.rules,                // Include this
      organizerContact: formData.organizerContact, // Include this
      eligibleYear: formData.eligibleYear.map(year => parseInt(year)),
      eligibleBranch: formData.eligibleBranch,
    };

    console.log("Formatted Data:", formattedData);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/events-post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log("Server Response:", await response.json());
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };



  const handleDeleteImage = async (imageUrl) => {
    try {
      // Extract the file path from the URL
      console.log(imageUrl)
      console.log(formData.images)
      const imageurls = formData.images.filter((url) => url != imageUrl)
      console.log(imageurls)

      setFormData((prev) => ({
        ...prev,
        images: prev.images.filter((img) => img !== imageUrl),
      }));

      // if (!filePath) {
      //   console.error("Invalid file path");
      //   return;
      // }

      // Delete the image from Supabase Storage
      // const { error } = await supabase.storage.from("images").remove([filePath]);

      // if (error) {
      //   console.error("Storage Deletion Error:", error.message);
      //   return;
      // }

      // console.log("Image deleted successfully from storage");

      // // Remove the image from formData state
      // 
    } catch (err) {
      console.error("Error deleting image:", err);
    }
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
      <div className='my-24 text-3xl '><span className='bg-yellow-500 rounded-xl w-auto p-2 text-black '><span className='underline'>Create</span>.<span className='underline'> Share.</span> <span className='underline'>Celebrate</span> – <span className='underline'>Submit Your Event!</span></span></div>
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
                <input
                  // key={index}
                  type="file"
                  multiple
                  // name={`images-${index}`}
                  // value={image}
                  onChange={(e) => handleImagesChange(e)}
                  className="border p-2 w-full mb-2 bg-transparent border-b text-xl"
                // placeholder={`Image URL ${index + 1}`}
                />

              </div>
              <div className='flex gap-4'>
                {
                  formData.images && formData.images.map((e, index) => (
                    <div key={index} className='relative'>
                      <img src={e} className='w-60 h-60' alt={`Uploaded ${index}`} />
                      <button className='absolute top-0 right-0' onClick={() => handleDeleteImage(e)}>x</button>
                    </div>
                  ))
                }
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
          <div className="grid items-center mx-10 p-2 gap-20">
            <div className='flex flex-col text-left gap-2'>
              <div className="relative text-left">
                <input
                  className="outline-none bg-transparent border-b border-white focus:border-white transition-all duration-300 text-white 
        [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:brightness-200"
                  id="venue"
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  type="text"
                />
              </div>
              <div className='text-lg'>Enter Venue:</div>
            </div>
          </div>

          <div className="grid items-center mx-10 p-2 gap-20 ">
            <div className='flex flex-col text-left gap-2'>
              <div className="relative text-left">
                <textarea
                  className="outline-none bg-transparent border-b border-white focus:border-white transition-all duration-300 w-full border border-white rounded-lg p-6 text-white"
                  id="perks"
                  name="perks"
                  value={formData.perks}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Enter Perks and Benefits"
                />
              </div>
              <div className='text-lg'>Enter Perks and Benefits:</div>
            </div>
          </div>

          <div className="grid items-center mx-10 p-2 gap-20">
            <div className='flex flex-col text-left gap-2'>
              <div className="relative text-left">
                <textarea
                  className="outline-none bg-transparent border-b border-white focus:border-white transition-all duration-300 text-white w-full border border-white rounded-lg p-6"
                  id="rules"
                  name="rules"
                  value={formData.rules}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Enter Rules and Regulations"
                />
              </div>
              <div className='text-lg'>Enter Rules and Regulations:</div>
            </div>
          </div>

          <div className="grid items-center mx-10 p-2 gap-20">
            <div className='flex flex-col text-left gap-2'>
              <div className="relative text-left">
                <input
                  className="outline-none bg-transparent border-b border-white focus:border-white transition-all duration-300 text-white w-full"
                  id="organizer-contact"
                  name="organizerContact"
                  value={formData.organizerContact}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter Organizer Contact Details"
                />
              </div>
              <div className='text-lg'>Enter Organizer Contact Details:</div>
            </div>
          </div>

          <div className="grid items-center mx-10 my-8 p-2 gap-20">
            <div className="flex flex-col text-left gap-2">
              <div className="text-lg">Eligible Years: Add the years that are eligible for this event</div>

              {/* Check if eligibleYear has any years */}
              {formData.eligibleYear.length > 0 ? (
                formData.eligibleYear.map((year, index) => (
                  <div key={index} className="flex p-2 items-center gap-2 ">
                    <input
                      type="number"
                      name={`eligibleYear-${index}`}
                      value={year}
                      onChange={(e) => handleEligibleYearChange(e, index)}
                      className="border p-2 bg-transparent border-b text-xl"
                      placeholder={`Year ${index + 1}`}
                    />
                    <button
                      onClick={() => deleteEligibleYear(index)}
                      className="text-red-600 "
                    >
                      x
                    </button>
                  </div>
                ))
              ) : (
                <div className='text-xl text-red-600'>No eligible years added yet. Click "Add Year" to start.</div> // You can show a message when it's empty
              )}

              <button onClick={addEligibleYear} className="text-blue-500 text-3xl underline">
                Add Year
              </button>
            </div>
          </div>
          <div className="grid items-center mx-10 p-2 gap-20">
            <div className="flex flex-col text-left gap-2">
              <div className="text-lg">Select Eligible Branches of Students:</div>

              <div className="grid grid-cols-2 gap-2 text-white">
                {["CSE", "ECE", "EEE", "IT", "MECH", "CIVIL", "AIML", "DS"].map((branch) => (
                  <label key={branch} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={branch}
                      checked={formData.eligibleBranch.includes(branch)}
                      onChange={(e) => handleBranchCheckbox(e)}
                      className="accent-blue-500"
                    />
                    {branch}
                  </label>
                ))}
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
