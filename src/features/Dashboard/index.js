import React, { useEffect } from 'react'
import Layout from 'components/Layout'
import Course from 'features/Course'
import Footer from "components/Layout/Footer";
import coursesAPI from 'api/coursesApi'
import { useDispatch } from 'react-redux';
import {dashboardCourse } from 'store/userSlice'

function Dashboard() {
  const dispatch= useDispatch();
  useEffect(()=>{
    coursesAPI.getAll().then(res=>dispatch(dashboardCourse(res.courses)))
  },[])
  return (
    <div>
      <Layout />
      <Course />
      <Footer />
    </div>
  )
}
export default Dashboard