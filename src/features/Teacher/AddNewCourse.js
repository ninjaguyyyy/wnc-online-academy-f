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
  DropdownButton
} from "react-bootstrap";
import { toast } from "react-toastify";
import teacherApi from "api/teacherApi";
import * as yup from "yup";
import { Formik } from "formik";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch, useSelector } from "react-redux";
import { categories,promotions } from "store/teacherSlice";
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
  const [show, setShow] = useState(false);
  const [short, setshort] = useState("");
  const [long, setLong] = useState("");
  const [category, setCategory] = useState([]);
  const [promotion, setPromotion] = useState(null)
  const dispatch = useDispatch();
  const ListCategories = useSelector((state) => state.teacher.categories)
  const ListPromotions = useSelector((state) => state.teacher.promotions)
  useEffect(() => {
    teacherApi.categoriesTree().then((res) => {
      if (res.success === true) {
        if (res.categories) {
          dispatch(categories(res.categories));
        }
      }
    })
    teacherApi.promotions().then(res=>{
      if(res.success === true){
        dispatch(promotions(res.promotions))
      }
    })
  }, [dispatch])
  const popover = (
    <Popover id="popover-positioned-bottom">
      {ListCategories != null &&
        ListCategories.map((item, i) => (
          <Accordion>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} eventKey="menu">
                  <i className="fas fa-plus " />
                </Accordion.Toggle>
                <Button
                  onClick={(e) => {
                    setCategory(item);
                    setShow(!show);
                  }}
                  value={item._id}
                  style={{ marginLeft: "5px" }}
                >
                  {item.name}
                </Button>
              </Card.Header>
              <Accordion.Collapse eventKey="menu">
                <Card.Body>
                  <Accordion style={{ display: "inline-grid" }}>
                    {item.child.map((course, i) => (
                      <Button
                        variant="secondary"
                        key={i}
                        style={{ marginBottom: "10px" }}
                        onClick={(e) => {
                          setCategory(course);
                          setShow(!show);
                        }}
                        value={course.parent + "." + course._id}
                      >
                        {course.name}
                      </Button>
                    ))}
                  </Accordion>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        ))}
    </Popover>
  )
  const SelectPromotion= (data)=>{
    setPromotion(ListPromotions.filter(e=>e._id===data)[0])
  }
  return (
    <Container>
      <div style={{ marginLeft: "20%" }}>
        <h2>Add New Course</h2>
        <Formik
          validationSchema={schema}
          onSubmit={async (data) => {
            data.category = category._id
            data.shortDescription = short
            data.fullDescription = long
            data.promotion=promotion
            if (data.avatar) {
              const uploadRes = await teacherApi.upLoad(data.avatar);
              data.avatar = uploadRes.files[0].filename;
            }
            await teacherApi.createCourses(data).then(res=>{
              if(res.success === true){
                toast.success("Successfully create cousrse")
              }
            });
          }}
          initialValues={{
            title: "",
            category: "",
            originPrice: "",
            avatar: "",
            shortDescription: "",
            fullDescription: "",
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
                  style={{ display: "grid" }}
                >
                  <Form.Label>Category</Form.Label>
                  {ListCategories != null && (
                    <OverlayTrigger
                      show={show}
                      trigger="click"
                      placement="bottom"
                      overlay={popover}
                    >
                      <Button variant="success" onClick={() => setShow(!show)}>
                        {category.name ? category.name : "Category"}
                      </Button>
                    </OverlayTrigger>
                  )}
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
                    {ListPromotions!=null&&
                    <DropdownButton variant="success" id="dropdown-basic" 
                      title={promotion?promotion.title:'Promotions'} 
                      onSelect={SelectPromotion} style={{ width:'100%'}
                    }>
                      {ListPromotions.map((e,i)=>(
                        <Dropdown.Item eventKey={e._id} key={i}>
                          {e.title}
                        </Dropdown.Item>
                      ))}
                    </DropdownButton>}
                </Form.Group>
              </Row>
              <Form.Label> Short Descriptions:</Form.Label>
              <Editor
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onChange={(e) => setshort(e.blocks[0].text)}
              >
                <Form.Control
                  type="text"
                  placeholder="shortDescription"
                  name="shortDescription"
                  value={short}
                  onChange={handleChange}
                  isValid={touched.shortDescription && !errors.shortDescription}
                  isInvalid={!!errors.shortDescription}
                />
              </Editor>
              <Form.Label> Full Descriptions:</Form.Label>
              <Editor
                value={values.fullDescription}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onChange={(e) => setLong(e.blocks[0].text)}
              >
                <Form.Control
                  type="text"
                  placeholder="fullDescription"
                  name="fullDescription"
                  value={long}
                  onChange={handleChange}
                  isValid={touched.fullDescription && !errors.fullDescription}
                  isInvalid={!!errors.fullDescription}
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
