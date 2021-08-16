import coursesAPI from 'api/coursesApi';
import DynamicBreadcrumb from 'components/Common/DynamicBreadcrumb';
import RatingStars from 'components/Common/RatingStars';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import CourseCard from '../../../components/Common/CourseCard';
import CardPaymentInfo from './components/CardPaymentInfo';
import TabsInfo from './components/TabsInfo';
import './detailCourse.css';

function CourseDetail() {
  let { id } = useParams();
  const [course, setCourse] = useState(null);
  const [relativeCourses, setRelativeCourses] = useState([]);
  const [teacherCourses, setTeacherCourses] = useState([]);

  useEffect(() => {
    (async () => {
      const { success, course } = await coursesAPI.getById(id);
      success && setCourse(course);

      const [relativeCourses, teacherCourses] = await Promise.all([
        coursesAPI.getAll({ category: course.category._id }),
        coursesAPI.getByTeacher(course.lecturer._id),
      ]);
      const sortedCourses = relativeCourses.courses.sort((a, b) => b.students.length - a.students.length);
      const filteredCourses = sortedCourses.filter((course) => course._id !== id);
      const slicedCourses = filteredCourses.slice(0, 5);
      setRelativeCourses(slicedCourses);

      setTeacherCourses(teacherCourses.courses);
    })();
  }, []);

  return (
    <Container>
      <Row className="mb-4">
        <DynamicBreadcrumb paths={[{ label: 'Home', ref: '/' }, { label: 'Courses', ref: `/web` }, { label: course?.title }]} />
      </Row>
      {course && (
        <Row>
          <Col sm={8} style={{ paddingRight: '100px' }}>
            <h2>{course.title}</h2>
            <div className="short-des mt-3 mb-4 " dangerouslySetInnerHTML={{ __html: course.shortDescription }}></div>
            <div className="info mb-5">
              <img
                className="rounded-full"
                src={`https://i.pravatar.cc/350?u=${course.lecturer.userName}`}
                width="70"
                height="70"
                alt="lecturer"
              />
              <div className="lecturer">
                <div className="font-weight-bold">Created by</div>
                <div className="info-value">{course.lecturer.firstName + ' ' + course.lecturer.lastName}</div>
              </div>
              <div>
                <div className="font-weight-bold">Category</div>
                <div className="info-value">{course.category.name}</div>
              </div>
              <div>
                <div className="font-weight-bold">Reviews</div>
                <div className="info-value d-flex align-items-center">
                  <RatingStars point={course.rating} color="#FFC78B" size={16} className="mr-1" />
                  <div className="ml-1" style={{ fontSize: '14px' }}>
                    {course.rating} ({course.feedbacks.length} reviews)
                  </div>
                </div>
              </div>
            </div>
            <TabsInfo course={course} teacherCourses={teacherCourses} />
          </Col>
          <Col sm={4}>
            <CardPaymentInfo course={course} />
          </Col>
        </Row>
      )}

      <Row className="mt-5">
        <h2>Relative Courses</h2>
        {relativeCourses.map((course) => (
          <CourseCard course={course} isOpenNewTab={true} />
        ))}
      </Row>
    </Container>
  );
}

export default CourseDetail;
