import categoriesAPI from "api/categoriesApi";
import coursesAPI from "api/coursesApi";
import { useQuery } from "App";
import HeadingInfo from "components/Common/HeadingInfo";
import qs from "query-string";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, FormControl, InputGroup, Row, Spinner } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import { BsSearch } from "react-icons/bs";
import { useLocation, useHistory } from "react-router-dom";
import CourseCard from "../../../components/Common/CourseCard";

function CoursesList() {
  const query = useQuery();
  const location = useLocation();
  const history = useHistory();

  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);

  const [chosenCategory, setChosenCategory] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // history.push({

    //   pathname: "/dresses",
    //   search: "?color=blue",
    // });
    const queryParams = { category: chosenCategory };
    if (!chosenCategory) {
      delete queryParams.category;
    }
    const searchString = qs.stringify(queryParams);
    console.log(searchString);
    console.log(location);
    history.push({ pathname: "/web", search: `?${searchString}` });
  }, [chosenCategory]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const params = {
        category: query.get("category"),
      };
      const { success, courses } = await coursesAPI.getAll(params);
      success && setCourses(courses);
      setLoading(false);
    })();
  }, [location]);

  useEffect(() => {
    (async () => {
      const { success, categories } = await categoriesAPI.getAll();
      success && setCategories(categories);
    })();
  }, []);

  return (
    <Container>
      <Row>
        <HeadingInfo title="List of Courses" paths={[{ label: "Home", ref: "/" }, { label: "Courses" }]} />
      </Row>
      <Row>
        <Col sm={4}>
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
        <Col sm={3}>
          <InputGroup size="sm">
            <InputGroup.Text id="inputGroup-sizing-default">Category: </InputGroup.Text>
            <Form.Select value={chosenCategory} onChange={(e) => setChosenCategory(e.target.value)} style={{ paddingRight: "2.5rem" }}>
              <option value="">Default</option>
              {categories.map((category) => (
                <option value={category._id}>{category.name}</option>
              ))}
            </Form.Select>
          </InputGroup>
        </Col>
        <Col sm={2}>
          <InputGroup size="sm">
            <InputGroup.Text id="inputGroup-sizing-default">Sort by: </InputGroup.Text>
            <Form.Select style={{ paddingRight: "2.5rem" }}>
              <option value="1">Default</option>
              <option value="2">Price ➚</option>
              <option value="3">Price ➘</option>
              <option value="3">Rating ➚</option>
              <option value="3">Rating ➘</option>
            </Form.Select>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        {!loading ? (
          courses.length ? (
            courses.map((course, idx) => <CourseCard course={course} />)
          ) : (
            <h3 className="text-center mt-5">Not Have Courses</h3>
          )
        ) : (
          <div className="d-flex justify-content-center mt-5 mb-5">
            <Spinner animation="border" variant="info" size="lg" />
          </div>
        )}
      </Row>

      {courses.length ? (
        <Pagination className="mt-4" style={{ justifyContent: "center" }}>
          <Pagination.Prev />
          <Pagination.Item>{1}</Pagination.Item>
          <Pagination.Item>{2}</Pagination.Item>
          <Pagination.Item>{3}</Pagination.Item>
          <Pagination.Next />
        </Pagination>
      ) : null}
    </Container>
  );
}

export default CoursesList;
