import React from "react";
import { ProgressBar } from "react-bootstrap";
import { BsStarFill, BsStar } from "react-icons/bs";

export default function ProgressRating() {
  return (
    <div className="progress-item">
      <ProgressBar style={{ height: "10px", flexGrow: 1 }}>
        <ProgressBar variant="info" now={20} />
      </ProgressBar>
      <div className="stars d-flex align-items-center ml-4">
        {Array(4)
          .fill()
          .map((_, i) => (
            <BsStarFill color="#FFC78B" size={20} className="mr-1" />
          ))}

        <BsStar color="#FFC78B" size={20} />
        <div className="ml-3">4</div>
      </div>
    </div>
  );
}
