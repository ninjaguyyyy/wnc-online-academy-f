import React from "react";
import { ProgressBar, FloatingLabel, Form, Button } from "react-bootstrap";
import { BsStarFill, BsStar, BsClock } from "react-icons/bs";

export default function CommentForm() {
  return (
    <div className="review-form">
      <h4>Your review</h4>
      <div className="d-flex justify-content-between align-items-center ">
        <div className="comment__start mr-5">
          {Array(4)
            .fill()
            .map((_, i) => (
              <BsStarFill color="rgb(184, 178, 253)" size={40} className="mr-1" />
            ))}

          <BsStar color="rgb(184, 178, 253)" size={40} />
        </div>
        <FloatingLabel label="Comments" style={{ flexGrow: 1 }}>
          <Form.Control as="textarea" placeholder="Leave a comment here" style={{ height: "100px" }} />
        </FloatingLabel>
      </div>
      <Button variant="outline-primary" className="float-right mt-2">
        Post Review
      </Button>
    </div>
  );
}
