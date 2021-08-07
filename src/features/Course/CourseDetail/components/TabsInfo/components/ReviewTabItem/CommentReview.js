import React from "react";
import { BsStarFill, BsStar, BsClock } from "react-icons/bs";

export default function CommentReview() {
  return (
    <div className="comment-review">
      <div className="comment__avatar">
        <img className="rounded-full" src={`https://i.pravatar.cc/350?u=${"aa"}`} width="70" height="70" alt="lecturer" />
      </div>
      <div className="comment__body">
        <div className="comment-user d-flex justify-content-between">
          <div className="name">Name Nauyeng</div>
          <div className="comment__start">
            {Array(4)
              .fill()
              .map((_, i) => (
                <BsStarFill color="rgb(184, 178, 253)" size={20} className="mr-1" />
              ))}

            <BsStar color="rgb(184, 178, 253)" size={20} />
          </div>
        </div>
        <div className="comment-time d-flex align-items-center mt-1">
          <BsClock />
          <span className="ml-2">10:12 18/8/2011</span>
        </div>

        <div className="comment-content mt-3">
          This course was well organized and covered a lot more details than any other Figma courses. I really enjoy it. One suggestion is
          that it can be much better if we could complete the prototype together
        </div>
      </div>
    </div>
  );
}
