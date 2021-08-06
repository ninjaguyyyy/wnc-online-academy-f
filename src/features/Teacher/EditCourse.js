import React, { useEffect, useState } from "react";
import authApi from "api/authUser";
import { useDispatch, useSelector } from "react-redux";
import { course, setLoading } from "store/userSlice";
import {setSections,sections,addLecture,selectChapter } from 'store/teacherSlice'
import loading from "assets/image/loading.svg";
import {
  Container,
  Form,
  Row,
  Col,
  InputGroup,
  Button,
  Modal,
} from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import { Formik } from "formik";
import * as yup from "yup";
import teacherApi from 'api/teacherApi';

const schema = yup.object().shape({
  title: yup.string().required(),
  originPrice: yup.number().positive().required(),
  fullDescription: yup.string(),
  shortDescription: yup.string(),
  longDescription: yup.string(),
});
function EditCourse(props) {
  const dispatch = useDispatch();
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const [show, setShow] = useState(false);
  const [chapter, setChapter] = useState('');
  const [title, setTitle] = useState('');
  const [video, setVideo] = useState(null);
  const [short, setShort] = useState("");
  const [long, setLong] = useState("");
  const Course = useSelector((state) => state.user.course);
  const isLoading = useSelector((state) => state.user.loading);
  const Sections = useSelector((state) => state.teacher.sections);
  const SelectChapter = useSelector((state) => state.teacher.selectChapter);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    if (Course == null) {
      dispatch(setLoading(true));
      authApi.getCourseById(props.match.params.id).then((res) => {
        if (res.success === true) {
          dispatch(setLoading(false));
          dispatch(course(res.course));
          dispatch(sections(res.course.sections))
          setShort(res.course.shortDescription)
          setLong(res.course.fullDescription)
        }
      });
    }
    else{
      setShort(Course.shortDescription)
      setLong(Course.fullDescription)
    }
  }, [Course, props.match.params.id, dispatch]);
  return (
    <div>
      {!isLoading && Course != null && (
        <Container>
          <h2>Edit Course</h2>
          <Formik
            validationSchema={schema}
            onSubmit={async (data) => {
              data.shortDescription = short
              data.fullDescription = long
              data.sections=Sections
              dispatch(setLoading(true))
              teacherApi.editCourses(data,Course._id).then(res=>{
                console.log(res)
                dispatch(setLoading(false))
                dispatch(course(res.course))
              })
            }}
            initialValues={{
              title: Course.title,
              originPrice: Course.originPrice,
              sections: null,
              shortDescription: Course.shortDescription,
              fullDescription: Course.fullDescription,
            }}
          >
            {({
              handleSubmit,
              handleChange,
              values,
              touched,
              errors,
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
                  <Button variant="primary" onClick={handleShow1}>
                    Add Chapter
                  </Button>
                </Form.Group>
                {Sections.length>0&&
                <Form.Group className="position-relative mb-3">
                  {Sections.map((e,i)=>(
                    <div style={{ margin:'15px 0'}}>
                      <Button variant="info" 
                        onClick={()=>{
                          handleShow()
                          dispatch(selectChapter(i))
                        }
                      }
                      >
                        {e.name}
                      </Button>
                    </div>
                  ))}
                </Form.Group>}
                <Modal show={show1} onHide={handleClose1}>
                  <Modal.Header closeButton>
                    <Modal.Title>Chapter name:</Modal.Title>
                  </Modal.Header>
                  <Form.Group as={Col} md="12" className="position-relative">
                    <Form.Control
                      type="text"
                      name="section"
                      onChange={(e) => setChapter(e.target.value)}
                    />
                  </Form.Group>

                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose1}>
                      Close
                    </Button>
                    <Button variant="primary" 
                      onClick={()=>{
                        dispatch(setSections(chapter))
                        handleClose1()
                      }}
                    >
                      Save Chapter
                    </Button>
                  </Modal.Footer>
                </Modal>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Lecture detail</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form.Group
                      as={Col}
                      md="12"
                      controlId="validationFormik101"
                      className="position-relative"
                    >
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type="text"
                        name="title"
                        onChange={e=>setTitle(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group
                      as={Col}
                      md="12"
                      controlId="validationFormikUsername2"
                    >
                      <Form.Label style={{ marginRight: "10px" }}>
                        Videos:
                      </Form.Label>
                      <input
                        type="file"
                        name="avatar"
                        multiple
                        onChange={(event) => {
                          setVideo(event.target.files)
                        }}
                      />
                    </Form.Group>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="primary" 
                      onClick={()=>{
                        handleClose()
                        dispatch(setLoading(true))
                        teacherApi.upLoad(video).then(res=>{
                          if(res.success&& res.files.length>0){
                            let payload={
                              title:title,
                              video:res.files,
                              id:SelectChapter
                            }
                            dispatch(addLecture(payload))
                            dispatch(setLoading(false))
                          }
                        })
                      }
                      }
                    >
                      Save Lecture 
                    </Button>
                  </Modal.Footer>
                </Modal>
                <Form.Label> Short Descriptions:</Form.Label>
                <Editor
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  value={values.shortDescription}
                  onChange={(e) => setShort(e.blocks[0].text)}
                >
                  <Form.Control
                    type="text"
                    placeholder="shortDescription"
                    name="shortDescription"
                    value={short}
                    onChange={handleChange}
                    isValid={
                      touched.shortDescription && !errors.shortDescription
                    }
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
        </Container>
      )}
      {isLoading && (
        <div className="userloading">
          <img src={loading} className="loading" alt="loading" />
        </div>
      )}
    </div>
  );
}
export default EditCourse;
