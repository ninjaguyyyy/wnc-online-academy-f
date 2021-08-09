import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Button, Tabs, Tab, Container, Card, Row, Col } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import "./detailCourse.css";
import authApi from "api/authUser";
import { course } from "store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { ApiUrl } from "api/authUser";
import loading from "assets/image/loading.svg";
import userAPi from "api/userApi";
import { toast } from "react-toastify";
import coursesAPI from "api/coursesApi";
import DynamicBreadcrumb from "components/Common/DynamicBreadcrumb";
import TabsInfo from "./components/TabsInfo";
import CardPaymentInfo from "./components/CardPaymentInfo";
import RatingStars from "components/Common/RatingStars";

function CourseDetail() {
  const dispatch = useDispatch();
  let { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState(null);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      // setLoading(true);
      const { success, course } = await coursesAPI.getById(id);
      success && setCourse(course);
      // setLoading(false);
    })();
  }, []);

  const token = useSelector((state) => state.user.token);

  return (
    <Container>
      <Row className="mb-4">
        <DynamicBreadcrumb paths={[{ label: "Home", ref: "/" }, { label: "Courses", ref: `/web` }, { label: course?.title }]} />
      </Row>
      {course && (
        <Row>
          <Col sm={8} style={{ paddingRight: "150px" }}>
            <h2>{course.title}</h2>
            <div className="short-des mt-3 mb-4 ">{course.shortDescription}</div>
            <div className="info mb-5">
              <img
                className="rounded-full"
                src={`https://i.pravatar.cc/350?u=${course.lecturer.userName}`}
                width="70"
                height="70"
                alt="lecturer"
              />
              <div className="lecturer">
                <div className="font-weight-bold">Created by</div>
                <div className="info-value">{course.lecturer.firstName + " " + course.lecturer.lastName}</div>
              </div>
              <div>
                <div className="font-weight-bold">Category</div>
                <div className="info-value">{course.category.name}</div>
              </div>
              <div>
                <div className="font-weight-bold">Reviews</div>
                <div className="info-value d-flex align-items-center">
                  <RatingStars point={course.rating} color="#FFC78B" size={16} className="mr-1" />
                  <div className="ml-1" style={{ fontSize: "14px" }}>
                    {course.rating} ({course.feedbacks.length} reviews)
                  </div>
                </div>
              </div>
            </div>
            <TabsInfo course={course} />
          </Col>
          <Col sm={4}>
            <CardPaymentInfo course={course} />
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default CourseDetail;
{
  /* <img src={loading} className="loading" alt="loading" /> */
}
