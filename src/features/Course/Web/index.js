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

const PER_PAGE = 2;

function CoursesList() {
  const query = useQuery();
  const location = useLocation();
  const history = useHistory();

  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);

  const getInitialChosenCategory = () => query.get("category") || "";
  const [chosenCategory, setChosenCategory] = useState(getInitialChosenCategory());
  const [sortValue, setSortValue] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCourses, setTotalCourses] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const queryParams = { category: chosenCategory, sort: sortValue, page, perPage: PER_PAGE };

    if (!chosenCategory) {
      delete queryParams.category;
    }

    if (!sortValue) {
      delete queryParams.sort;
    }

    const searchString = qs.stringify(queryParams);
    history.push({ pathname: "/web", search: `?${searchString}` });
  }, [chosenCategory, sortValue, page]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const params = {
        category: query.get("category"),
        sort: query.get("sort"),
        page: query.get("page"),
        perPage: query.get("perPage"),
      };
      const { success, courses, totalCourses, totalPages } = await coursesAPI.getAll(params);
      success && setCourses(courses);
      setTotalCourses(totalCourses);
      setTotalPages(totalPages);
      setLoading(false);
    })();
  }, [location]);

  useEffect(() => {
    (async () => {
      const { success, categories } = await categoriesAPI.getAll();
      success && setCategories(categories);
    })();
  }, []);

  const renderPagingItem = () => {
    let items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item key={number} active={number === page} onClick={() => setPage(number)}>
          {number}
        </Pagination.Item>
      );
    }
    return items;
  };

  return (
    <Container>
      <Row>
        <HeadingInfo title="List of Courses" paths={[{ label: "Home", ref: "/" }, { label: "Courses" }]} />
      </Row>
      <Row>
        <Col sm={4}>
          <Form.Text className="text-muted ml-3">Having {totalCourses} courses available for you</Form.Text>
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
              <option value="">All Courses</option>
              {categories.map((category) => (
                <option value={category._id}>{category.name}</option>
              ))}
            </Form.Select>
          </InputGroup>
        </Col>
        <Col sm={2}>
          <InputGroup size="sm">
            <InputGroup.Text id="inputGroup-sizing-default">Sort by: </InputGroup.Text>
            <Form.Select value={sortValue} onChange={(e) => setSortValue(e.target.value)} style={{ paddingRight: "2.5rem" }}>
              <option value="">Default</option>
              <option value="price_asc">Price ➚</option>
              <option value="price_desc">Price ➘</option>
              <option value="rating_asc">Rating ➚</option>
              <option value="rating_desc">Rating ➘</option>
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
          <Pagination.Prev
            onClick={() => {
              const prevPage = page - 1 < 1 ? 1 : page - 1;
              setPage(prevPage);
            }}
          />
          <Pagination>{renderPagingItem()}</Pagination>
          <Pagination.Next
            onClick={() => {
              const nextPage = page + 1 > totalPages ? totalPages : page + 1;
              setPage(nextPage);
            }}
          />
        </Pagination>
      ) : null}
    </Container>
  );
}

export default CoursesList;
