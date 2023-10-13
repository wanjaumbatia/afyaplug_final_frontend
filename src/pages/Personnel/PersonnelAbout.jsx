import React from "react";
import { formatDate } from "../../utils/formatDate";

function PersonnelAbout({ personnel }) {
  return (
    <div>
      <div>
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2">
          About
          <span className="text-irisBlueColor font-bold text-[24px] leading-9">
            {personnel.name}
          </span>
        </h3>
        <p className="text__para">{personnel.about}</p>
      </div>

      <div className="mt-12 ">
        <h3 className="font-semibold  text-headingColor">Education</h3>
        <ul className="pt-4 md:p-5">
          {personnel.qualifications != null ? (
            personnel.qualifications.map((item, index) => (
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

      <div className="mt-12 ">
        <h3 className="font-semibold  text-headingColor">Experience</h3>
        <ul className="grid sm:grid-cols-2 gap-[30px] px-4 md:p-5">
          {personnel.experiences != null ? (
            personnel.experiences.map((item, index) => (
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
  );
}

export default PersonnelAbout;
