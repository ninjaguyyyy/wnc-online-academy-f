import React from 'react'
import { Link} from 'react-router-dom'
function CourseDetail(props) {
  console.log('props',props)
  return (
    <div>
      <Link to='/dashboard'>Home</Link>
    </div>
  )
}

export default CourseDetail
