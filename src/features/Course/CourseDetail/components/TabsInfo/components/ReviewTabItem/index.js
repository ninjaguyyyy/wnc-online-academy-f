import RatingStars from "components/Common/RatingStars";
import React, { useState } from "react";
import { ProgressBar, FloatingLabel, Form } from "react-bootstrap";
import { BsStarFill, BsStar } from "react-icons/bs";
import CommentForm from "./CommentForm";
import CommentReview from "./CommentReview";
import "./index.css";
import ProgressRating from "./ProgressRating";
import StatisticFeedbacks from "./StatisticFeedbacks";

export default function ReviewTabItem({ course }) {
  const [reviews, setReviews] = useState(course.feedbacks);

  const handleAddReview = (reviews) => {
    setReviews(reviews);
  };

  const statisticsRating = reviews.reduce(
    (acc, review) => {
      return { ...acc, [review.rating]: acc[review.rating] + 1 };
    },
    { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  );

  const averageRating = reviews.length !== 0 ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(2) : 0;

  return (
    <div>
      <div className="review-info">
        <div className="review-card">
          <div className="text-center">
            <h1 style={{ margin: "-5px 0" }} className="font-weight-500">
              {averageRating}
            </h1>
            <div>Course Rating</div>
            <div className="stars">
              <RatingStars point={averageRating} color="#FFC78B" size={16} className="mr-1" />
            </div>
          </div>
        </div>

        <StatisticFeedbacks statisticsRating={statisticsRating} feedbacksTotal={reviews.length} />
      </div>

      <CommentForm course={course} onAddReview={handleAddReview} />

      <div className="review-comments">
        {[]
          .concat(reviews)
          .reverse()
          .map((feedback) => (
            <CommentReview review={feedback} />
          ))}
      </div>
    </div>
  );
}
