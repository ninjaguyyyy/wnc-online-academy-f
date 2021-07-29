import React, { useEffect } from "react"
import { Link,useHistory } from "react-router-dom"
import ReactPlayer from "react-player"
import { Button, Tabs, Tab, Card } from "react-bootstrap"
import Accordion from "react-bootstrap/Accordion"
import "./detailCourse.css"
import authApi from "api/authUser"
import {course} from 'store/userSlice'
import { useDispatch, useSelector } from "react-redux"
import { ApiUrl } from 'api/authUser'
import  loading from 'assets/image/loading.svg'
function CourseDetail(props) {
  const dispatch= useDispatch()
  const history= useHistory()
  useEffect(()=>{
    authApi.getCourseById(props.match.params.id).then(res=>{
      if(res.success===true)
        dispatch(course(res.course))
    })
  },[props.match.params.id,dispatch])
  const Course= useSelector(state=>state.user.course)
  const role= useSelector(state=>state.user.userInfo)
  if(Course!=null){
    return (
      <div>
        <Link to="/dashboard">Home</Link>
        {role?.role===2&&<Button onClick={()=>history.push(`/teacher/editcourse/${props.match.params.id}`)}>
          Edit Course
          </Button>
        }
        <h2>{Course.title}</h2>
        <div style={{ display: "flex" }}>
          <ReactPlayer
            url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
            style={{ width: "600px" }}
            controls={true}
          />
          <div style={{ marginLeft: "5px", maxWidth: "300px" }}>
            <img src={`${ApiUrl}resources/image/${Course.avatar}`} alt="img" className="img_course" />
            <div>
              {Course.fullDescription}
            </div>
            <div>RECENT REVIEWS:Very Positive (9,289)</div>
            <div>RECENT REVIEWS:Very Positive (9,289)</div>
            <div>RECENT REVIEWS:Very Positive (9,289)</div>
            <div>RECENT REVIEWS:Very Positive (9,289)</div>
          </div>
        </div>
        <div>
          <Button variant="primary" size="lg">
            Add to your wishlist
          </Button>
          <Button variant="primary" size="lg">
            Assign
          </Button>
          <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="home" title="Home">
              <div>RECENT REVIEWS:Very Positive (9,289)</div>
            </Tab>
            <Tab eventKey="profile" title="Profile">
              <Accordion>
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} eventKey="menu">
                      Click me
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="menu">
                    <Card.Body>
                      <Accordion>
                        <Card>
                          <Card.Header>
                            <Accordion.Toggle as={Button} eventKey="1">
                              Ep1
                            </Accordion.Toggle>
                          </Card.Header>
                          <Accordion.Collapse eventKey="1">
                            <Card.Body>
                              <h2>Title</h2>
                              <h2>Clip</h2>
                              <ReactPlayer
                                url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
                                style={{ width: "600px" }}
                                controls={true}
                              />
                            </Card.Body>
                          </Accordion.Collapse>
                        </Card>
                      </Accordion>
                      <Accordion>
                        <Card>
                          <Card.Header>
                            <Accordion.Toggle as={Button} eventKey="ep2">
                              Ep2
                            </Accordion.Toggle>
                          </Card.Header>
                          <Accordion.Collapse eventKey="ep2">
                            <Card.Body>
                              <h2>Title</h2>
                              <h2>Clip</h2>
                              <ReactPlayer
                                url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
                                style={{ width: "600px" }}
                                controls={true}
                              />
                            </Card.Body>
                          </Accordion.Collapse>
                        </Card>
                      </Accordion>
                      <Accordion>
                        <Card>
                          <Card.Header>
                            <Accordion.Toggle as={Button} eventKey="ep3">
                              Ep3
                            </Accordion.Toggle>
                          </Card.Header>
                          <Accordion.Collapse eventKey="ep3">
                            <Card.Body>
                              <h2>Title</h2>
                              <h2>Clip</h2>
                              <ReactPlayer
                                url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
                                style={{ width: "600px" }}
                                controls={true}
                              />
                            </Card.Body>
                          </Accordion.Collapse>
                        </Card>
                      </Accordion>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </Tab>
            <Tab eventKey="contact" title="Contact">
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up
                    the bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
  else{
    return(
      <div>
        <img src={loading} className="loading" alt="loading" />
      </div>
    )
  }
   
}

export default CourseDetail;
