import React, { useEffect } from 'react'
import { Container,Button,Row,Col,Card } from  'react-bootstrap'
import { useHistory,Link} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import teacherApi from "api/teacherApi"
import { courses } from 'store/teacherSlice'
import {course} from 'store/userSlice'
import {ApiUrl} from 'api/authUser'
function Courses() {
  const history=useHistory()
  const dispatch= useDispatch()
  const Courses= useSelector(state => state.teacher.courses)
  useEffect(()=>{
    teacherApi.myCourses()
      .then(res=>{
        if(res.success===true){
          dispatch(courses(res.courses))
        }
      })
    
  },[dispatch])
  return (
    <Container>
      <div style={{ marginBottom:'30px'}}>
        <Button onClick={()=>history.push('/teacher/courses/add-course')}>
          Add new Course
        </Button>
      </div>
      <h2>My Course</h2>
      {Courses!==null&&<Row xs={1} md={2} >
          {Courses.map((item, idx) => (
            <div key={1*idx}>
              <Link to={`/course/${item._id}`} onClick={() =>dispatch(course(null))}>
                <Col style={{ padding: '20px' }}>
                  <Card >
                    <Card.Img variant="top" src={`${ApiUrl}resources/image/${item.avatar}`} className="imgCourse"/>
                    <Card.Body>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Title>Teacher:</Card.Title>
                      <Card.Text style={{ display:'flex', justifyContent:'space-between'}}>
                        {item.shortDescription}
                        <span style={{display:'flex' }}>
                          {Array(item.rating)
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
        </Row>}
    </Container>
  )
}

export default Courses
