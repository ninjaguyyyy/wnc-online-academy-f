import React from "react";
import { ProgressBar, FloatingLabel, Form } from "react-bootstrap";
import { BsStarFill, BsStar } from "react-icons/bs";
import CommentForm from "./CommentForm";
import CommentReview from "./CommentReview";
import "./index.css";
import ProgressRating from "./ProgressRating";

export default function ReviewTabItem({ course }) {
  return (
    <div>
      <div className="review-info">
        <div className="review-card">
          <div className="text-center">
            <h1 style={{ margin: "-5px 0" }} className="font-weight-500">
              4
            </h1>
            <div>Course Rating</div>
            <div className="stars">
              {console.log(course)}
              {Array(4)
                .fill()
                .map((_, i) => (
                  <BsStarFill color="#FFC78B" size={16} className="mr-1" />
                ))}

              <BsStar color="#FFC78B" size={16} />
            </div>
          </div>
        </div>
        <div className="progress-area">
          <ProgressRating />
          <ProgressRating />
          <ProgressRating />
          <ProgressRating />
          <ProgressRating />
        </div>
      </div>

      <CommentForm course={course} />

      <div className="review-comments mt-5">
        <CommentReview />
        <CommentReview />
        <CommentReview />
      </div>
    </div>
  );
}
