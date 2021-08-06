import React from "react";
import { Card, Col } from "react-bootstrap";
import { generateURLGetImageResource } from "helpers";
import { Link } from "react-router-dom";

export default function CourseCard({ course }) {
  const { avatar, title, lecturer, category, _id } = course;
  return (
    <Col sm={4} style={{ padding: "20px" }}>
      <Card>
        <Card.Img variant="top" style={{ width: "100%", height: "200px" }} src={generateURLGetImageResource(avatar)} />
        <Card.Body>
          <Card.Title>
            <Link to={`/course/${_id}`}>{title}</Link>
          </Card.Title>
          <Card.Title>{category.name}</Card.Title>
          <Card.Text
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {lecturer.firstName + " " + lecturer.lastName}
            <span style={{ display: "flex" }}>
              {Array(4)
                .fill()
                .map((_, i) => (
                  <span key={1 * i}>⭐️</span>
                ))}
            </span>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}
