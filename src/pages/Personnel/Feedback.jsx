import React, { useState } from "react";
import avatar from "../../assets/images/avatar-icon.png";
import { formatDate } from "../../utils/formatDate";
import { AiFillStar } from "react-icons/ai";
import FeedbackForm from "./FeedbackForm";

function Feedback({ enableFeedBack, personnel }) {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  return (
    <div>
      <div className="mb-[30px]">
        <h4 className="text-[20px] leading[30px] font-bold text-headingColor mb-[30px]">
          All reviews ({personnel.totalRating})
        </h4>
        {personnel.reviews != null && personnel.reviews.length != 0 ? (
          personnel.reviews.map((item, index) => (
            <div className="flex justify-between gap-10 mb-[30px]">
              <div className="flex gap-3">
                <figure className="w-10 h-10 rounded-full">
                  <img className="w-full" src={item.photo} alt="" />
                </figure>
                <div>
                  <h5 className="text-[16px] leading-6 font-bold text-primaryColor">
                    {item.user.name}
                  </h5>
                  <p className="text-[14px] leading-6 text-textColor">
                    {formatDate(personnel.createdAt)}
                  </p>
                  <p className="text__para mt-3 font-medium text-[15px]">
                    {item.reviewText}
                  </p>
                </div>
              </div>

              <div className="flex gap-1">
                {[...Array(item.rating).keys()].map((_, index) => (
                  <AiFillStar key={index} color="#0067ff" />
                ))}
              </div>
            </div>
          ))
        ) : (
          <h3>Not yet reviewed.</h3>
        )}
      </div>

      {!showFeedbackForm == true && (
        <div className="text-center">
          {enableFeedBack && (
            <button className="btn" onClick={() => setShowFeedbackForm(true)}>
              Give Feedback
            </button>
          )}
        </div>
      )}
      {showFeedbackForm && <FeedbackForm />}
    </div>
  );
}

export default Feedback;
