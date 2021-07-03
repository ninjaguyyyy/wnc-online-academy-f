import React from 'react'
import { Link} from 'react-router-dom'
import ReactPlayer from 'react-player'
import pic from 'assets/image/5.jpg'
import { Button } from 'react-bootstrap'
import './detailCourse.css'
function CourseDetail(props) {
  return (
    <div>
      <Link to='/dashboard'>Home</Link>
      <h2>Forza Horizon 4</h2>
      <div style={{ display: 'flex' }}>
        <ReactPlayer 
          url='https://www.youtube.com/watch?v=ysz5S6PUM-U' 
          style={{ width:'600px'}}
          controls={true}
        />
        <div style={{ marginLeft:'5px' , maxWidth:'300px'}}>
          <img src={pic} alt='asd' className='img_course'/>
          <div>Dynamic seasons change everything at the world’s greatest automotive festival. 
            Go it alone or team up with others to explore beautiful and historic Britain in a shared open world.
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
      </div>

    </div>
  )
}

export default CourseDetail
