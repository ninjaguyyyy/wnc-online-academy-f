import { ApiUrl } from 'api/axiosClient';
import React from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function DashboardSingleCourseCarouse({ courses }) {
  return (
    <Carousel>
      {courses.map((course) => (
        <Carousel.Item key={course._id}>
          <Link to={`/course/${course._id}`} className="carousel__courseLink">
            <img
              className="carousel__img"
              src={`${ApiUrl}resources/image/${course.avatar}`}
              alt="First slide"
            />
            <Carousel.Caption className="carousel__text">
              <h3>{course.title}</h3>
              <div dangerouslySetInnerHTML={{ __html: course.shortDescription }}></div>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
