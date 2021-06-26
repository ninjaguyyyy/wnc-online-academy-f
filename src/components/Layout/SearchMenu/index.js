import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'
function index() {
  return (
    <div className='searchbar'>
      <div className='content'>
        <div className='category'>
          <Link to='/web' className='category_item'>Web</Link>
          <Link to='/mobile' className='category_item'>Mobile</Link>
          <div className='category_item'>Front-end</div>
          <div className='category_item'>Back-end</div>
          <div className='category_item'>Full-stack</div>
          <div className='category_item'>More</div>
        </div>
      </div>
    </div>
  )
}

export default index
