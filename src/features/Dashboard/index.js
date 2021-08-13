import React, { useEffect } from 'react'
import Layout from 'components/Layout'
import Course from 'features/Course'
import Footer from "components/Layout/Footer";
import coursesAPI from 'api/coursesApi'
import { useDispatch,useSelector } from 'react-redux';
import {dashboardCourse } from 'store/userSlice'

function Dashboard() {
  const dispatch= useDispatch();
  const coursesdata=useSelector(state=>state.user.dashboard.courses)
  useEffect(()=>{
    coursesAPI.getAll().then(res=>dispatch(dashboardCourse(res.courses)))
  },[coursesdata])
  return (
    <div>
      <Layout />
      {coursesdata&&<Course />}
      <Footer />
    </div>
  )
}
export default Dashboard