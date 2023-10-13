import React, { useContext, useState } from "react";
import { authContext } from "../../context/AuthContext";
import useGetProfile from "../../hooks/useFetchHooks";
import { BASE_URL, token } from "../../config";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Overview from "./Overview";
import Profile from "./Profile";
import Appointments from "./Appointments";

function Dashboard() {
  const [tab, setTab] = useState("overview");
  const { dispatch } = useContext(authContext);
  const navigate = useNavigate();

  const {
    data: userData,
    loading,
    error,
  } = useGetProfile(`${BASE_URL}/doctors/profile/me`);
  
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const handleAccountDelete = async () => {
    try {
      const res = await fetch(`${BASE_URL}/doctors/${userData._id}`, {
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
              <div className="text-center">
                <button
                  onClick={() => setTab("overview")}
                  className={`${
                    tab == "overview" && "border-solid border-2 border-blue-700"
                  } w-full leading-7 bg-blue-100 rounded-md text-textColor p-3`}
                >
                  Overview
                </button>

                <button
                  onClick={() => setTab("appointments")}
                  className={`${
                    tab == "appointments" &&
                    "border-solid border-2 border-blue-700"
                  } mt-3 w-full leading-7 bg-blue-100 rounded-md text-textColor p-3`}
                >
                  Appointments
                </button>

                <button
                  onClick={() => setTab("profile")}
                  className={`${
                    tab == "profile" && "border-solid border-2 border-blue-700"
                  } mt-3 w-full leading-7 bg-blue-100 rounded-md text-textColor p-3`}
                >
                  Profile
                </button>
              </div>

              <div className="mt-[30px] md:mt-[50px]">
                <button
                  onClick={handleLogout}
                  className="w-full bg-blue bg-[#181A1E] leading-7 rounded-md text-white p-3"
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
                {tab == "overview" && <Overview personnel={userData}/>}
                {tab == "appointments" && <Appointments />}
                {tab == "profile" && <Profile user={userData} />}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Dashboard;
