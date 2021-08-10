import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  InputGroup,
  OverlayTrigger,
  Popover,
  Accordion,
  Card,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import loading from "assets/image/loading.svg";

import { toast } from "react-toastify";
import teacherApi from "api/teacherApi";
import * as yup from "yup";
import { Formik } from "formik";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch, useSelector } from "react-redux";
import { categories, promotions } from "store/teacherSlice";
import categoriesAPI from "api/categoriesApi";
import promotionsAPI from "api/promotionsApi";
import { useHistory } from "react-router-dom";
import EditorShort from './ShortDescription'
const schema = yup.object().shape({
  title: yup.string().required(),
  category: yup.string(),
  originPrice: yup.number().positive().required(),
  avatar: yup.string(),
  fullDescription: yup.string(),
  // appliedPromotions: yup.string().required(),
  shortDescription: yup.string(),
  longDescription: yup.string(),
});

function AddNewCourse() {
  const [categories, setCategories] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [categoryValue, setCategoryValue] = useState("");
  const [promotionValue, setPromotionValue] = useState("");
  const [shortDescriptionValue, setShortDescriptionValue] = useState("");
  const [fullDescriptionValue, setFullDescriptionValue] = useState("");
  const getContentShort = (htmlContentProp) => {
    setShortDescriptionValue(htmlContentProp);
  }
  const getContentFull = (htmlContentProp) => {
    setFullDescriptionValue(htmlContentProp);
  }
    
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const [{ categories }, { promotions }] = await Promise.all([categoriesAPI.getAll(), promotionsAPI.getAll()]);
      setCategories(categories);
      setPromotions(promotions);
    })();
  }, []);

  const handleSubmit = async (data) => {
    data.shortDescription=shortDescriptionValue
    data.fullDescription=fullDescriptionValue
    toast.info("Loading ...", { autoClose: 3000 });
    data.category = categoryValue;
    promotionValue && (data.promotion = promotionValue);
    if (data.avatar) {
      const uploadRes = await teacherApi.upLoad(data.avatar);
      data.avatar = uploadRes.files[0].filename;
    }
    const res = await teacherApi.createCourses(data);
    if (res.success === true) {
      toast.success("Successfully create course");
      history.push("/teacher/courses");
    }
  };

  return (
    <Container>
      <Row>
        <div>
          <h2>Add New Course</h2>
          <Formik
            validationSchema={schema}
            onSubmit={handleSubmit}
            initialValues={{
              title: "",
              originPrice: "",
              avatar: "",
              shortDescription: "",
              fullDescription: "",
            }}
          >
            {({ handleSubmit, handleChange, values, touched, errors, setFieldValue }) => (
              <Form noValidate onSubmit={(data) => handleSubmit(data)}>
                <Row className="mb-4 mt-5">
                  <Col sm={6}>
                    <Form.Group controlId="validationFormik101" className="position-relative">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type="text"
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                        isValid={touched.title && !errors.title}
                        isInvalid={!!errors.title}
                      />
                    </Form.Group>
                  </Col>

                  <Col sm={6}>
                    <Form.Group controlId="validationFormikUsername2">
                      <Form.Label>Origin Price</Form.Label>
                      <InputGroup hasValidation>
                        <Form.Control
                          type="number"
                          placeholder="Origin Price"
                          aria-describedby="inputGroupPrepend"
                          name="originPrice"
                          value={values.originPrice}
                          onChange={handleChange}
                          isValid={touched.originPrice && !errors.originPrice}
                          isInvalid={!!errors.originPrice}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-4">
                  <Col sm={6}>
                    <Form.Group controlId="validationFormik102" className="position-relative" style={{ display: "grid" }}>
                      <Form.Label>Category</Form.Label>
                      <Form.Select value={categoryValue} onChange={(e) => setCategoryValue(e.target.value)}>
                        <option value="">Default select</option>
                        {categories.map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.name}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group className="position-relative">
                      <Form.Label>Promotion</Form.Label>
                      <Form.Select value={promotionValue} onChange={(e) => setPromotionValue(e.target.value)}>
                        <option value="">Default select</option>
                        {promotions.map((promotion) => (
                          <option key={promotion._id} value={promotion._id}>
                            {promotion.title} - Giảm {promotion.discount * 100}%
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col sm={6}>
                    <Form.Group className="position-relative mb-3">
                      <Form.Label>Avatar</Form.Label>
                      <br />
                      <input
                        type="file"
                        name="avatar"
                        onChange={(event) => {
                          setFieldValue("avatar", event.target.files[0]);
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Label> Short Descriptions:</Form.Label>
                    <EditorShort getContent={getContentShort} />
                  </Col>
                </Row>

                <Form.Label> Full Descriptions:</Form.Label>
                <EditorShort getContent={getContentFull} />
                
                <Button type="submit">Submit form</Button>
              </Form>
            )}
          </Formik>
        </div>
      </Row>
    </Container>
  );
}

export default AddNewCourse;
