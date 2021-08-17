import RatingStars from 'components/Common/RatingStars';
import React, { useState } from 'react';
import { ProgressBar, FloatingLabel, Form, Button } from 'react-bootstrap';
import { BsStarFill, BsStar, BsClock } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import coursesAPI from 'api/coursesApi';

export default function CommentForm({ course, onAddReview }) {
  const [rateValue, setRateValue] = useState(4);
  const [commentValue, setCommentValue] = useState('');

  const token = useSelector((state) => state.user.token);

  const handleChooseRate = (i) => {
    setRateValue(i);
  };

  const handlePost = async () => {
    if (!token) {
      return toast.error('Please post a valid comment!');
    }

    if (!commentValue) {
      return toast.error('Please post a valid comment!');
    }

    const { msg, feedbacks, success } = await coursesAPI.postReview(course._id, { rating: rateValue, content: commentValue });
    msg && toast.error(msg);
    if (success) {
      onAddReview(feedbacks);
      setCommentValue('');
    }
  };

  return (
    <div className="review-form">
      <h4>Your review</h4>
      <div className="d-flex justify-content-between align-items-center ">
        <div className="comment__start mr-5">
          <RatingStars
            point={rateValue}
            color="rgb(184, 178, 253)"
            size={40}
            className="mr-1 choose-rating"
            onClickStar={handleChooseRate}
          />
        </div>
        <FloatingLabel label="Your Comments" style={{ flexGrow: 1 }}>
          <Form.Control as="textarea" value={commentValue} onChange={(e) => setCommentValue(e.target.value)} style={{ height: '100px' }} />
        </FloatingLabel>
      </div>
      <Button variant="outline-primary" className="float-right mt-2" onClick={handlePost}>
        Post Review
      </Button>
    </div>
  );
}
