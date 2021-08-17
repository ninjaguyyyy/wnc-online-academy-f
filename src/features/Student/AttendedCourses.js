import userAPi from 'api/userApi';
import HeadingInfo from 'components/Common/HeadingInfo';
import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import CourseCard from '../../components/Common/CourseCard';

export default function AttendedCourses() {
  const [attendedCourses, setAttendedCourses] = useState([]);

  useEffect(() => {
    (async () => {
      const { success, attendedCourses } = await userAPi.getAttendedCourses();
      success && setAttendedCourses(attendedCourses);
    })();
  }, []);

  return (
    <Container>
      <Row>
        <HeadingInfo title="My Attended Courses" paths={[{ label: 'Home', ref: '/' }, { label: 'Own Courses' }]} />
      </Row>
      <Row>
        {attendedCourses.map((course) => (
          <CourseCard course={course} />
        ))}
      </Row>
    </Container>
  );
}
