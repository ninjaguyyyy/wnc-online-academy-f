import { Provider } from 'react-redux'
import store from './store/rootstore'
import { BrowserRouter, Redirect, Switch } from 'react-router-dom'
import Login from 'features/Auth/Login'
import Register from 'features/Auth/Register'
import PublicRoute from 'components/PublicRoute'
import PrivateRoute from 'components/PrivateRoute'
import ResetPassword from 'features/Auth/ResetPassword'
import Dashboard from 'features/Dashboard'
import Student from 'features/Student'
import Teacher from 'features/Teacher'
import Layout from 'components/Layout'
import Web from 'features/Course/Web'
import Mobile from 'features/Course/Mobile'
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <PublicRoute path="/dashboard" component={Dashboard} />
          <PublicRoute path="/login" component={Login} />
          <PublicRoute path="/register" component={Register} />
          <PublicRoute path="/forgot-password" component={ResetPassword} />
          <Layout>
            <Switch>
              <PublicRoute path="/web" component={Web} />
              <PublicRoute path="/mobile" component={Mobile} />
              <PrivateRoute path="/student" component={Student} />
              <PrivateRoute path="/teacher" component={Teacher} />
              <Redirect from="/" to="/student" />
            </Switch>
          </Layout>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
