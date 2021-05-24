import React from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'
function UserIcon() {
  return (
    <div style={{ display: 'flex' }}>
        <Link to='/login'>Login</Link>
        <Link to='/signup'>Sign up</Link>
    </div>

  )
}

export default UserIcon
