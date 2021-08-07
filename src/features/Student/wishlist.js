import userAPi from "api/userApi";
import CourseCard from "components/Common/CourseCard";
import HeadingInfo from "components/Common/HeadingInfo";
import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";

function WishList() {
  const [favoriteCourses, setFavoriteCourses] = useState([]);

  useEffect(() => {
    (async () => {
      const { user } = await userAPi.getProfile();
      user && setFavoriteCourses(user.favoriteCourses);
    })();
  }, []);

  return (
    <Container>
      <Row>
        <HeadingInfo title="Wish List" paths={[{ label: "Home", ref: "/" }, { label: "Wish List" }]} />
      </Row>
      <Row>
        {favoriteCourses.map((course) => (
          <CourseCard course={course} />
        ))}
      </Row>
    </Container>
  );
}

export default WishList;
