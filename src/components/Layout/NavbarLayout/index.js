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
import { Link,useHistory } from 'react-router-dom'
import './navbar.css'
import logo from 'assets/image/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { removeToken } from "store/userSlice";
function NavbarLayout(props) {
  const { token,userInfo} = useSelector(state => state.user)
  const dispatch= useDispatch()
  const history= useHistory()
  const checkRole= (role) =>{
    if(role===3)
      history.push('/student')
    if(role===2)
      history.push('/teacher')
    if(role===1)
      history.push('/admin')
  }
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
        {!token&&<Link to='/login' className='navbar__link' style={{ marginRight:'70px'}}>Login</Link>}
        {!token&&<Link to='/register' className='navbar__link'>Register</Link>}
        {token&&<NavDropdown title={userInfo.userName} id="basic-nav-dropdown" className='navbar__userIcon'>
          <NavDropdown.Item onClick={()=>checkRole(userInfo.role)}>Profile</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={()=>{
            history.push('/dashboard')
            dispatch(removeToken())
          }}>
            Log out
          </NavDropdown.Item>
        </NavDropdown>}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarLayout;
