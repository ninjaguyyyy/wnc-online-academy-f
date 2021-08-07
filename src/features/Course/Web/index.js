import React, { useState, useEffect } from "react";
import { Container, Card, Row, Col, Tab, Nav, Form, InputGroup, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import no1 from "assets/image/5.jpg";
import { BsSearch } from "react-icons/bs";
import Pagination from "react-bootstrap/Pagination";
import coursesAPI from "api/coursesApi";
import { useQuery } from "App";
import CourseCard from "../../../components/Common/CourseCard";
import HeadingInfo from "components/Common/HeadingInfo";

function CoursesList() {
  const query = useQuery();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    (async () => {
      const params = {
        category: query.get("category"),
      };
      const { success, courses } = await coursesAPI.getAll(params);
      success && setCourses(courses);
    })();
  }, []);

  return (
    <Container>
      <Row>
        <HeadingInfo title="Courses by Categories" paths={[{ label: "Home", ref: "/" }, { label: "Courses" }]} />
      </Row>
      <Row>
        <Col sm={5}>
          <Form.Text className="text-muted ml-3">Showing 1–9 of 10 courses available for you</Form.Text>
        </Col>
        <Col sm={3}>
          <InputGroup size="sm" className="mb-3">
            <FormControl placeholder="Search courses ..." aria-label="Recipient's username" aria-describedby="basic-addon2" />
            <Button variant="outline-secondary" id="button-addon2">
              <BsSearch />
            </Button>
          </InputGroup>
        </Col>
        <Col sm={2}>
          <InputGroup size="sm">
            <InputGroup.Text id="inputGroup-sizing-default">Sort Price: </InputGroup.Text>
            <Form.Select style={{ paddingRight: "2.5rem" }}>
              <option value="1">Default</option>
              <option value="2">Ascending</option>
              <option value="3">Descending</option>
            </Form.Select>
          </InputGroup>
        </Col>
        <Col sm={2}>
          <InputGroup size="sm">
            <InputGroup.Text id="inputGroup-sizing-default">Sort Price: </InputGroup.Text>
            <Form.Select style={{ paddingRight: "2.5rem" }}>
              <option value="1">Default</option>
              <option value="2">Ascending</option>
              <option value="3">Descending</option>
            </Form.Select>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        {courses.map((course, idx) => (
          <CourseCard course={course} />
        ))}
        {!courses.length && <h3 className="text-center mt-5">Not Have Courses</h3>}
      </Row>

      {courses.length && (
        <Pagination className="mt-4" style={{ justifyContent: "center" }}>
          <Pagination.Prev />
          <Pagination.Item>{1}</Pagination.Item>
          <Pagination.Item>{2}</Pagination.Item>
          <Pagination.Item>{3}</Pagination.Item>
          <Pagination.Next />
        </Pagination>
      )}
    </Container>
  );
}

export default CoursesList;
