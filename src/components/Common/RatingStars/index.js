import React from 'react';
import { BsStar, BsStarFill } from 'react-icons/bs';

const MAX_POINT = 5;

export default function RatingStars({ point, color, size, className, style, onClickStar }) {
  const roundPoint = Math.floor(point);

  const fillStars = Array(roundPoint).fill(roundPoint);
  const emptyStars = Array(MAX_POINT - roundPoint).fill(roundPoint);

  const handleClickFillStar = (i) => {
    onClickStar && onClickStar(i + 1);
  };

  const handleClickEmptyStar = (i) => {
    onClickStar && onClickStar(i + 1 + point);
  };

  return (
    <div>
      {fillStars.map((_, i) => (
        <BsStarFill key={i} color={color} size={size} className={className} style={style} onClick={() => handleClickFillStar(i)} />
      ))}
      {emptyStars.map((point, i) => (
        <BsStar key={i} color={color} size={size} className={className} style={style} onClick={() => handleClickEmptyStar(i)} />
      ))}
    </div>
  );
}
