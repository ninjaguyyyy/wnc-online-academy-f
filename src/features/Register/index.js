import authApi from "api/authUser";
import { ROLE } from "helpers/constants";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { BsUnlockFill } from "react-icons/bs";
import { FaUserGraduate, FaUserTie } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import RegisterImage from "../../assets/image/register.svg";
import { useHistory } from "react-router-dom";

export default function Register() {
  const [role, setRole] = useState(ROLE.STUDENT);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const history = useHistory();

  const handleRegister = async (e) => {
    e.preventDefault();

    const { msg, user } = await authApi.registerApi({ userName: username, passWord: password, email, firstName, lastName, role });
    msg && toast.error(msg);
    if (user) {
      toast.success("Register successfully. Please check your email to receive OTP code.");
      history.push(`/verify-otp?email=${email}`);
    }
  };

  return (
    <div className="login__container sign-up-mode">
      <div className="forms-container">
        <div className="signin-signup">
          <form onSubmit={(e) => handleRegister(e)} className="sign-up-form">
            <h2 className="title">Register</h2>

            <div className="input-field">
              <i className="fas fa-user" />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-login"
                required
              />
            </div>

            <div className="input-field">
              <i className="fas fa-envelope" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-login"
                required
              />
            </div>

            <div className="input-field">
              <i className="fas fa-address-card" />
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input-login"
                required
              />
            </div>

            <div className="input-field">
              <i className="far fa-address-card" />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input-login"
                required
              />
            </div>

            <div className="input-field mb-4">
              <i className="fas fa-lock" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-login"
                required
              />
            </div>

            <div style={{ fontSize: "20px", display: "flex", alignItems: "center" }}>
              <FaUserGraduate color="#565387" />
              <Form.Check
                inline
                checked={role === ROLE.STUDENT}
                onChange={(e) => setRole(ROLE.STUDENT)}
                className="ml-2 login__radio"
                type="radio"
                style={{ display: "flex" }}
              />
              <FaUserTie color="#565387" />
              <Form.Check
                inline
                onChange={() => setRole(ROLE.TEACHER)}
                checked={role === ROLE.TEACHER}
                className="ml-2 login__radio"
                type="radio"
                style={{ display: "flex" }}
              />
            </div>

            <input type="submit" className="login__btn mt-3 mb-3" defaultValue="Sign up" />
            <div style={{ width: "45%", display: "flex", justifyContent: "flex-end", fontWeight: "700", fontSize: "15px" }}>
              <div className="d-flex align-items-center ">
                <BsUnlockFill color="#2a3d9e" size={16} />
                <Link to="/verify-otp" className="ml-2 link-verify">
                  Verify OTP
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div class="panel left-panel">
          <div class="content">
            <h3>New here ?</h3>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis, ex ratione. Aliquid!</p>
            <button class="btn transparent" id="sign-up-btn">
              Sign up
            </button>
          </div>
          <img src="img/log.svg" class="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>
              <Link to="/" style={{ color: "#fff" }}>
                Online Academy - WNC 21
              </Link>
            </h3>
            <p>After having your own account invite you to use it to use the system</p>
            <button className="login__btn transparent" id="sign-in-btn">
              <Link to="/login" style={{ color: "#fff" }}>
                Login
              </Link>
            </button>
          </div>
          <img src={RegisterImage} className="image" alt="" />
        </div>
      </div>
    </div>
  );
}
