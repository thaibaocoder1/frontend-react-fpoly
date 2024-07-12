import { login } from "@app/slice/AuthSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import toastObj from "@utils/Toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginForm from "../LoginForm/LoginForm";

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
  return <LoginForm onSubmit={handleSubmit}></LoginForm>;
}

export default Login;
