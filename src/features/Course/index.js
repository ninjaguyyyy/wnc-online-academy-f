import React from 'react'
import './Course.css'
import { Card, Carousel, Row, Col, Container } from 'react-bootstrap'
import { Link} from 'react-router-dom'
import no1 from 'assets/image/5.jpg'
import no2 from 'assets/image/17.png'
import no3 from 'assets/image/36.jpg'
function index() {
  const items = [
    {
      id: 1,
      name: 'no1',
      title: 'text no1'
    },
    {
      id: 2,
      name: 'no2',
      title: 'text no2'
    },
    {
      id: 3,
      name: 'no3',
      title: 'text no3'
    },
    {
      id: 4,
      name: 'no4',
      title: 'text no4'
    },
    {
      id: 5,
      name: 'no5',
      title: 'text no5 '
    }
  ]
  return (
    <Container  className='course' id='carousel__course'>
      <h2>Top 4 popular course</h2>
      <Carousel>
        <Carousel.Item >
          <Link to='/course/1' className='carousel__courseLink' >
            <img
              className='carousel__img'
              src={no1}
              alt="First slide"
            />
            <Carousel.Caption className='carousel__text' >
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Link>       
        </Carousel.Item>
        <Carousel.Item >
          <Link to='/course/2' className='carousel__courseLink' >
            <img
              className='carousel__img'
              src={no2}
              alt="Second slide"
            />
            <Carousel.Caption className='carousel__text'>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Link>
          
        </Carousel.Item>
        <Carousel.Item >
          <Link to='/course/2' className='carousel__courseLink' >
            <img
              className='carousel__img'
              src={no3}
              alt="Third slide"
            />
            <Carousel.Caption className='carousel__text'>
              <h3>Third slide label</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      </Carousel>
      <h2>Top 10 most views course</h2>
      <Container fluid>
        <Row xs={1} md={2} >
          {items.map((item, idx) => (
            <div key={1*idx}>
              <Link to={`/course/${item.id}`} >
                <Col style={{ padding: '20px' }}>
                  <Card >
                    <Card.Img variant="top" src={no1} />
                    <Card.Body>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Title>Teacher</Card.Title>
                      <Card.Text style={{ display:'flex', justifyContent:'space-between'}}>
                        {item.title}
                        <span style={{display:'flex' }}>
                          {Array(4)
                            .fill()
                            .map((_, i) => (
                              <span key={1*i}>⭐️</span>
                            ))}
                        </span>

                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Link>
            </div>
          ))}
        </Row>
      </Container>
    <h2>Top 10 most views course</h2>
      <Container fluid>
        <Row xs={1} md={2} >
          {items.map((item, idx) => (
            <div key={2*idx}>
            <Link to={`/course/${item.id}`}>
              <Col style={{ padding: '20px' }}>
                <Card >
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text >
                      {item.title}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Link>
            </div>
          ))}
        </Row>
      </Container>
      <h2>Top 10 news course</h2>
      <Container fluid>
        <Row xs={1} md={2} >
          {items.map((item, idx) => (
            <div key={3*idx}>
            <Link to={`/course/${item.id}`} key={idx}>
              <Col style={{ padding: '20px' }}>
                <Card >
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text >
                      {item.title}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Link>
            </div>
          ))}
        </Row>
      </Container>
      <h2>Top 10 most views</h2>
      <Container fluid>
        <Row xs={1} md={2} >
          {items.map((item, idx) => (
            <div key={4*idx}>
            <Link to={`/course/${item.id}`} key={idx}>
              <Col style={{ padding: '20px' }}>
                <Card >
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text >
                      {item.title}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Link>
            </div>
          ))}
        </Row>
      </Container>
      <h2>Top categories subcribe</h2>
      <Container fluid>
        <Row xs={1} md={3} >
          {items.map((item, idx) => (
            <div key={5*idx}>
            <Link to={`/course/${item.id}`} key={idx}>
              <Col style={{ padding: '20px' }}>
                <Card >
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text >
                      {item.title}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Link>
            </div>
          ))}
        </Row>
      </Container> 
    </Container>
  )
}

export default index
