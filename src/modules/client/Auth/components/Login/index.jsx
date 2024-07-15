import { login } from "@app/slice/AuthSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import toastObj from "@utils/Toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginForm from "../LoginForm/LoginForm";
import { Container } from "@mui/material";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const action = login(values);
      const resultAction = await dispatch(action);
      const data = unwrapResult(resultAction);
      data && navigate("/");
    } catch (error) {
      toastObj.error(error);
    }
  };
  return (
    <Container sx={{ marginTop: 1 }}>
      <LoginForm onSubmit={handleSubmit}></LoginForm>
    </Container>
  );
}

export default Login;
