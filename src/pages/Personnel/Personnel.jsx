import React, { useEffect, useState } from "react";
import PersonnelCard from "../../components/Personnel/PersonnelCard";
import { doctors } from "../../assets/data/doctors";
import Testimonial from "../../components/Testimonial/Testimonial";
import useGetData from "../../hooks/useFetchHooks";
import { BASE_URL } from "../../config";

function Personnel() {
  const {
    data: personnel,
    loading,
    error,
  } = useGetData(`${BASE_URL}/doctors/`);

  return (
    <>
      <section className="bg-[#fff9ea]">
        <div className="container text-center">
          <h2 className="heading">Find a Nurse</h2>
          <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
            <input
              type="search"
              className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor"
              placeholder="Search by location or service"
              name="search"
              id="search"
            />
            <button className="btn mt-0 rounded-[0px] rounded-r-md">
              Search
            </button>
          </div>
        </div>
      </section>

      <section>
        {doctors.length == 0 ? (
          <div className="container">
            <div className="xl:w-[470] mx-auto">
              <h2 className="heading text-center">
                No nurses available at the moment.
              </h2>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {personnel.map((item, index) => (
                <PersonnelCard doctor={item} index={index} key={index} />
              ))}
            </div>
          </>
        )}
      </section>
      <hr className="mx-32" />
      <section>
        <div className="container">
          <div className="xl:w-[470] mx-auto">
            <h2 className="heading text-center">What our patients say</h2>
            <p className="text__para text-center">
              World-class care for everyone. Our health system offers unmatched,
              expert heath care.
            </p>
          </div>
          <Testimonial />
        </div>
      </section>
    </>
  );
}

export default Personnel;
