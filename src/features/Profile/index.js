import React from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import * as yup from 'yup';
import { Formik } from 'formik'
import teacherApi from 'api/teacherApi'
import { updateProfile,changePassword } from 'store/userSlice'
import  authApi  from 'api/authUser'
const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
})
const schema1 = yup.object().shape({
  oldPassword: yup.string().required(),
  newPassword: yup.string().required(),
  retypePassword: yup.string().oneOf([yup.ref('newPassword'), null], 'Passwords must match')
})
function Profile() {
  const userInfo = useSelector(state => state.user.userInfo)
  const dispatch = useDispatch()
  return (
    <Container>
      <div style={{ marginLeft:'20%'}}>
      <h1>User Profile</h1>
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
            <Row className='mb-3'>
              <Form.Group
                as={Col}
                md='4'
                controlId='validationFormik101'
                className='position-relative'
              >
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type='text'
                  name='firstName'
                  value={values.firstName}
                  onChange={handleChange}
                  isValid={touched.firstName && !errors.firstName}
                  isInvalid={!!errors.firstName}
                />
              </Form.Group>
              <Form.Group
                as={Col}
                md='4'
                controlId='validationFormik102'
                className='position-relative'
              >
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type='text'
                  name='lastName'
                  value={values.lastName}
                  onChange={handleChange}
                  isValid={touched.lastName && !errors.lastName}
                  isInvalid={!!errors.lastName}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group
                as={Col}
                md='8'
                className='position-relative'
              >
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='text'
                  name='email'
                  value={values.email}
                  disabled
                />
              </Form.Group>
            </Row>
            <Button type='submit'>Submit form</Button>
          </Form>
        )}
      </Formik>
      <h1 style={{ marginTop:'60px'}}>Change Password</h1>
      <Formik
        validationSchema={schema1}
        onSubmit={
          data => authApi.changePassword(data).then(
            ()=>dispatch(changePassword())
          )
        }
        initialValues={{
          oldPassword: '',
          newPassword: '',
          retypePassword: ''
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
            <Row className='mb-3'>
              <Form.Group
                as={Col}
                md='8'
                className='position-relative'
              >
                <Form.Label htmlFor='oldPassword'>Old Password</Form.Label>
                <Form.Control
                  id='oldPassword'
                  type='password'
                  name='oldPassword'
                  value={values.oldPassword}
                  onChange={handleChange}
                  isInvalid={!!errors.oldPassword}
                />
              </Form.Group>
              <Form.Group
                as={Col}
                md='8'
                className='position-relative'
              >
                <Form.Label htmlFor='newPassword'>New Password</Form.Label>
                <Form.Control
                  type='password'
                  id='newPassword'
                  name='newPassword'
                  value={values.newPassword}
                  onChange={handleChange}
                  isInvalid={!!errors.newPassword}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group
                as={Col}
                md='8'
                className='position-relative'
              >
                <Form.Label htmlFor='retypePassword'>Retype Password</Form.Label>
                <Form.Control
                  id='retypePassword'
                  type='password'
                  name='retypePassword'
                  onChange={handleChange}
                  value={values.retypePassword}
                  isInvalid={!!errors.retypePassword}
                />
              </Form.Group>
            </Row>
            <Button type='submit'>Submit form</Button>
          </Form>
        )}
      </Formik>
      </div>
    </Container>
  )
}

export default Profile
