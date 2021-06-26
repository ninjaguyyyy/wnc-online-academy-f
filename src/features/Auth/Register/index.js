import React, { useState } from 'react'
import IconTeacher from 'assets/image/IconTeacher'
import IconStudent from 'assets/image/IconStudent'
import './../Login/index.css'
import  background from 'assets/image/backgroundSignUp.jpg'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Button, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Formstyle,Form,LoginContainer,Role,Input} from './../Login/index'
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import { getMe, signUp } from 'store/signSlice'
import { unwrapResult } from '@reduxjs/toolkit'

 
const schema = yup.object().shape({
  email: yup.string().email().required(),
  userName: yup.string().required(),
  passWord: yup.string().required(),
  repeatPassWord: yup.string().oneOf([yup.ref('passWord'), null], 'Passwords must match'),
  role: yup.number().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
})

function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })
  const dispatch=useDispatch()
  const isLoading = useSelector(state=>state.sign.signUp.loading)
  const [role, setRole] = useState(3)
  const List = [
    {
      role: 'Student',
      roleNum: 3,
      icon: <IconStudent />
    },
    {
      role: 'Teacher',
      roleNum: 2,
      icon: <IconTeacher />
    },
    {
      role: 'Admin',
      roleNum: 1,
      icon: <IconTeacher />
    }
  ]
  const onSubmit = async (data) =>{
    const submitdata={
      role: data.role,
      email: data.email,
      userName: data.userName,
      passWord: data.passWord,
      firstName: data.firstName,
      lastName: data.lastName
    }
    dispatch(signUp(submitdata))
    const result= await dispatch(getMe())
    const user=unwrapResult(result)
    console.log(user)
  }
  const displayList = (role) => {
    return List.map((item, i) => {
      return (
        <label>
          <input type='checkbox' checked={role === item.roleNum} value={item.roleNum} onClick={() => setRole(item.roleNum)} {...register('role')} />
          <div className='login__chooseRole'>
            {item.icon}
            {item.role}
          </div>
        </label>
      )
    })
  }
  const displayRole = (role) => {
    if (role === 1)
      return 'Admin'
    if (role === 2)
      return 'Teacher'
    if (role === 3)
      return 'Student'
  }

  return (
    <LoginContainer style={{ backgroundImage: `url(${background})`}}>
      <Formstyle style={{ margin:'unset'}}>
        <h3 style={{ paddingTop: '30px' }}>
          Sign up as {displayRole(role)}
        </h3>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Role>
            {displayList(role)}
          </Role>
          <Input {...register('email')}   placeholder='Email'/>
          <p className='login__error'>{errors.email?.message.toLowerCase()}</p>
          <Input {...register('userName')}  placeholder='Username'/>
          <p className='login__error'>{errors.userName?.message.toLowerCase()}</p>
          <Input {...register('firstName')}  placeholder='First Name'/>
          <p className='login__error'>{errors.firstName?.message.toLowerCase()}</p>
          <Input {...register('lastName')} placeholder='Last Name'/>
          <p className='login__error'>{errors.lastName?.message.toLowerCase()}</p>
          <Input type='password'{...register('passWord')}  placeholder='Password' />
          <p className='login__error'>{errors.passWord?.message.toLowerCase()}</p>
          <Input type='password'{...register('repeatPassWord')} placeholder='Retype Password' />
          <p className='login__error'>{errors.repeatPassWord?.message.toLowerCase()}</p>
          <div className='login__button' style={{ width: '100%'}}>
            <Button variant="primary" size="lg" 
              className='login__button' type='submit' 
              style={{ margin:'unset', marginTop:'40px'}}
            >
              {isLoading&& <Spinner animation="border" />}
              Sign up
            </Button>
          </div>
          <ToastContainer autoClose={2000} />
          <div className='login__signup'>
            <Link className='login__signupbtn' to='/login'>Login </Link>
            <Link className='login__signupbtn' to='/dashboard'>Dashboard </Link>
          </div>
        </Form>
      </Formstyle>
    </LoginContainer>
  )
}

export default Register
