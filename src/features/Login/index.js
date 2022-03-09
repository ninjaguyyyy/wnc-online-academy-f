import authApi from 'api/authUser';
import { ROLE } from 'helpers/constants';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { FaUserGraduate, FaUserTie } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { saveToken, saveUserInfo } from 'store/userSlice';
import LoginImage from '../../assets/image/log.svg';
import './index.css';

export default function Login(props) {
  const [role, setRole] = useState(ROLE.STUDENT);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { errorCode, msg, user, accessToken, refreshToken } = await authApi.signInApi({
      userName: username,
      passWord: password,
      role,
    });

    if (errorCode) {
      toast.error(msg);
      return;
    }

    if (accessToken) {
      dispatch(saveUserInfo(user));
      dispatch(saveToken(accessToken));
      user.role === 2 && props.history.push('/teacher');
    }
  };

  return (
    <div className="login__container">
      <div className="forms-container">
        <div className="signin-signup">
          <form action="" className="sign-in-form" onSubmit={(e) => handleLogin(e)}>
            <h2 className="title">Login</h2>
            <div className="input-field">
              <i className="fas fa-user" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-login"
                placeholder="Username"
                required
              />
            </div>
            <div className="input-field mb-3">
              <i className="fas fa-lock" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-login"
                placeholder="Password"
                required
              />
            </div>

            <div style={{ fontSize: '20px', display: 'flex', alignItems: 'center' }}>
              <FaUserGraduate color="#565387" />
              <Form.Check
                inline
                checked={role === ROLE.STUDENT}
                onChange={(e) => setRole(ROLE.STUDENT)}
                className="ml-2 login__radio"
                type="radio"
                style={{ display: 'flex' }}
              />
              <FaUserTie color="#565387" />
              <Form.Check
                inline
                onChange={() => setRole(ROLE.TEACHER)}
                checked={role === ROLE.TEACHER}
                className="ml-2 login__radio"
                type="radio"
                style={{ display: 'flex' }}
              />
            </div>
            <input type="submit" defaultValue="Login" className="mt-4 login__btn solid" />
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>
              <Link to="/" style={{ color: '#fff' }}>
                Online Academy - WNC 21
              </Link>
            </h3>
            <p>Please register an account to be able to use more functions of the system</p>
            <button className="login__btn transparent" id="sign-up-btn">
              <Link style={{ color: '#fff' }} to="/register">
                Register
              </Link>
            </button>
          </div>
          <img src={LoginImage} className="image" alt="" />
        </div>
      </div>
    </div>
  );
}
