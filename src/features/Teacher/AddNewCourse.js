import React, {useState, useEffect} from 'react'
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  InputGroup,
  Dropdown,
  DropdownButton,

} from "react-bootstrap";
import teacherApi from "api/teacherApi";
import * as yup from "yup";
import { Formik } from "formik";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch,useSelector } from 'react-redux';
import { categories } from 'store/teacherSlice'
const schema = yup.object().shape({
  title: yup.string().required(),
  category: yup.string(),
  originPrice: yup.number().positive().required(),
  avatar: yup.string(),
  fullDescription: yup.string(),
  appliedPromotions: yup.string().required(),
  // sections: yup.mixed(),
  shortDescription:yup.string(),
  longDescription:yup.string()
})
function AddNewCourse() {
  const [short, setshort] = useState('')
  const [long, setLong] = useState('')
  const [category, setCategory] = useState([])
  const dispatch = useDispatch()
  const categoriesSelect = e=>{
    console.log(ListCategories.filter(item=>item._id===e))
    setCategory(ListCategories.filter(item=>item._id===e)[0])
  }
  const ListCategories= useSelector(state=>state.teacher.categories)
  useEffect(() => {
    teacherApi.categoriesTree().then(res=>{
       if(res.success===true) {
        if(res.categories){
          dispatch(categories(res.categories))
        }
      }
    })
  }, [dispatch])
  return (
    <Container>
      <div style={{ marginLeft: "20%" }}>
        <h2>Add New Course</h2>
        <Formik
          validationSchema={schema}
          onSubmit={async (data) => {
            data.category=category._id
            data.shortDescription=short
            data.fullDescription=long
            await teacherApi
              .upLoad(data.avatar)
              .then((res) =>{
                if(res.success===true) {
                  data.avatar=res.files[0].filename
                  console.log('data',data)
                  teacherApi.createCourses(data)
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
            appliedPromotions: null,
            // sections: "",
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
                {ListCategories!=null&&
                <DropdownButton 
                  id='dropdown-basic-button'
                  title={category.name?category.name:'Category'}
                  md="3"
                  onSelect={categoriesSelect}
                >
                  {ListCategories.map(item=>{
                    return(
                      <Dropdown.Item eventKey={item._id}>
                        {item.name}
                      </Dropdown.Item>
                    )
                  })}
                </DropdownButton>}
                 
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
                {/* <Form.Group
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
                </Form.Group> */}
              </Row>
              <Form.Label> Short Descriptions:</Form.Label>
              <Editor
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onChange={e=>setshort(e.blocks[0].text)}
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
                onChange={e=>setLong(e.blocks[0].text)}
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
