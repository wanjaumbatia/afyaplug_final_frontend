import React, { useEffect, useState } from "react";
import doctorImg from "../../assets/images/doctor-img02.png";
import starIcon from "../../assets/images/Star.png";
import PersonnelAbout from "./PersonnelAbout";
import Feedback from "./Feedback";
import SidePanel from "./SidePanel";
import useGetData from "../../hooks/useFetchHooks";
import { BASE_URL } from "../../config";

import { useParams } from "react-router-dom";
function PersonnelDetails() {
  let { id } = useParams();

  const [tab, setTab] = useState("about");

  const {
    data: personnel,
    loading,
    error,
  } = useGetData(`${BASE_URL}/doctors/${id}`);

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {personnel != null && (
          <div className="grid md:grid-cols-3 gap-[50px]">
            <div className="md:col-span-2">
              <div className="flex items-center gap-5">
                <>
                  <figure className="max-w-[200px] max-h-[200px] rounded-md">
                    <img src={personnel.photo} alt="" className="rounded-md" />
                  </figure>
                  <div>
                    <span className="bg-[#ccf0f3] text-irisBlueColor py-1 px-6 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
                      {personnel.service}
                    </span>
                    <h3 className="text-headingColor text-[22px] leading-9 mt-3 font-bold">
                      {personnel.name}
                    </h3>
                    <div className="flex items-center gap-[6px]">
                      <span className="flex items-center gap-[6px] text-[14px] leading-4 lg:text-[16px] lg:leading-7 font-semibold text-headingColor">
                        <img src={starIcon} alt="" />{" "}
                        {personnel.totalRating == 0 &&
                        personnel.averageRating == 0
                          ? 5
                          : personnel.averageRating}
                      </span>
                      <span className="text-[14px] leading-4 lg:text-[16px] lg:leading-7 font-[400] text-textColor">
                        ({personnel.totalRating})
                      </span>
                    </div>
                    <p className="text__para text-[14px] m:text-[15px] max-w-[390px]">
                      {personnel.bio}
                    </p>
                  </div>
                </>
              </div>

              <div className="mt-[50px] border-b border-solid border-[#0066ff34]">
                <button
                  onClick={() => setTab("about")}
                  className={`${
                    tab == "about" &&
                    "border-b border-solid border-primaryColor"
                  } py-2 px-5 mr-5 text-[16px] leading-7 text-textColor font-semibold`}
                >
                  About
                </button>
                <button
                  onClick={() => setTab("feedback")}
                  className={`${
                    tab == "feedback" &&
                    "border-b border-solid border-primaryColor"
                  } py-2 px-5 mr-5 text-[16px] leading-7 text-textColor font-semibold`}
                >
                  Feedback
                </button>
              </div>

              <div className="mt-[50px]">
                {tab == `about` && <PersonnelAbout personnel={personnel} />}
                {tab == `feedback` && (
                  <Feedback personnel={personnel} enableFeedBack={true} />
                )}
              </div>
            </div>
            <div>
              <SidePanel personnel={personnel} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default PersonnelDetails;
