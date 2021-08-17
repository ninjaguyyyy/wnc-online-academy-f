import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, InputGroup, Modal } from 'react-bootstrap';
import { course, setLoading } from 'store/userSlice';
import { setSections, sections, addLecture, selectChapter } from 'store/teacherSlice';
import { toast } from 'react-toastify';
import teacherApi from 'api/teacherApi';
import * as yup from 'yup';
import { Formik } from 'formik';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import categoriesAPI from 'api/categoriesApi';
import promotionsAPI from 'api/promotionsApi';
import { useHistory } from 'react-router-dom';
import EditorShort from './ShortDescription';
import { useDispatch, useSelector } from 'react-redux';
import loading from 'assets/image/loading.svg';
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
  const dispatch = useDispatch();
  const SelectChapter = useSelector((state) => state.teacher.selectChapter);
  const [categories, setCategories] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [categoryValue, setCategoryValue] = useState('');
  const [promotionValue, setPromotionValue] = useState('');
  const [shortDescriptionValue, setShortDescriptionValue] = useState('');
  const [fullDescriptionValue, setFullDescriptionValue] = useState('');
  const [show1, setShow1] = useState(false);
  const [show, setShow] = useState(false);
  const [chapter, setChapter] = useState('');
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const [video, setVideo] = useState(null);

  const [preview, setPreview] = useState(false);

  const [title, setTitle] = useState('');
  const getContentShort = (htmlContentProp) => {
    setShortDescriptionValue(htmlContentProp);
  };
  const getContentFull = (htmlContentProp) => {
    setFullDescriptionValue(htmlContentProp);
  };
  const Sections = useSelector((state) => state.teacher.sections);
  const isLoading = useSelector((state) => state.user.loading);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const [{ categories }, { promotions }] = await Promise.all([categoriesAPI.getAll(), promotionsAPI.getAll()]);
      setCategories(categories);
      setPromotions(promotions);
    })();
  }, []);

  const handleSubmit = async (data) => {
    data.shortDescription = shortDescriptionValue;
    data.fullDescription = fullDescriptionValue;
    toast.info('Loading ...', { autoClose: 3000 });
    data.category = categoryValue;
    data.sections = Sections;
    console.log(data);
    promotionValue && (data.promotion = promotionValue);
    if (data.avatar) {
      const uploadRes = await teacherApi.upLoad(data.avatar);
      data.avatar = uploadRes.files[0].filename;
    }
    const res = await teacherApi.createCourses(data);
    if (res.success === true) {
      toast.success('Successfully create course');
      history.push('/teacher/courses');
    }
  };
  if (!isLoading)
    return (
      <Container>
        <Row>
          <div>
            <h2>Add New Course</h2>
            <Formik
              validationSchema={schema}
              onSubmit={handleSubmit}
              initialValues={{
                title: '',
                originPrice: '',
                avatar: '',
                shortDescription: '',
                fullDescription: '',
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
                  <Modal show={show1} onHide={handleClose1}>
                    <Modal.Header closeButton>
                      <Modal.Title>Chapter name:</Modal.Title>
                    </Modal.Header>
                    <Form.Group as={Col} md="12" className="position-relative">
                      <Form.Control type="text" name="section" onChange={(e) => setChapter(e.target.value)} />
                    </Form.Group>

                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose1}>
                        Close
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => {
                          dispatch(setSections(chapter));
                          handleClose1();
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
                      <Form.Group as={Col} md="12" controlId="validationFormik101" className="position-relative">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" name="title" onChange={(e) => setTitle(e.target.value)} />
                        <Form.Check
                          className="mt20"
                          type="checkbox"
                          id={`default-checkbox`}
                          label={`Please check this if video is FREE TO VIEW`}
                          onChange={(e) => setPreview(e.target.checked)}
                        />
                      </Form.Group>

                      <Form.Group as={Col} md="12" controlId="validationFormikUsername2" style={{ marginTop: '20px' }}>
                        <Form.Label style={{ marginRight: '10px' }}>Videos:</Form.Label>
                        <input
                          type="file"
                          name="avatar"
                          multiple
                          onChange={(event) => {
                            setVideo(event.target.files);
                          }}
                        />
                      </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => {
                          handleClose();
                          dispatch(setLoading(true));
                          teacherApi.upLoad(video[0]).then((res) => {
                            if (res.success && res.files.length > 0) {
                              let payload = {
                                title: title,
                                video: res.files,
                                id: SelectChapter,
                                isPreview: preview,
                              };
                              dispatch(addLecture(payload));
                              dispatch(setLoading(false));
                            }
                          });
                        }}
                      >
                        Save Lecture
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  <Row className="mb-4">
                    <Col sm={6}>
                      <Form.Group controlId="validationFormik102" className="position-relative" style={{ display: 'grid' }}>
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
                  <Form.Group className="position-relative mb-3">
                    <Button variant="primary" onClick={handleShow1}>
                      Add Chapter
                    </Button>
                  </Form.Group>
                  {Sections.length > 0 && (
                    <Form.Group className="position-relative mb-3">
                      {Sections.map((e, i) => (
                        <div style={{ margin: '15px 0', display: 'flex' }}>
                          <Button
                            variant="info"
                            onClick={() => {
                              handleShow();
                              dispatch(selectChapter(i));
                            }}
                          >
                            {e.name}
                          </Button>
                          {e.lectures.length > 0 && <div className="displayvideo">{e.lectures.length} videos</div>}
                        </div>
                      ))}
                    </Form.Group>
                  )}
                  <Row className="mb-3">
                    <Col sm={6}>
                      <Form.Group className="position-relative mb-3">
                        <Form.Label>Avatar</Form.Label>
                        <br />
                        <input
                          type="file"
                          name="avatar"
                          onChange={(event) => {
                            setFieldValue('avatar', event.target.files[0]);
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
  else
    return (
      <div className="userloading">
        <img src={loading} className="loading" alt="loading" />
      </div>
    );
}

export default AddNewCourse;
