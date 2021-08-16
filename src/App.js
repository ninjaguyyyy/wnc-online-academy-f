import { Provider } from 'react-redux';
import store from './store/rootstore';
import { BrowserRouter, Redirect, Switch, Route, useLocation } from 'react-router-dom';
import PublicRoute from 'components/PublicRoute';
import PrivateRoute from 'components/PrivateRoute';
import TeacherRouter from 'components/PrivateRoute/TeacherRouter';
import ResetPassword from 'features/Auth/ResetPassword';
import Dashboard from 'features/Dashboard';
import Student from 'features/Student';
import WishList from 'features/Student/wishlist';
import Teacher from 'features/Teacher';
import Layout from 'components/Layout';
import Web from 'features/Course/Web';
import Mobile from 'features/Course/Mobile';
import CourseDetail from 'features/Course/CourseDetail';
import TeacherCourse from 'features/Course/TeacherCourse';
import AttendedCourses from 'features/Student/AttendedCourses';
import AddNewCourse from 'features/Teacher/AddNewCourse';
import EditCourse from 'features/Teacher/EditCourse';
import { ToastContainer } from 'react-toastify';
import Login from 'features/Login';
import Register from 'features/Register';
import VerifyOTP from 'features/VerifyOTP';

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer autoClose={3000} closeOnClick={true} hideProgressBar={false} pauseOnHover={true} />
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <PublicRoute path="/login" component={Login} />
          <PublicRoute path="/register" component={Register} />
          <PublicRoute path="/verify-otp" component={VerifyOTP} />
          <Layout>
            <Switch>
              <Route path="/web" component={Web} />
              <Route path="/mobile" component={Mobile} />
              <Route path="/course/:id" component={CourseDetail} />
              <PrivateRoute exact path="/student" component={Student} />
              <PrivateRoute exact path="/student/wishlist" component={WishList} />
              <PrivateRoute exact path="/student/my-courses" component={AttendedCourses} />
              <TeacherRouter exact path="/teacher" component={Teacher} />
              <TeacherRouter exact path="/teacher/courses" component={TeacherCourse} />
              <TeacherRouter exact path="/teacher/courses/add-course" component={AddNewCourse} />
              <TeacherRouter exact path="/teacher/editcourse/:id" component={EditCourse} />
              <Redirect from="/" to="/dashboard" />
            </Switch>
          </Layout>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
