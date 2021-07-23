import React from "react";
import Profile from "features/Profile";
import { Container, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
function Teacher() {
  const history = useHistory();
  return (
    <Container>
      <Profile />
      <div
        style={{
          display: "flex",
          alginItems: "center",
          justifyContent: "center",
          marginTop: "30px",
        }}
      >
        <Button onClick={() => history.push("/teacher/courses")}>
          My Course
        </Button>
      </div>
    </Container>
  );
}

export default Teacher;
