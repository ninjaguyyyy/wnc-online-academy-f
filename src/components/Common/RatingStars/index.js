import React from "react";
import { BsStar, BsStarFill } from "react-icons/bs";

const MAX_POINT = 5;

export default function RatingStars({ point, color, size, className, style, onClickStar }) {
  const fillStars = Array(point).fill(point);
  const emptyStars = Array(MAX_POINT - point).fill(point);

  return (
    <div>
      {fillStars.map((_, i) => (
        <BsStarFill color={color} size={size} className={className} style={style} onClick={() => onClickStar(i + 1)} />
      ))}
      {emptyStars.map((point, i) => (
        <BsStar color={color} size={size} className={className} style={style} onClick={() => onClickStar(i + 1 + point)} />
      ))}
    </div>
  );
}
