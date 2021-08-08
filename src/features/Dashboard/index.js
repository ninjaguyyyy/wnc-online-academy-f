import React from 'react'
import Layout from 'components/Layout'
import Course from 'features/Course'
import Footer from "components/Layout/Footer";
function Dashboard() {
  return (
    <div>
      <Layout />
      <Course />
      <Footer />
    </div>
  )
}
export default Dashboard