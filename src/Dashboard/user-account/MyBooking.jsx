import React from "react";
import useFetchData from "../../hooks/useFetchHooks";
import { BASE_URL } from "../../config";
import PersonnelCard from "../../components/Personnel/PersonnelCard";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";

const MyBooking = () => {
  const {
    data: appointments,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/users/appointments/my-appointments`);
  return (
    <div>
      {loading && <Loader />}
      {error && !loading && <Error errMessage={error} />}
      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {appointments.map((personnel) => (
            <PersonnelCard key={personnel._id} doctor={personnel} />
          ))}
        </div>
      )}
      {!loading && !error && appointments.length == 0 && (
        <h2 className="mt-5 text-center text-primaryColor  leading-7 text-[20px] font-semibold">You have not booked any appointment yet!</h2>
      )}
    </div>
  );
};

export default MyBooking;
