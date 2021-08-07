import React, { useState } from "react";
import styled from "styled-components";
import background from "assets/image/backgroundLogin.jpg";
import IconTeacher from "assets/image/IconTeacher";
import IconStudent from "assets/image/IconStudent";
import "./index.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import authApi from "api/authUser";
import { saveToken, saveUserInfo } from "store/userSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loading from "assets/image/loading.svg";
import { setLoadingSignIn } from "store/signSlice";

const schema = yup.object().shape({
  userName: yup.string().required(),
  passWord: yup.string().required(),
  role: yup.number().required(),
});
function Login(props) {
  const isLoading = useSelector((state) => state.sign.signIn.loading);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [role, setRole] = useState(3);
  const List = [
    {
      role: "Student",
      roleNum: 3,
      icon: <IconStudent />,
    },
    {
      role: "Teacher",
      roleNum: 2,
      icon: <IconTeacher />,
    },
  ];
  const displayList = (role) => {
    return List.map((item, i) => {
      return (
        <div key={i}>
          <label>
            <input
              type="checkbox"
              checked={role === item.roleNum}
              value={item.roleNum}
              onClick={() => setRole(item.roleNum)}
              {...register("role")}
            />
            <div className="login__chooseRole">
              {item.icon}
              {item.role}
            </div>
          </label>
        </div>
      );
    });
  };
  const displayRole = (role) => {
    if (role === 2) return "Teacher";
    if (role === 3) return "Student";
  };
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    dispatch(setLoadingSignIn(true));
    const { errorCode, msg, user, accessToken, refreshToken } = await authApi.signInApi(data);

    if (errorCode) {
      dispatch(setLoadingSignIn(false));
      toast.error(msg);
      return;
    }

    if (accessToken) {
      dispatch(setLoadingSignIn(false));
      dispatch(saveUserInfo(user));
      dispatch(saveToken(accessToken));
      user.role === 2 && props.history.push("/teacher");
    }
  };
  return (
    <LoginContainer>
      {!isLoading && (
        <Formstyle>
          <h3 style={{ paddingTop: "50px" }}>Login as {displayRole(role)}</h3>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Role>{displayList(role)}</Role>
            <label htmlFor="username" style={{ marginTop: "30px" }}>
              Username
            </label>
            <Input {...register("userName")} id="username" />
            <p className="login__error">{errors.userName?.message}</p>
            <label htmlFor="password">Password</label>
            <Input type="password" {...register("passWord")} id="password" />
            <p className="login__error">{errors.passWord?.message}</p>
            <div className="login__button" style={{ width: "100%", marginTop: "50px" }}>
              <Button variant="primary" size="lg" className="login__button" type="submit">
                Login
              </Button>
            </div>
            <div className="login__signup">
              <Link className="login__signupbtn" to="/register">
                Sign up
              </Link>
              <Link className="login__signupbtn" to="/forgotpassword">
                Forgot password
              </Link>
              <Link to="/dashobard">Dashboard</Link>
            </div>
          </Form>
        </Formstyle>
      )}
      {isLoading && <img src={loading} className="loading" alt="loading" />}
    </LoginContainer>
  );
}
export default Login;

export const LoginContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url(${background});
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Formstyle = styled.div`
  text-align: center;
  width: 450px;
  height: 90vh;
  border-radius: 19px;
  background-color: #ffffff;
`;
export const Form = styled.form`
  margin-top: 50px;
  text-align: left;
  padding: 0 20px;
`;
export const Input = styled.input`
  width: 100%;
  height: 40px;
  &:focus {
    border: none;
    border: 1px solid cyan;
  }
`;
export const Role = styled.div`
  display: flex;
  justify-content: center;
`;
