import React from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import * as yup from 'yup';
import { Formik } from 'formik'
import teacherApi from 'api/teacherApi'
import { updateProfile } from 'store/userSlice'
const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
})
function Teacher() {
  const userInfo = useSelector(state => state.user.userInfo)
  const dispatch = useDispatch()
  return (
    <Container>
      <Formik
        validationSchema={schema}
        onSubmit={
          data => teacherApi.updateProfile(data)
            .then(res=>dispatch(updateProfile(res)))

        }
        initialValues={{
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          email: userInfo.email
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
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  isValid={touched.firstName && !errors.firstName}
                />
              </Form.Group>
              <Form.Group
                as={Col}
                md="4"
                controlId="validationFormik102"
                className="position-relative"
              >
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  isValid={touched.lastName && !errors.lastName}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group
                as={Col}
                md="8"
                className="position-relative"
              >
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  value={values.email}
                  disabled
                />
              </Form.Group>
            </Row>
            <Button type="submit">Submit form</Button>
          </Form>
        )}
      </Formik>
    </Container>
  )
}

export default Teacher
