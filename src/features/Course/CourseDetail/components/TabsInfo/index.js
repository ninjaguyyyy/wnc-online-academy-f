import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import LearnTabItem from './components/LearnTabItem';
import ReviewTabItem from './components/ReviewTabItem';
import TeacherTabItem from './components/TeacherTabItem';

export default function TabsInfo({ course, teacherCourses }) {
  return (
    <Tabs id="uncontrolled-tab-example" className="mb-3" style={{ marginTop: '30px' }}>
      <Tab eventKey="Overview" title="Overview">
        <h5 className="mt-4 mb-2">Course Description</h5>
        <div className="full-des" dangerouslySetInnerHTML={{ __html: course.fullDescription }}></div>
      </Tab>
      <Tab eventKey="Curriculum" title="Curriculum">
        <LearnTabItem courseId={course._id} sections={course.sections} />
      </Tab>
      <Tab eventKey="Instructor" title="Instructor">
        <TeacherTabItem teacher={course.lecturer} courses={teacherCourses} />
      </Tab>
      <Tab eventKey="Reviews" title="Reviews">
        <ReviewTabItem course={course} />
      </Tab>
    </Tabs>
  );
}
