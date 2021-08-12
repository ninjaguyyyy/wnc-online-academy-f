import RatingStars from "components/Common/RatingStars";
import { getFormatDateTime } from "helpers";
import React from "react";
import { BsStarFill, BsStar, BsClock } from "react-icons/bs";

export default function CommentReview({ review }) {
  return (
    <div className="comment-review">
      <div className="comment__avatar">
        <img
          className="rounded-full"
          src={`https://i.pravatar.cc/350?u=${review.student.userName}`}
          width="70"
          height="70"
          alt="lecturer"
        />
      </div>
      <div className="comment__body">
        <div className="comment-user d-flex justify-content-between">
          <div className="name">
            {review.student.firstName} {review.student.lastName}
          </div>
          <div className="comment__start">
            <RatingStars point={review.rating} color="rgb(184, 178, 253)" size={20} className="mr-1" />
          </div>
        </div>
        <div className="comment-time d-flex align-items-center mt-1">
          <BsClock />
          {/* <span className="ml-2">10:12 18/8/2011</span> */}
          <span className="ml-2">{getFormatDateTime(review.createdAt)}</span>
        </div>

        <div className="comment-content mt-3">{review.content}</div>
      </div>
    </div>
  );
}
