import React from 'react'
import Profile from 'features/Profile'
import {Container,Button} from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
function Teacher() {
  const history=useHistory()
  return (
    <Container>
      <Profile />
      <Button onClick={()=>history.push('/teacher/course')}>My Course</Button>
    </Container>
  )
}

export default Teacher
