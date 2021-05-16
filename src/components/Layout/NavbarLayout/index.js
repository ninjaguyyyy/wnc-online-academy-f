import React from 'react'
import { Navbar, Icon, NavItem } from 'react-materialize'
import GuestUSer from './GuestUser'
import './navbar.css'
import { Link } from 'react-router-dom'
function NavbarLayout() {
  return (
    <div>
      <Navbar
        className='navbar'
        alignLinks="right"
        centerChildren
        brand={
          <div className='logo'>
            <Icon style={{ fontSize: '30px' }}> laptop</Icon>
            <Link to='/dashboard' >Online Academy</Link>
          </div>

        }
      >
        <Link to='/teacher' >
          For Teacher
        </Link>
        <Link to='/student' >
          For Student
        </Link>
        <NavItem >
          <div style={{ display: 'flex' }}>
            <Icon>shop</Icon>
            <span>5</span>
          </div>
        </NavItem>
        <GuestUSer />
      </Navbar>
    </div>
  )
}

export default NavbarLayout
