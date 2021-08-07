import React from "react";
import "./navbar.css";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container, Row } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import "./navbar.css";
import logo from "assets/image/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { removeToken } from "store/userSlice";
import CategoriesMenu from "../CategoriesMenu";
import { BsFillPersonLinesFill } from "react-icons/bs";

function NavbarLayout(props) {
  const { token, userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleRedirectProfile = (role) => {
    role === 3 && history.push("/student");
    role === 2 && history.push("/teacher");
  };

  const renderGuestOptions = () => (
    <>
      <NavDropdown.Item>
        <Link to="/login" className="navbar__link">
          Login
        </Link>
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item>
        <Link to="/register" className="navbar__link">
          Register
        </Link>
      </NavDropdown.Item>
    </>
  );

  const renderUserOptions = () => (
    <>
      <NavDropdown.Item onClick={() => handleRedirectProfile(userInfo.role)}>Profile</NavDropdown.Item>
      <NavDropdown.Divider />
      {userInfo.role === 2 && renderTeacherUserOptions()}
      {userInfo.role === 3 && renderStudentUserOptions()}
      <NavDropdown.Item
        onClick={() => {
          history.push("/dashboard");
          dispatch(removeToken());
        }}
      >
        Log out
      </NavDropdown.Item>
    </>
  );

  const renderTeacherUserOptions = () => (
    <>
      <NavDropdown.Item onClick={() => history.push("/teacher/courses")}>My Courses</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item onClick={() => history.push("/teacher/courses/add-course")}>Add Course</NavDropdown.Item>
      <NavDropdown.Divider />
    </>
  );

  const renderStudentUserOptions = () => (
    <>
      <NavDropdown.Item onClick={() => history.push("/student/wishlist")}>Wishlist</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item onClick={() => history.push("/student/my-courses")}>My Courses</NavDropdown.Item>
      <NavDropdown.Divider />
    </>
  );

  return (
    <Navbar bg="light" expand="lg" className="navbar__custom">
      <Container>
        <Navbar.Brand>
          <img src={logo} alt="logo" className="navbar__logo" />
          <Link to="/dashboard" className="navbar__link">
            WNC Academy
          </Link>
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav" className="navbar__right">
          <Nav className="mr-auto navbar__search ">
            <CategoriesMenu />
            <Form inline style={{ width: "100%" }} className="ml-4 d-flex">
              <FormControl type="text" placeholder="Search" className="mr-sm-2" style={{ width: "75%" }} />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Nav>

          <NavDropdown
            title={<BsFillPersonLinesFill fontSize="30px" color="#0d5398" />}
            id="basic-nav-dropdown"
            className="navbar__userIcon"
          >
            {!token && renderGuestOptions()}
            {token && renderUserOptions()}
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarLayout;
