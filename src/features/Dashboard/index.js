import React, { useEffect, useState } from 'react';
import coursesAPI from 'api/coursesApi';
import { Container, Row, Spinner } from 'react-bootstrap';
import DashboardSingleCourseCarouse from './DashboardSingleCourseCarouse';
import DashboardGroupCoursesCarousel from './DashboardGroupCoursesCarousel';
import CourseCard from 'components/Common/CourseCard';
import './index.css';

function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [popularCourses, setPopularCourses] = useState([]);
  const [newCourses, setNewCourses] = useState([]);
  const [mostViewsCourses, setMostViewsCourses] = useState([]);
  const [mostRatingCourses, setMostRatingCourses] = useState([]);

  useEffect(() => {
    (async () => {
      const { courses: fetchedCourses } = await coursesAPI.getAll();
      setCourses(fetchedCourses);
    })();
  }, []);

  useEffect(() => {
    if (!courses.length) {
      return;
    }

    const {
      filteredPopularCourses,
      filteredNewCourses,
      filteredMostViewsCourses,
      filteredMostRatingCourses,
    } = getFilteredCourses(courses);

    setPopularCourses(filteredPopularCourses);
    setNewCourses(filteredNewCourses);
    setMostViewsCourses(filteredMostViewsCourses);
    setMostRatingCourses(filteredMostRatingCourses);
  }, [courses]);

  return (
    <>
      {!courses.length ? (
        <Spinner animation="border" variant="success" />
      ) : (
        <Container className="course" id="carousel__course">
          <h2>Top 4 popular course</h2>
          <DashboardSingleCourseCarouse courses={popularCourses} />

          <h2 className="h2css mt-5 mb-4">Top 10 most views course</h2>
          <DashboardGroupCoursesCarousel courses={mostViewsCourses} color="#fbd1fa" />

          <h2 className="h2css mt-5 mb-4">Top 10 newest course</h2>
          <DashboardGroupCoursesCarousel courses={newCourses} color="#fff981" />

          <h2 className="h2css mt-5 mb-4">Top 10 Rating course</h2>
          <Row xs={1} md={4} style={{ marginBottom: '50px', backgroundColor: '#9ce9ef' }}>
            {mostRatingCourses.map((item, i) => (
              <CourseCard course={item} key={i} />
            ))}
          </Row>
        </Container>
      )}
    </>
  );
}

const getFilteredCourses = (courses) => {
  const filteredPopularCourses = courses
    .concat()
    .sort(function (a, b) {
      return b.students.length - a.students.length;
    })
    .slice(0, 4);

  const filteredNewCourses = courses.concat().reverse();

  const filteredMostViewsCourses = courses.concat().sort(function (a, b) {
    return b.feedbacks.length - a.feedbacks.length;
  });

  const filteredMostRatingCourses = courses
    .concat()
    .sort(function (a, b) {
      return b.rating - a.rating;
    })
    .slice(0, 10);

  return {
    filteredPopularCourses,
    filteredNewCourses,
    filteredMostViewsCourses,
    filteredMostRatingCourses,
  };
};

export default Dashboard;
