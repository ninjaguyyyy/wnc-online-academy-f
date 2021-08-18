import categoriesAPI from 'api/categoriesApi';
import promotionsAPI from 'api/promotionsApi';
import teacherApi from 'api/teacherApi';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import AddLectureModal from './components/AddLectureModal';
import AddSectionModal from './components/AddSectionModal';
import EditorShort from './ShortDescription';

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
  const [categoryValue, setCategoryValue] = useState('');
  const [promotionValue, setPromotionValue] = useState('');
  const [shortDescriptionValue, setShortDescriptionValue] = useState('');
  const [fullDescriptionValue, setFullDescriptionValue] = useState('');
  const [sections, setSections] = useState([]);
  const [selectedSectionId, setSelectedSectionId] = useState(null);

  const [isShowAddSectionModal, setIsShowAddSectionModal] = useState(false);
  const [isShowAddLectureModal, setIsShowAddLectureModal] = useState(false);

  const getContentShort = (htmlContentProp) => {
    setShortDescriptionValue(htmlContentProp);
  };
  const getContentFull = (htmlContentProp) => {
    setFullDescriptionValue(htmlContentProp);
  };
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const [{ categories }, { promotions }] = await Promise.all([
        categoriesAPI.getAll(),
        promotionsAPI.getAll(),
      ]);
      setCategories(categories);
      setPromotions(promotions);
    })();
  }, []);

  const validateFormValues = ({ avatar }) => {
    if (!shortDescriptionValue || !fullDescriptionValue || !categoryValue || !avatar) {
      return false;
    }
    return true;
  };

  const transformSections = () => sections.map(({ id, ...section }) => section);

  const handleSubmit = async (data) => {
    const isValid = validateFormValues(data);
    if (!isValid) {
      return toast.error('Please fill valid form to add new course !');
    }

    data.shortDescription = shortDescriptionValue;
    data.fullDescription = fullDescriptionValue;
    data.category = categoryValue;
    data.sections = transformSections();
    promotionValue && (data.promotion = promotionValue);

    toast.info('Loading ...');

    const uploadRes = await teacherApi.upLoad(data.avatar);
    data.avatar = uploadRes.files[0].filename;

    const res = await teacherApi.createCourses(data);
    if (res.success === true) {
      toast.dismiss();
      toast.success('Successfully create course', { autoClose: 2000 });
      history.push('/teacher/courses');
    }
  };

  const renderSections = () => {
    if (sections.length) {
      return (
        <Form.Group className="position-relative mb-3">
          {sections.map((section) => (
            <div style={{ margin: '15px 0', display: 'flex' }}>
              <Button
                variant="info"
                onClick={() => {
                  setIsShowAddLectureModal(true);
                  setSelectedSectionId(section.id);
                }}
              >
                {section.name}
              </Button>
              {section.lectures.length > 0 && (
                <div className="displayvideo">{section.lectures.length} videos</div>
              )}
            </div>
          ))}
        </Form.Group>
      );
    }
    return null;
  };

  const handleAddSection = (sectionName) => {
    const newSection = {
      name: sectionName,
      lectures: [],
      id: Math.floor(Math.random() * 100000),
    };
    setSections([...sections, newSection]);
  };

  const handleAddLecture = (lecture) => {
    const cloneSections = JSON.parse(JSON.stringify(sections));
    const updatedSections = cloneSections.map((section) => {
      const { sectionId, ...lectureToSave } = lecture;
      return section.id === sectionId
        ? { ...section, lectures: [...section.lectures, lectureToSave] }
        : { ...section };
    });

    setSections(updatedSections);
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

                <Row className="mb-4">
                  <Col sm={6}>
                    <Form.Group
                      controlId="validationFormik102"
                      className="position-relative"
                      style={{ display: 'grid' }}
                    >
                      <Form.Label>Category</Form.Label>
                      <Form.Select
                        value={categoryValue}
                        onChange={(e) => setCategoryValue(e.target.value)}
                      >
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
                      <Form.Select
                        value={promotionValue}
                        onChange={(e) => setPromotionValue(e.target.value)}
                      >
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
                  <Button variant="primary" onClick={() => setIsShowAddSectionModal(true)}>
                    Add Section
                  </Button>
                </Form.Group>
                {renderSections()}
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

      <AddSectionModal
        isShow={isShowAddSectionModal}
        onClose={() => setIsShowAddSectionModal(false)}
        onAdd={handleAddSection}
      />
      <AddLectureModal
        isShow={isShowAddLectureModal}
        onClose={() => setIsShowAddLectureModal(false)}
        onAdd={handleAddLecture}
        sectionId={selectedSectionId}
      />
    </Container>
  );
}

export default AddNewCourse;
