import React from 'react'
import { Container,Button } from  'react-bootstrap'
import { useHistory} from 'react-router-dom'
function Courses() {
  const history=useHistory()
  return (
    <Container>
      <h2>My Course</h2>
      <div style={{ marginTop:'30px'}}>
        <Button onClick={()=>history.push('/teacher/courses/add-course')}>
          Add new Course
        </Button>
      </div>
    </Container>
  )
}

export default Courses
