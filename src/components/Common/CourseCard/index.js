import React from "react";
import { Card, Col } from "react-bootstrap";
import { generateURLGetImageResource } from "helpers";
import { Link } from "react-router-dom";
import "./index.css";
import { BsPerson, BsStarFill, BsStar, BsHeartFill, BsHeart } from "react-icons/bs";
import { BiBookReader } from "react-icons/bi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import userAPi from "api/userApi";

export default function CourseCard({ course }) {
  const { avatar, title, lecturer, category, _id } = course;

  const token = useSelector((state) => state.user.token);
  const favoriteCourses = useSelector((state) => state.user.favoriteCourses);

  console.log(favoriteCourses);
  const isFavorite = favoriteCourses.includes(course._id);

  const handleAddToFavorite = async () => {
    if (!token) {
      return toast.info("Please login to use this feature!");
    }
    if (isFavorite) {
      return toast.error("This course has been added !");
    }

    const { success, msg } = await userAPi.addCoursesToFavorite({ courseId: course._id });
    success && toast.success("Successfully add to favorite");
  };

  return (
    <Col sm={4} style={{ padding: "20px" }}>
      <Card>
        <Card.Body>
          <Card.Img variant="top" style={{ width: "100%", height: "200px" }} src={generateURLGetImageResource(avatar)} />
          <a href="#" className="card__category mt-3 mb-2">
            {category.name}
          </a>
          <Card.Title>
            <Link className="card__title" to={`/course/${_id}`}>
              {title}
            </Link>
          </Card.Title>
          <div className="reviews d-flex justify-content-between align-items-center mb-4 mt-3">
            <div className="rating d-flex align-items-center">
              {Array(4)
                .fill()
                .map((_, i) => (
                  <BsStarFill color="#FFC78B" size={16} className="mr-1" />
                ))}

              <BsStar color="#FFC78B" size={16} />
              <div className="card__statistics ml-3">4 (10 reviews)</div>
            </div>

            <div className="fav">
              <a href="javascript:void" onClick={handleAddToFavorite}>
                {token && isFavorite ? (
                  <BsHeartFill className="fav_icon" color="rgb(220 73 52)" size={20} />
                ) : (
                  <BsHeart className="fav_icon" color="rgb(220 73 52)" size={20} />
                )}
              </a>
            </div>
          </div>
          <Card.Text
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div className="card__lecture d-flex align-items-center">
              <BiBookReader color="gray" size={18} />
              <span className="ml-2">{lecturer.firstName + " " + lecturer.lastName}</span>
            </div>
            <div className="card__prices">
              <del className="mr-2">$190</del>
              <span>$135</span>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}
