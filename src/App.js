import { Provider } from 'react-redux'
import store from './store/rootstore'
import { BrowserRouter, Redirect, Switch,Route } from 'react-router-dom'
import Login from 'features/Auth/Login'
import Register from 'features/Auth/Register'
import PublicRoute from 'components/PublicRoute'
import PrivateRoute from 'components/PrivateRoute'
import TeacherRouter from 'components/PrivateRoute/TeacherRouter'
import ResetPassword from 'features/Auth/ResetPassword'
import Dashboard from 'features/Dashboard'
import Student from 'features/Student'
import Teacher from 'features/Teacher'
import Layout from 'components/Layout'
import Web from 'features/Course/Web'
import Mobile from 'features/Course/Mobile'
import CourseDetail from 'features/Course/CourseDetail'
import { ToastContainer } from 'react-toastify'
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer autoClose={2000} />
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <PublicRoute path="/login" component={Login} />
          <PublicRoute path="/register" component={Register} />
          <PublicRoute path="/forgot-password" component={ResetPassword} />
          <Layout>
            <Switch>
              <Route path="/web" component={Web} />
              <Route path="/mobile" component={Mobile} />
              <Route path="/course/:id" component={CourseDetail} />
              <PrivateRoute path="/student" component={Student} />
              <TeacherRouter path="/teacher" component={Teacher} />
              <TeacherRouter path="/teacher/profile" component={Teacher} />
              <Redirect from="/" to="/dashboard" />
              <Redirect from="/" to="/dashboard" />
            </Switch>
          </Layout>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
