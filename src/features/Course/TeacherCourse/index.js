import React, { useEffect } from 'react';
import { Container, Button, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import teacherApi from 'api/teacherApi';
import { courses } from 'store/teacherSlice';
import { setLoading } from 'store/userSlice';
import loading from 'assets/image/loading.svg';
import CourseCard from 'components/Common/CourseCard';
function Courses() {
  const history = useHistory();
  const dispatch = useDispatch();
  const Courses = useSelector((state) => state.teacher.courses);
  const isLoading = useSelector((state) => state.user.loading);
  useEffect(() => {
    dispatch(setLoading(true));
    teacherApi.myCourses().then((res) => {
      if (res.success === true) {
        dispatch(setLoading(false));
        dispatch(courses(res.courses));
      }
    });
  }, [dispatch]);
  return (
    <Container>
      {!isLoading && (
        <div style={{ marginBottom: '30px' }}>
          <Button onClick={() => history.push('/teacher/courses/add-course')}>Add new Course</Button>
        </div>
      )}
      {!isLoading && <h2>My Course</h2>}
      {!isLoading && Courses !== null && (
        <Row xs={1} md={2}>
          {Courses.map((item, idx) => (
            <CourseCard course={item} />
          ))}
        </Row>
      )}
      {isLoading && (
        <div className="userloading">
          <img src={loading} className="loading" alt="loading" />
        </div>
      )}
    </Container>
  );
}

export default Courses;
