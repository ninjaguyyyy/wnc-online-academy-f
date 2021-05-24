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
function NavbarLayout() {
  return (
    <Navbar bg="light" expand="lg" className='navbar__custom'>
      <Navbar.Brand>
        <img src={logo} alt='logo' className='navbar__logo' />
        <Link to='/dashboard' className='navbar__link'>Online Academy</Link>
      </Navbar.Brand>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto" >
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2 navbar__search" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Nav>
        <Nav.Link>
          <Link to='/login' className='navbar__link'>Login</Link>
        </Nav.Link>
        <Nav.Link>
          <Link to='/register' className='navbar__link'>Register</Link>
        </Nav.Link>
        <NavDropdown title="User" id="basic-nav-dropdown" className='navbar__userIcon'>
          <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.3">Log out</NavDropdown.Item>
        </NavDropdown>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarLayout;
