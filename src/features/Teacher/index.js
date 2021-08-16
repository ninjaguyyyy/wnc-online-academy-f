import React from 'react';
import Profile from 'features/Profile';
import { Container, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import loading from 'assets/image/loading.svg';

function Teacher() {
  const history = useHistory();
  const isLoading = useSelector((state) => state.user.loading);
  if (!isLoading)
    return (
      <Container>
        <Profile />
        <div
          style={{
            display: 'flex',
            alginItems: 'center',
            justifyContent: 'center',
            marginTop: '30px',
          }}
        >
          <Button onClick={() => history.push('/teacher/courses')}>My Course</Button>
        </div>
      </Container>
    );
  else
    return (
      <div className="userloading">
        <img src={loading} className="loading" alt="loading" />
      </div>
    );
}

export default Teacher;
