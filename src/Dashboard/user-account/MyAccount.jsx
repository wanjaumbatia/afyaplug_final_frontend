import React, { useContext, useState } from "react";
import { authContext } from "../../context/AuthContext";
import MyBooking from "./MyBooking";
import Profile from "./Profile";
import useGetProfile from "../../hooks/useFetchHooks";
import { BASE_URL, token } from "../../config";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function MyAccount() {
  const [tab, setTab] = useState("bookings");
  const { dispatch } = useContext(  authContext);
  const navigate = useNavigate();

  const {
    data: userData,
    loading,
    error,
  } = useGetProfile(`${BASE_URL}/users/profile/me`);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  
  const handleAccountDelete = async () => {
    try {
      const res = await fetch(`${BASE_URL}/users/${userData._id}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token} `,
        },
      });

      const { message } = await res.json();
      if (!res.ok) {
        throw new Error(message);
      }
      toast.success(message);
      handleLogout();
      navigate("/");
    } catch (e) {
      toast.success(e.message);
    }
  };

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && <Loader />}
        {error && !loading && <Error errMessage={error} />}
        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-10">
            <div className="pb-[50px] px-[30px] rounded-md">
              <div className="flex items-center justify-center">
                <figure className="max-w-[100px] max-h-[100px] rounded-full border-2 border-solid border-primaryColor">
                  <img
                    src={userData.photo}
                    alt=""
                    className="w-full h-full rounded-full"
                  />
                </figure>
              </div>

              <div className="text-center mt-4">
                <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">
                  {userData.name}
                </h3>
                <p className="text-textColor text-[15px] leading-6 font-medium">
                  {userData.email}
                </p>
                <p className="text-textColor text-[15px] leading-6 font-medium">
                  Blood Type:
                  <span className="mt-2 ml-2 text-headingColor text-[18px] leading-8">
                    {userData.bloodType}
                  </span>
                </p>
              </div>

              <div className="mt-[50px] md:mt-[100px]">
                <button
                  onClick={handleLogout}
                  className="w-full bg-[#181A1E] leading-7 rounded-md text-white p-3"
                >
                  Logout
                </button>

                <button
                  onClick={handleAccountDelete}
                  className="w-full bg-red-600 mt-4 leading-7 rounded-md text-white p-3"
                >
                  Delete Account
                </button>
              </div>
            </div>
            <div className="md:col-span-2 md:px-[30px]">
              <div>
                <button
                  onClick={() => setTab("bookings")}
                  className={`${
                    tab == "bookings" &&
                    "bg-primaryColor text-white font-normal"
                  } p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
                >
                  My Bookings
                </button>
                <button
                  onClick={() => setTab("settings")}
                  className={`${
                    tab == "settings" &&
                    "bg-primaryColor text-white font-normal"
                  } p-2 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
                >
                  Profile Settings
                </button>
              </div>
              {tab == "bookings" && <MyBooking />}
              {tab == "settings" && <Profile user={userData} />}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default MyAccount;
