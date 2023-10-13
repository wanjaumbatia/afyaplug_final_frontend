import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";
import HashLoader from "react-spinners/HashLoader";
import { BASE_URL, token } from "../../config";
import { formatDate } from "../../utils/formatDate";

const Profile = ({ user }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [addQEnabled, setAddQEnabled] = useState(false);
  const [addEEnabled, setAddEEnabled] = useState(false);
  const [addTEnabled, setAddTEnabled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setFormData({
      name: user.name,
      email: user.email,
      photo: user.photo,
      category: user.category,
      service: user.service,
      gender: user.gender,
      bloodType: user.bloodType,
      location: user.location,
      bio: user.bio,
      about: user.about,
      price: user.price,
      qualifications: user.qualifications,
      experiences: user.experiences,
      timeSlots: user.timeSlots,
    });
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    service: "",
    bloodType: "",
    location: "",
    price: 0,
    photo: null,
    gender: "",
    role: "patient",
    bio: "",
    about: "",
    qualifications: [],
    experiences: [],
    timeSlots: [],
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleQInputChange = (e) => {
    setQualification({ ...qualification, [e.target.name]: e.target.value });
  };
  const handleEInputChange = (e) => {
    setExperience({ ...experience, [e.target.name]: e.target.value });
  };

  const handleTInputChange = (e) => {
    setTimeSlot({ ...timeslot, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    const data = await uploadImageToCloudinary(file);
    setSelectedFile(data.url);
    setFormData({ ...formData, photo: data.url });
  };

  const submitHandler = async (e) => {
    //e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/doctors/${user._id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token} `,
        },
        body: JSON.stringify(formData),
      });

      const { message } = await res.json();
      if (!res.ok) {
        throw new Error(message);
      }

      setLoading(false);
      toast.success(message);
      navigate("/nurse/profile/me");
    } catch (e) {
      toast.success(e.message);
      setLoading(false);
    }
  };

  const [qualification, setQualification] = useState({
    name: "",
    institution: "",
    startingDate: "",
    endingDate: "",
  });

  const saveQualification = () => {
    formData.qualifications.push(qualification);
    submitHandler();
    setQualification({
      name: "",
      institution: "",
      startingDate: "",
      endingDate: "",
    });
    setAddQEnabled(false);
  };

  const [experience, setExperience] = useState({
    name: "",
    company: "",
    startingDate: "",
    endingDate: "",
  });

  const saveExperience = () => {
    formData.experiences.push(experience);
    submitHandler();
    setExperience({
      name: "",
      company: "",
      startingDate: "",
      endingDate: "",
    });
    setAddEEnabled(false);
  };

  const [timeslot, setTimeSlot] = useState({
    day: "",
    startingTime: "",
    endingTime: "",
  });

  const saveTimeslot = () => {
    formData.timeSlots.push(timeslot);
    submitHandler();
    setTimeSlot({
      day: "",
      startingTime: "",
      endingTime: "",
    });
    setAddTEnabled(false);
  };

  return (
    <div className="">
      <h3 className="text-headingColor text-[22px] font-semibold mb-[15px] flex justify-between">
        Profile Setting{" "}
        <span
          className={`${
            user.isApproved == "pending" ? "bg-yellow-200" : "bg-green-200"
          }  text-[14px] py-1 px-3 rounded-md`}
        >
          {user.isApproved}
        </span>
      </h3>
      <form onSubmit={submitHandler}>
        <div className="mb-5">
          <label className="text-headingColor font-semibold text-[16px] leading-7">
            Name
          </label>
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-solid border-[#0066ff34] focus:outline-none
            focus:border-primaryColor text-[16px] leading-7 text-headingColor
             placeholder:text-textColor cursor-pointer"
            required
          />
        </div>

        <div className="mb-5">
          <label className="text-headingColor font-semibold text-[16px] leading-7">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-solid border-[#0066ff34] focus:outline-none
            focus:border-primaryColor text-[16px] leading-7 text-headingColor
             placeholder:text-textColor cursor-pointer"
            aria-readonly
            readOnly
          />
        </div>

        <div className="mb-5 flex flex-col">
          <label className="text-headingColor font-semibold text-[16px] leading-7">
            Gender
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-solid border-[#0066ff34] focus:outline-none
            focus:border-primaryColor text-[16px] leading-7 text-headingColor
             placeholder:text-textColor cursor-pointer"
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="mb-5 flex flex-col">
            <label className="text-headingColor font-semibold text-[16px] leading-7">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-solid border-[#0066ff34] focus:outline-none
            focus:border-primaryColor text-[16px] leading-7 text-headingColor
             placeholder:text-textColor cursor-pointer"
            >
              <option value="">Select</option>
              <option value="Home Care">Home Care</option>
            </select>
          </div>
          <div className="mb-5 flex flex-col">
            <label className="text-headingColor font-semibold text-[16px] leading-7">
              Service
            </label>
            <select
              name="service"
              value={formData.service}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-solid border-[#0066ff34] focus:outline-none
            focus:border-primaryColor text-[16px] leading-7 text-headingColor
             placeholder:text-textColor cursor-pointer"
            >
              <option value="">Select</option>
              <option value="Elderly Care">Elderly Care</option>
            </select>
          </div>
        </div>

        <div className="mb-5">
          <label className="text-headingColor font-semibold text-[16px] leading-7">
            Location / Short Address
          </label>
          <textarea
            type="text"
            rows="2"
            placeholder="Where are you at?"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-solid border-[#0066ff34] focus:outline-none
            focus:border-primaryColor text-[16px] leading-7 text-headingColor
             placeholder:text-textColor cursor-pointer"
          ></textarea>
        </div>

        <div className="mb-5 gap-3 flex items-center">
          {formData.photo && (
            <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
              <img
                src={formData.photo}
                alt=""
                className="rounded-full w-[55px] h-[55px]"
              />
            </figure>
          )}
          <div className="relative w-[130px] h-[50px]">
            <input
              type="file"
              name="photo"
              onChange={handleFileInputChange}
              id="customFile"
              accept=".jpg, .png"
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
            <label
              htmlFor="customFile"
              className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
            >
              {selectedFile ? selectedFile.name : "Upload Photo"}
            </label>
          </div>
        </div>

        <div className="mb-5">
          <label className="text-headingColor font-semibold text-[16px] leading-7">
            Bio
          </label>
          <textarea
            type="text"
            rows="2"
            placeholder="Bio"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-solid border-[#0066ff34] focus:outline-none
            focus:border-primaryColor text-[16px] leading-7 text-headingColor
             placeholder:text-textColor cursor-pointer"
          ></textarea>
        </div>

        <div className="mb-5">
          <label className="text-headingColor font-semibold text-[16px] leading-7">
            About
          </label>
          <textarea
            type="text"
            rows="5"
            placeholder="Write about yourself..."
            name="about"
            value={formData.about}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-solid border-[#0066ff34] focus:outline-none
            focus:border-primaryColor text-[16px] leading-7 text-headingColor
             placeholder:text-textColor cursor-pointer"
          ></textarea>
        </div>

        <div className="mb-5">
          <label className="text-headingColor font-semibold text-[16px] leading-7">
            Service Fee
          </label>
          <input
            type="number"
            placeholder="Enter Price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-solid border-[#0066ff34] focus:outline-none
            focus:border-primaryColor text-[16px] leading-7 text-headingColor
             placeholder:text-textColor cursor-pointer"
          />
        </div>

        {/* Qualifications */}
        <div className="mb-5 border-dashed border p-5">
          <div className="flex justify-between py-2">
            <h2 className="text-headingColor font-semibold text-[18px] leading-7">
              Education
            </h2>
            <button
              onClick={() => setAddQEnabled(true)}
              type="button"
              className={`${
                addQEnabled && "hidden"
              } bg-black text-white px-2 py-1`}
            >
              Add Qualifications
            </button>
          </div>
          {addQEnabled && (
            <div className="mt-4">
              <div className="grid md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={qualification.name}
                  onChange={handleQInputChange}
                  className="w-full px-4 py-3 border border-solid border-[#0066ff34] focus:outline-none
            focus:border-primaryColor text-[16px] leading-7 text-headingColor
             placeholder:text-textColor cursor-pointer"
                />
                <input
                  type="text"
                  placeholder="Institution"
                  name="institution"
                  value={qualification.institution}
                  onChange={handleQInputChange}
                  className="w-full px-4 py-3 border border-solid border-[#0066ff34] focus:outline-none
            focus:border-primaryColor text-[16px] leading-7 text-headingColor
             placeholder:text-textColor cursor-pointer"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-3 mt-3">
                <input
                  type="date"
                  placeholder="Starting Date"
                  name="startingDate"
                  value={qualification.startingDate}
                  onChange={handleQInputChange}
                  className="w-full px-4 py-3 border border-solid border-[#0066ff34] focus:outline-none
            focus:border-primaryColor text-[16px] leading-7 text-headingColor
             placeholder:text-textColor cursor-pointer"
                />
                <input
                  type="date"
                  placeholder="Ending Date"
                  name="endingDate"
                  value={qualification.endingDate}
                  onChange={handleQInputChange}
                  className="w-full px-4 py-3 border border-solid border-[#0066ff34] focus:outline-none
            focus:border-primaryColor text-[16px] leading-7 text-headingColor
             placeholder:text-textColor cursor-pointer"
                />
              </div>
              <div className="flex justify-end mt-2 gap-3">
                <button
                  onClick={() => setAddQEnabled(false)}
                  type="button"
                  className="bg-red-600 text-white px-5 py-3 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => saveQualification()}
                  className="bg-black text-white px-5 py-3 font-semibold"
                >
                  Save
                </button>
              </div>
            </div>
          )}
          <div className="mt-3 ">
            <ul className="pt-4 md:p-5">
              {formData.qualifications != null ? (
                formData.qualifications.map((item, index) => (
                  <li
                    key={index}
                    className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]"
                  >
                    <div>
                      <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">
                        {formatDate(item.startingDate)} -{" "}
                        {formatDate(item.endingDate)}
                      </span>
                      <p className="text-[16px] leading-6 font-medium text-textColor">
                        {item.name}
                      </p>
                    </div>
                    <p className="text-[14px] leading-5 font-medium text-textColor">
                      {item.institution}
                    </p>
                  </li>
                ))
              ) : (
                <li>No Qualifications uploaded.</li>
              )}
            </ul>
          </div>
        </div>

        {/* Experiences */}
        <div className="mb-5 border-dashed border p-5">
          <div className="flex justify-between py-2">
            <h2 className="text-headingColor font-semibold text-[18px] leading-7">
              Experiences
            </h2>
            <button
              onClick={() => setAddEEnabled(true)}
              type="button"
              className={`${
                addQEnabled && "hidden"
              } bg-black text-white px-2 py-1`}
            >
              Add New
            </button>
          </div>
          {addEEnabled && (
            <div className="mt-4">
              <div className="grid md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={experience.name}
                  onChange={handleEInputChange}
                  className="w-full px-4 py-3 border border-solid border-[#0066ff34] focus:outline-none
            focus:border-primaryColor text-[16px] leading-7 text-headingColor
             placeholder:text-textColor cursor-pointer"
                />
                <input
                  type="text"
                  placeholder="Institution"
                  name="company"
                  value={experience.company}
                  onChange={handleEInputChange}
                  className="w-full px-4 py-3 border border-solid border-[#0066ff34] focus:outline-none
            focus:border-primaryColor text-[16px] leading-7 text-headingColor
             placeholder:text-textColor cursor-pointer"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-3 mt-3">
                <input
                  type="date"
                  placeholder="Starting Date"
                  name="startingDate"
                  value={experience.startingDate}
                  onChange={handleEInputChange}
                  className="w-full px-4 py-3 border border-solid border-[#0066ff34] focus:outline-none
            focus:border-primaryColor text-[16px] leading-7 text-headingColor
             placeholder:text-textColor cursor-pointer"
                />
                <input
                  type="date"
                  placeholder="Ending Date"
                  name="endingDate"
                  value={experience.endingDate}
                  onChange={handleEInputChange}
                  className="w-full px-4 py-3 border border-solid border-[#0066ff34] focus:outline-none
            focus:border-primaryColor text-[16px] leading-7 text-headingColor
             placeholder:text-textColor cursor-pointer"
                />
              </div>
              <div className="flex justify-end mt-2 gap-3">
                <button
                  onClick={() => setAddEEnabled(false)}
                  type="button"
                  className="bg-red-600 text-white px-5 py-3 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => saveExperience()}
                  className="bg-black text-white px-5 py-3 font-semibold"
                >
                  Save
                </button>
              </div>
            </div>
          )}
          <div className="mt-3 ">
            <ul className="pt-4 md:p-5">
              {formData.experiences != null ? (
                formData.experiences.map((item, index) => (
                  <li className="p-4 rounded bg-[#fff9ea] mt-1">
                    <span className="text-yellowColor text-[15px] leading-6 font-semibold">
                      {formatDate(item.startingDate)} -{" "}
                      {formatDate(item.endingDate)}
                    </span>
                    <p className="text-[16px] leading-6 font-medium text-textColor">
                      {item.name}
                    </p>
                    <p className="text-[14px] leading-5 font-medium text-textColor">
                      {item.company}
                    </p>
                  </li>
                ))
              ) : (
                <li>No Experience uploaded.</li>
              )}
            </ul>
          </div>
        </div>

        {/* Time Slots */}
        <div className="mb-5 border-dashed border p-5">
          <div className="flex justify-between py-2">
            <h2 className="text-headingColor font-semibold text-[18px] leading-7">
              Time Slots
            </h2>
            <button
              onClick={() => setAddTEnabled(true)}
              type="button"
              className={`${
                addTEnabled && "hidden"
              } bg-black text-white px-2 py-1`}
            >
              Add Time Slot
            </button>
          </div>
          {addTEnabled && (
            <div className="mt-4">
              <div className="grid md:grid-cols-3 gap-3">
                <div>
                  <label className="text-headingColor font-semibold text-[16px] leading-7">
                    Day
                  </label>
                  <select
                    name="day"
                    value={timeslot.day}
                    onChange={handleTInputChange}
                    className="w-full px-4 py-4 border border-solid border-[#0066ff34] focus:outline-none
            focus:border-primaryColor text-[16px] leading-7 text-headingColor
             placeholder:text-textColor cursor-pointer"
                  >
                    <option></option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Satuday">Satuday</option>
                    <option value="Sunday">Sunday</option>
                  </select>
                </div>
                <div className="">
                  <label className="text-headingColor font-semibold text-[16px] leading-7">
                    From
                  </label>
                  <input
                    type="time"
                    placeholder="Starting Time"
                    name="startingTIme"
                    value={timeslot.startingTime}
                    onChange={handleTInputChange}
                    className="w-full px-4 py-3 border border-solid border-[#0066ff34] focus:outline-none
            focus:border-primaryColor text-[16px] leading-7 text-headingColor
             placeholder:text-textColor cursor-pointer"
                  />
                </div>
                <div className="">
                  <label className="text-headingColor font-semibold text-[16px] leading-7">
                    To
                  </label>
                  <input
                    type="time"
                    placeholder="Ending Time"
                    name="endingTime"
                    value={timeslot.startingTime}
                    onChange={handleTInputChange}
                    className="w-full px-4 py-3 border border-solid border-[#0066ff34] focus:outline-none
            focus:border-primaryColor text-[16px] leading-7 text-headingColor
             placeholder:text-textColor cursor-pointer"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-2 gap-3">
                <button
                  onClick={() => setAddTEnabled(false)}
                  type="button"
                  className="bg-red-600 text-white px-5 py-3 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => saveTimeslot()}
                  className="bg-black text-white px-5 py-3 font-semibold"
                >
                  Save
                </button>
              </div>
            </div>
          )}
          <div className="mt-3 ">
            <ul className="pt-4 md:p-5">
              {formData.timeSlots != null ? (
                formData.timeSlots.map((item, index) => (
                  <li className="mt-1">
                    <div className="w-full flex justify-between">
                      <p className="text-[16px] leading-6 font-medium text-textColor">
                        {item.day}
                      </p>
                      <p className="text-[14px] leading-5 font-medium text-textColor">
                        {item.startingTime} - {item.endingTime}
                      </p>
                    </div>
                  </li>
                ))
              ) : (
                <li>No Experience uploaded.</li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-7">
          <button
            disabled={loading && true}
            type="submit"
            className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded px-4 py-3"
          >
            {loading ? <HashLoader size={25} color="#ffffff" /> : `Update`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
