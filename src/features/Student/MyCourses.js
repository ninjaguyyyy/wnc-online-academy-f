import userAPi from "api/userApi";
import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import CourseCard from "../../components/Common/CourseCard";

export default function MyCourses() {
  const [ownCourses, setOwnCourses] = useState([]);

  useEffect(() => {
    (async () => {
      const { user } = await userAPi.getProfile();
      user && setOwnCourses(user.ownCourses);
    })();
  }, []);

  return (
    <Container>
      <Row>
        {ownCourses.map((course) => (
          <CourseCard course={course} />
        ))}
      </Row>
    </Container>
  );
}
