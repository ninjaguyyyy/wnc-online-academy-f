import authApi from "api/authUser";
import { useQuery } from "App";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import RegisterImage from "../../assets/image/register.svg";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

export default function VerifyOTP() {
  const query = useQuery();
  const history = useHistory();

  const [email, setEmail] = useState(query.get("email") || "");
  const [otp, setOTP] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    console.log(email, otp);
    const { msg, user } = await authApi.verifyOTP({ email, otp: +otp });
    msg && toast.error(msg);
    if (user) {
      toast.success("Verify successfully. You can login to system.");
      history.push(`/login`);
    }
  };

  return (
    <div className="login__container sign-up-mode">
      <div className="forms-container">
        <div className="signin-signup">
          <form onSubmit={(e) => handleVerify(e)} className="sign-up-form">
            <h2 className="title">Verify OTP</h2>
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
              <i className="fas fa-user" />
              <input
                type="text"
                placeholder="OTP Code"
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
                className="input-login"
                required
              />
            </div>

            <input type="submit" className="login__btn mt-3 mb-3" defaultValue="Sign up" />
            {/* <div style={{ width: "45%", display: "flex", justifyContent: "flex-end", fontWeight: "700", fontSize: "15px" }}>
              <div className="d-flex align-items-center ">
                <BsUnlockFill color="#2a3d9e" size={16} />
                <Link to="/verify-otp" className="ml-2 link-verify">
                  Request a OTP Code
                </Link>
              </div>
            </div> */}
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
            <p>If you don't have a OTP code, please check your email or register another account.</p>
            <button className="login__btn transparent" id="sign-in-btn">
              <Link to="/register" style={{ color: "#fff" }}>
                Register
              </Link>
            </button>
          </div>
          <img src={RegisterImage} className="image" alt="" />
        </div>
      </div>
    </div>
  );
}
