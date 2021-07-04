import React from "react";
import "./navbar.css";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './navbar.css'
import logo from 'assets/image/logo.png'
import { useSelector } from 'react-redux'
function NavbarLayout() {
  const { signIn } = useSelector((state) => state.sign)
  return (
    <Navbar bg="light" expand="lg" className='navbar__custom'>
      <Navbar.Brand>
        <img src={logo} alt='logo' className='navbar__logo' />
        <Link to='/dashboard' className='navbar__link'>Online Academy</Link>
      </Navbar.Brand>
      <Navbar.Collapse id="basic-navbar-nav" className='navbar__right'>
        <Nav className="mr-auto navbar__search" >
          <Form inline style={{ width: '100%' }}>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" style={{ width: '85%' }} />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Nav>
        {!signIn?.accessToken&&<Link to='/login' className='navbar__link'>Login</Link>}
        {!signIn?.accessToken&&<Link to='/register' className='navbar__link'>Register</Link>}
        {signIn?.accessToken&&<NavDropdown title="User" id="basic-nav-dropdown" className='navbar__userIcon'>
          <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.3">Log out</NavDropdown.Item>
        </NavDropdown>}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarLayout;
