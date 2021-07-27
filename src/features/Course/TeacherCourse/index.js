import React, { useEffect } from 'react'
import { Container,Button,Row,Col,Card } from  'react-bootstrap'
import { useHistory,Link} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import teacherApi from "api/teacherApi"
import { courses } from 'store/teacherSlice'
import no1 from 'assets/image/5.jpg'

function Courses() {
  const history=useHistory()
  const dispatch= useDispatch()
  const Courses= useSelector(state => state.teacher.courses)
  useEffect(()=>{
    teacherApi.courses()
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
        </Row>}
    </Container>
  )
}

export default Courses
