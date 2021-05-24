import React,{useState} from 'react'
import styled from "styled-components"
import background from 'assets/image/backgroundLogin.jpg'
import IconTeacher from 'assets/image/IconTeacher'
import IconStudent from 'assets/image/IconStudent'
import './index.css'
import { useHistory } from 'react-router'
function Login() {
  const [typeAccount, setTypeAccount] = useState(false)
  const history=useHistory()
  return (
    <LoginContainer>
      <Formstyle>
        <h3>Login as</h3>
        <AccountType>
          <Iconstyle>
            <IconStudent />
          </Iconstyle>
          <Iconstyle>
            <IconTeacher />
          </Iconstyle>
          <Iconstyle>
            <IconTeacher />
          </Iconstyle>
        </AccountType>
        <Inputcontainer style={{ marginTop: '80px' }}>
          <label>Username</label>
          <Input type="text" />
        </Inputcontainer>
        <Inputcontainer>
          <label>Password</label>
          <Input type="text" />
        </Inputcontainer>
        <button
          onClick={
            () =>typeAccount&& history.push('/dashboard')
          }
        >Login</button>
      </Formstyle>
    </LoginContainer>

  )
}
export default Login

const LoginContainer = styled.div`
  width:100%;
  height:100vh;
  background-image: url(${background});
  background-size: cover;
  display:flex;
  justify-content:center;
  align-items:center;
`
const Formstyle = styled.div`
  text-align:center;
  width:450px;
  height:75vh;
  border-radius:19px;
  background-color:#ffffff;
`
const AccountType = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
`
const Iconstyle = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  padding:25px;
  margin:0 10px;
  cursor: pointer;
`
const Inputcontainer = styled.div`
  width: 90%;
  margin: 0 20px;
  text-align:left;
`
const Input = styled.input`
  background-color: #bdbdbd !important;
  width:90% !important;
  border-bottom: none !important;
  border: 1px solid cyan !important;
  padding: 0 20px !important;
  &:focus{
    box-shadow: none !important;
    border-bottom: 1px solid cyan !important;
  }
`

