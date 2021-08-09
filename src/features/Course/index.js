import React from "react";
import "./Course.css";
import { Carousel, Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import no1 from "assets/image/5.jpg";
import no2 from "assets/image/17.png";
import no3 from "assets/image/36.jpg";
import CourseCard from 'components/Common/CourseCard'
import { useSelector } from 'react-redux';

function Index() {
  const coursesdata=useSelector(state=>state.user.dashboard.courses)
  return (
    <Container className="course" id="carousel__course">
      <h2>Top 4 popular course</h2>
      <Carousel>
        <Carousel.Item>
          <Link to="/course/1" className="carousel__courseLink">
            <img className="carousel__img" src={no1} alt="First slide" />
            <Carousel.Caption className="carousel__text">
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
        <Carousel.Item>
          <Link to="/course/2" className="carousel__courseLink">
            <img className="carousel__img" src={no2} alt="Second slide" />
            <Carousel.Caption className="carousel__text">
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
        <Carousel.Item>
          <Link to="/course/2" className="carousel__courseLink">
            <img className="carousel__img" src={no3} alt="Third slide" />
            <Carousel.Caption className="carousel__text">
              <h3>Third slide label</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      </Carousel>
      <h2 className='h2css'>Top 10 most views course</h2>
      <Row xs={1} md={4} style={{ marginBottom:'100px' }}>
        {coursesdata?.map((item,i)=>(
          <CourseCard course={item} key={i} />
        ))}
      </Row>
    </Container>
  );
}
export default Index;
