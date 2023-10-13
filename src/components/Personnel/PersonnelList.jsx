import React from "react";
import { doctors } from "./../../assets/data/doctors";
import PersonnelCard from "./PersonnelCard";

function PersonnelList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
      {doctors.map((item, index) => (
        <PersonnelCard doctor={item} index={index} key={index} />
      ))}
    </div>
  );
}

export default PersonnelList;
