import RatingStars from 'components/Common/RatingStars';
import React from 'react';
import { ProgressBar } from 'react-bootstrap';

export default function ProgressRating({ point, total, rate }) {
  return (
    <div className="progress-item">
      <ProgressBar style={{ height: '10px', flexGrow: 1 }}>
        <ProgressBar variant="info" now={rate} />
      </ProgressBar>
      <div className="stars d-flex align-items-center ml-4">
        <RatingStars point={point} color="#FFC78B" size={20} className="mr-1" />
        <div className="ml-3">{total}</div>
      </div>
    </div>
  );
}
