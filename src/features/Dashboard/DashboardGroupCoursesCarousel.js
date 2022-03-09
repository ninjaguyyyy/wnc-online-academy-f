import CourseCard from 'components/Common/CourseCard';
import React from 'react';
import { Carousel, Row } from 'react-bootstrap';

export default function DashboardGroupCoursesCarousel({ courses, color }) {
  return (
    <Carousel id="course__carousel" style={{ backgroundColor: color }}>
      <Carousel.Item>
        <Row xs={1} md={4} style={{ marginBottom: '50px' }}>
          {courses?.slice(0, 4).map((item, i) => (
            <CourseCard course={item} key={i} />
          ))}
        </Row>
      </Carousel.Item>
      <Carousel.Item>
        <Row xs={1} md={4} style={{ marginBottom: '50px' }}>
          {courses?.slice(4, 8).map((item, i) => (
            <CourseCard course={item} key={i} />
          ))}
        </Row>
      </Carousel.Item>
      <Carousel.Item>
        <Row xs={1} md={4} style={{ marginBottom: '50px' }}>
          {courses?.slice(8, 10).map((item, i) => (
            <CourseCard course={item} key={i} />
          ))}
        </Row>
      </Carousel.Item>
    </Carousel>
  );
}
