import React from "react";
import { Card, Col,Button } from "react-bootstrap";
import { generateURLGetImageResource } from "helpers";
import { useHistory,Link } from "react-router-dom";
import "./index.css";
import { BsPerson, BsStarFill, BsStar, BsHeartFill, BsHeart } from "react-icons/bs";
import { BiBookReader } from "react-icons/bi";
import { useSelector } from "react-redux";
export default function CourseCard({ course }) {
  const { avatar, title, lecturer, category, _id } = course;
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user);
  const history = useHistory();
  return (
    <Col sm={4} style={{ padding: "20px" }} className='CourseCard' >
      <Card>
        <Card.Body>
          <Card.Img variant="top" style={{ width: "100%", height: "200px" }} src={generateURLGetImageResource(avatar)} />
          {user.userInfo.role===2&&window.location.href.includes('teacher/courses')&&
          <Button 
            onClick={() => history.push(`/teacher/editcourse/${course._id}`)} 
            className='editbtncss'
          >
            Edit course
          </Button>}
          <p className="card__category mt-3 mb-2">
            {category.name}
          </p>
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
              <a href="javascript:void">
                <BsHeart className="fav_icon" color="rgb(220 73 52)" size={20} />
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
