import toastObj from "@utils/Toast";
import LoginForm from "../LoginForm/LoginForm";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../AuthSlice";
import { unwrapResult } from "@reduxjs/toolkit";

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
      toastObj.error(error.message);
    }
  };
  return (
    <div>
      <LoginForm onSubmit={handleSubmit}></LoginForm>
    </div>
  );
}

export default Login;
