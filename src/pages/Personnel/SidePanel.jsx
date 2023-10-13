import React, { useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL, token } from "../../config";

function SidePanel({ personnel }) {
  const [appointData, setAppointData] = useState({
    doctorId: personnel._id,
    date: "",
    time: "",
  });
  const [showForm, setShowForm] = useState(false);

  const makePayment = async (e) => {
    e.preventDefault();
    console.log(`${BASE_URL}/appointments/create-appointment`);
    try {
      const res = await fetch(`${BASE_URL}/appointments/create-appointment`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token} `,
        },
        body: JSON.stringify({ ...appointData, doctorId: personnel._id }),
      });

      const { url, message } = await res.json();
      if (!res.ok) {
        throw new Error(message);
      } else {
        window.location.href = url;
      }
    } catch (e) {
      toast.error(e.message);
    }
  };
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
      {!showForm ? (
        <>
          <div className="flex items-center justify-between">
            <p className="text__para mt-0 font-semibold">Service Fee</p>
            <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
              Ksh {personnel != null && personnel.price}
            </span>
          </div>
          <div className="mt-[30px]">
            <p className="text__para mt-0 font-semibold">
              Available Time Slots
            </p>
            <ul className="mt-3">
              {personnel.timeSlots != null ? (
                personnel.timeSlots.map((item, index) => (
                  <li className="flex items-center justify-between mb-2">
                    <p className="text-[15px] leading-6 text-textColor font-semibold">
                      {item.day}
                    </p>
                    <p className="text-[15px] leading-6 text-textColor font-semibold">
                      {item.startingTime} - {item.endingTime}
                    </p>
                  </li>
                ))
              ) : (
                <li>No time slot available</li>
              )}
            </ul>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="btn px-2 w-full rounded-md"
          >
            Book Appointment
          </button>
        </>
      ) : (
        <form className="mt-5" onSubmit={makePayment}>
          <div className="mb-5">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={appointData.dateForm}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-solid border-[#0066ff34] focus:outline-none
            focus:border-primaryColor text-[16px] leading-7 text-headingColor
             placeholder:text-textColor cursor-pointer"
              required
            />
          </div>
          <div className="mb-5">
            <label>Time</label>
            <select
              name="time"
              value={appointData.time}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-solid border-[#0066ff34] focus:outline-none
            focus:border-primaryColor text-[16px] leading-7 text-headingColor
             placeholder:text-textColor cursor-pointer"
            >
              <option value="9:00">9:00-10:00</option>
            </select>
          </div>
          <div className="mb-5 grid grid-cols-2 gap-3">
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-3 bg-red-600 text-white"
            >
              Cancel
            </button>
            <button className="px-4 py-3 bg-black text-white">Book</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default SidePanel;
