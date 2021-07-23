import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  InputGroup,
  Dropdown,
} from "react-bootstrap";
import teacherApi from "api/teacherApi";
import * as yup from "yup";
import { Formik } from "formik";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const schema = yup.object().shape({
  title: yup.string().required(),
  category: yup.string(),
  originPrice: yup.number().positive().required(),
  avatar: yup.string(),
  fullDescription: yup.string(),
  appliedPromotions: yup.string().required(),
  sections: yup.mixed().required(),
});
function AddNewCourse() {
  return (
    <Container>
      <div style={{ marginLeft: "20%" }}>
        <h2>Add New Course</h2>
        <Formik
          validationSchema={schema}
          onSubmit={async (data) => {
            await teacherApi
              .upLoad(data.avatar)
              .then((res) => console.log(res));
            // teacherApi.createCourses(data)
          }}
          initialValues={{
            title: "",
            category: "",
            originPrice: "",
            avatar: "",
            shortDescription: "",
            fullDescription: "",
            appliedPromotions: null,
            sections: "",
          }}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            touched,
            errors,
            setFieldValue,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group
                  as={Col}
                  md="4"
                  controlId="validationFormik101"
                  className="position-relative"
                >
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
                <Form.Group
                  as={Col}
                  md="3"
                  controlId="validationFormik102"
                  className="position-relative"
                >
                  <Form.Label>Category</Form.Label>
                  <Dropdown>
                    <Dropdown.Toggle
                      id="dropdown-button-dark-example1"
                      variant="secondary"
                      name="category"
                    >
                      Category
                    </Dropdown.Toggle>
                    <Dropdown.Menu variant="dark">
                      <Dropdown.Item
                        eventKey="2"
                        onSelect={(e) => console.log("asd", e)}
                        name="category"
                        onClick={() => handleChange}
                      >
                        Action
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="3">Another action</Dropdown.Item>
                      <Dropdown.Item eventKey="4">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Form.Group>
                <Form.Group
                  as={Col}
                  md="5"
                  controlId="validationFormikUsername2"
                >
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
              </Row>
              <Form.Group className="position-relative mb-3">
                <Form.Label>Avatar</Form.Label>
                <input
                  type="file"
                  name="avatar"
                  onChange={(event) => {
                    setFieldValue("avatar", event.target.files[0]);
                  }}
                />
              </Form.Group>
              <Row className="mb-3">
                <Form.Group
                  as={Col}
                  md="6"
                  controlId="validationFormik103"
                  className="position-relative"
                >
                  <Form.Label>Promotions</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Promotions"
                    name="appliedPromotions"
                    value={values.appliedPromotions}
                    onChange={handleChange}
                    isValid={
                      touched.appliedPromotions && !errors.appliedPromotions
                    }
                    isInvalid={!!errors.appliedPromotions}
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  md="6"
                  controlId="validationFormik104"
                  className="position-relative"
                >
                  <Form.Label>Sections</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Sections"
                    name="sections"
                    value={values.sections}
                    onChange={handleChange}
                    isValid={touched.sections && !errors.sections}
                    isInvalid={!!errors.sections}
                  />
                </Form.Group>
              </Row>

              <Form.Label>Descriptions:</Form.Label>

              <Editor
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
              >
                <Form.Control
                  type="text"
                  placeholder="Sections"
                  name="shortDescription"
                  value={values.shortDescription}
                  onChange={handleChange}
                  isValid={touched.shortDescription && !errors.shortDescription}
                  isInvalid={!!errors.shortDescription}
                />
              </Editor>
              <Button type="submit">Submit form</Button>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
}

export default AddNewCourse;
