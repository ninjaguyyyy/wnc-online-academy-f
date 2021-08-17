import React from 'react';
import './Course.css';
import { Carousel, Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ApiUrl } from 'api/authUser';
import CourseCard from 'components/Common/CourseCard';
import { useSelector } from 'react-redux';
function Index() {
  const coursesdata = useSelector((state) => state.user.dashboard.courses);
  const top4 = coursesdata
    .concat()
    .sort(function (a, b) {
      return b.students.length - a.students.length;
    })
    .slice(0, 4);

  const newestCourse = coursesdata.concat().reverse();
  const mostViewsCourse = coursesdata.concat().sort(function (a, b) {
    return b.feedbacks.length - a.feedbacks.length;
  });
  const ratingCourse = coursesdata.concat().sort(function (a, b) {
    return b.rating - a.rating;
  });
  const topCategory = useSelector((state) => state.user.dashboard.categories);

  return (
    <Container className="course" id="carousel__course">
      <h2>Top 4 popular course</h2>
      <Carousel>
        {top4.map((item, i) => (
          <Carousel.Item>
            <Link to={`/course/${item._id}`} className="carousel__courseLink">
              <img className="carousel__img" src={`${ApiUrl}resources/image/${item.avatar}`} alt="First slide" />
              <Carousel.Caption className="carousel__text">
                <h3>{item.title}</h3>
                <div dangerouslySetInnerHTML={{ __html: item.shortDescription }}></div>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
      <h2 className="h2css">Top 10 most views course</h2>
      <Carousel id="course__carousel">
        <Carousel.Item>
          <Row xs={1} md={4} style={{ marginBottom: '100px', backgroundColor: '#f69113' }}>
            {mostViewsCourse?.slice(0, 4).map((item, i) => (
              <CourseCard course={item} key={i} />
            ))}
          </Row>
        </Carousel.Item>
        <Carousel.Item>
          <Row xs={1} md={4} style={{ marginBottom: '100px', backgroundColor: '#f69113' }}>
            {mostViewsCourse?.slice(4, 8).map((item, i) => (
              <CourseCard course={item} key={i} />
            ))}
          </Row>
        </Carousel.Item>
        <Carousel.Item>
          <Row xs={1} md={4} style={{ marginBottom: '100px', backgroundColor: '#f69113' }}>
            {mostViewsCourse?.slice(8, 10).map((item, i) => (
              <CourseCard course={item} key={i} />
            ))}
          </Row>
        </Carousel.Item>
      </Carousel>
      <h2 className="h2css">Top 10 newest course</h2>
      <Carousel id="course__carousel">
        <Carousel.Item>
          <Row xs={1} md={4} style={{ marginBottom: '100px', backgroundColor: '#f69113' }}>
            {newestCourse?.slice(0, 4).map((item, i) => (
              <CourseCard course={item} key={i} />
            ))}
          </Row>
        </Carousel.Item>
        <Carousel.Item>
          <Row xs={1} md={4} style={{ marginBottom: '100px', backgroundColor: '#f69113' }}>
            {newestCourse?.slice(4, 8).map((item, i) => (
              <CourseCard course={item} key={i} />
            ))}
          </Row>
        </Carousel.Item>
        <Carousel.Item>
          <Row xs={1} md={4} style={{ marginBottom: '100px', backgroundColor: '#f69113' }}>
            {newestCourse?.slice(8, 10).map((item, i) => (
              <CourseCard course={item} key={i} />
            ))}
          </Row>
        </Carousel.Item>
      </Carousel>
      <h2 className="h2css">Top 10 Rating course</h2>
      <Row xs={1} md={4} style={{ marginBottom: '100px', backgroundColor: '#f69113' }}>
        {ratingCourse?.map((item, i) => (
          <CourseCard course={item} key={i} />
        ))}
      </Row>
      <h2 className="h2css">Top Category</h2>
      <Row xs={1} md={4} style={{ marginBottom: '100px', backgroundColor: '#f69113' }}>
        {topCategory?.map((item, i) => (
          <h3 style={{ padding: '20px' }} key={i}>
            <Link style={{ color: '#000' }} to={`/web?category=${item._id}`}>
              {item.name}
            </Link>
          </h3>
        ))}
      </Row>
    </Container>
  );
}
export default Index;
