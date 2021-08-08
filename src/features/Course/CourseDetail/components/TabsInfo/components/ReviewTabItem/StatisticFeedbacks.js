import React, { useEffect } from "react";
import ProgressRating from "./ProgressRating";

export default function StatisticFeedbacks({ statisticsRating, feedbacksTotal }) {
  return (
    <div className="progress-area">
      <ProgressRating point={1} total={statisticsRating[1]} rate={(statisticsRating[1] / feedbacksTotal) * 100} />
      <ProgressRating point={2} total={statisticsRating[2]} rate={(statisticsRating[2] / feedbacksTotal) * 100} />
      <ProgressRating point={3} total={statisticsRating[3]} rate={(statisticsRating[3] / feedbacksTotal) * 100} />
      <ProgressRating point={4} total={statisticsRating[4]} rate={(statisticsRating[4] / feedbacksTotal) * 100} />
      <ProgressRating point={5} total={statisticsRating[5]} rate={(statisticsRating[5] / feedbacksTotal) * 100} />
    </div>
  );
}
