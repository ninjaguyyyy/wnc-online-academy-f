import React from "react";
import { Card, Col,OverlayTrigger,Popover } from "react-bootstrap";
import { generateURLGetImageResource } from "helpers";
import { Link } from "react-router-dom";
import "./index.css";
import { BsPerson, BsStarFill, BsStar, BsHeartFill, BsHeart } from "react-icons/bs";
import { BiBookReader } from "react-icons/bi";
import { useSelector } from "react-redux";

const popover = (
  <Popover id="popover-basic" className="popovercss">
    <Popover.Header as="h3">2021 Complete Python Bootcamp From Zero to Hero in Python</Popover.Header>
    <Popover.Body>
      <h4>Build, test, and deploy Docker applications with Kubernetes while learning production-style development workflows</h4>
    </Popover.Body>
  </Popover>
);

export default function CourseCard({ course }) {
  const { avatar, title, lecturer, category, _id } = course;
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user);
  console.log(user);

  return (
    <OverlayTrigger 
      placement="right"
      overlay={popover}
    >
      {({ ref, ...triggerHandler })=>(
 <Col sm={4} style={{ padding: "20px" }} className='d-inline-flex align-items-center CourseCard' variant="light"
 {...triggerHandler} >
 <Card ref={ref}>
   <Card.Body>
     <Card.Img variant="top" style={{ width: "100%", height: "200px" }} src={generateURLGetImageResource(avatar)} />
     <a href="#" className="card__category mt-3 mb-2">
       {category.name}
     </a>
     <Card.Title>
       <Link className="card__title" to={`/course/${_id}`}>
         {title}
       </Link>
     </Card.Title>
     <div className="reviews d-flex justify-content-between align-items-center mb-4 mt-3">
       <div className="rating d-flex align-items-center">
         {Array(4)
           .fill()
           .map((_, i) => (
             <BsStarFill color="#FFC78B" size={16} className="mr-1" />
           ))}

         <BsStar color="#FFC78B" size={16} />
         <div className="card__statistics ml-3">4 (10 reviews)</div>
       </div>

       <div className="fav">
         <a href="javascript:void">
           <BsHeart className="fav_icon" color="rgb(220 73 52)" size={20} />
         </a>
       </div>
     </div>
     <Card.Text
       style={{
         display: "flex",
         justifyContent: "space-between",
       }}
     >
       <div className="card__lecture d-flex align-items-center">
         <BiBookReader color="gray" size={18} />
         <span className="ml-2">{lecturer.firstName + " " + lecturer.lastName}</span>
       </div>
       <div className="card__prices">
         <del className="mr-2">$190</del>
         <span>$135</span>
       </div>
     </Card.Text>
   </Card.Body>
 </Card>
</Col>
      )}
    </OverlayTrigger>
  );
}
