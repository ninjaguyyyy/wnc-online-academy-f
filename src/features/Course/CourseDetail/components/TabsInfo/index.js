import React from "react";
import { Button, Card, Tab, Tabs } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { BsFileEarmarkText, BsPlay, BsLock, BsLockFill } from "react-icons/bs";
import { toast } from "react-toastify";
import LearnTabItem from "./components/LearnTabItem";
import ReviewTabItem from "./components/ReviewTabItem";
import TeacherTabItem from "./components/TeacherTabItem";

export default function TabsInfo({ course }) {
  return (
    <Tabs id="uncontrolled-tab-example" className="mb-3" style={{ marginTop: "30px" }}>
      <Tab eventKey="Overview" title="Overview">
        <h5 className="mt-4 mb-2">Course Description</h5>
        <div className="full-des" dangerouslySetInnerHTML={{ __html: course.fullDescription }}></div>
      </Tab>
      <Tab eventKey="Curriculum" title="Curriculum">
        <LearnTabItem sections={course.sections} />
      </Tab>
      <Tab eventKey="Instructor" title="Instructor">
        <TeacherTabItem teacher={course.lecturer} />
      </Tab>
      <Tab eventKey="Reviews" title="Reviews">
        <ReviewTabItem course={course} />
      </Tab>
    </Tabs>
  );
}
{
}
