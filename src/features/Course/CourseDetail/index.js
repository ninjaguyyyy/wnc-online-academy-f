import React, { useEffect } from "react"
import { useHistory } from "react-router-dom"
import ReactPlayer from "react-player"
import { Button, Tabs, Tab, Card } from "react-bootstrap"
import Accordion from "react-bootstrap/Accordion"
import "./detailCourse.css"
import authApi from "api/authUser"
import {course} from 'store/userSlice'
import {sections} from 'store/teacherSlice'
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
        dispatch(sections(res.course.sections))
    })
  },[props.match.params.id,dispatch])
  const Course= useSelector(state=>state.user.course)
  const role= useSelector(state=>state.user.userInfo)
  if(Course!=null){
    return (
      <div>
        {role?.role===2&&
        <Button 
          onClick={()=>history.push(`/teacher/editcourse/${props.match.params.id}`)}
          style={{ marginBottom:'20px'}}
        >
          Edit Course
        </Button>
        }
        {console.log(Course)}
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
            <div>RECENT REVIEWS:Very Positive (9,289)</div>
          </div>
        </div>
        <div style={{ margin:'30px 0 150px 0'}}>
          <Button variant="primary" size="lg" style={{ marginRight:'30px'}}>
            Add to your wishlist
          </Button>
          <Button variant="primary" size="lg">
            Assign
          </Button>
          <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-3"
            style={{ marginTop:'30px'}}
          >
            <Tab eventKey="home" title="Home">
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
            <Tab eventKey="Videos" title="Videos">
              <Accordion>
                <Card>
                  <Card.Body>
                  {Course.sections.length > 0&&
                  Course.sections.map((item,i)=>(
                    <Accordion key={i}>
                    <Card>
                      <Card.Body>
                        <Accordion.Toggle as={Button} eventKey={item._id}>
                          {item.name}
                        </Accordion.Toggle>
                      </Card.Body>
                      <Accordion.Collapse eventKey={item._id}>
                        <Card>
                          <Card.Body>
                            {Course.sections[i].lectures.length>0&&
                            Course.sections[i].lectures.map((lecture,j)=>(
                              <Accordion key={lecture._id}>
                                <Card>
                                  <Card.Body>
                                    <Accordion.Toggle as={Button} eventKey={lecture._id}>
                                      {lecture.title}
                                    </Accordion.Toggle>
                                  </Card.Body>
                                  <Accordion.Collapse eventKey={lecture._id}>
                                    <Card.Body>
                                      <h2>{lecture.title}</h2>
                                      <h2>Clip</h2>
                                      <ReactPlayer
                                        url='https://wnc-online-academy-21.herokuapp.com/resources/video/wnc21-wfcD6WlQ9e.mp4'
                                        style={{ width: "600px" }}
                                        controls={true}
                                      />
                                    </Card.Body>
                                  </Accordion.Collapse>
                                </Card>
                              </Accordion>
                            ))}
                          </Card.Body>
                        </Card>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                  ))}
                  </Card.Body>
                </Card>
              </Accordion>
            </Tab>
            <Tab eventKey="Comments" title="Comments">
              <div>RECENT REVIEWS:Very Positive (9,289)</div>
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
