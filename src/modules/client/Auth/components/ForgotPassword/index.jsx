import { forgot } from "@app/slice/AuthSlice";
import { Container } from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import toastObj from "@utils/Toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ForgotPasswordForm from "../ForgotPasswordForm/ForgotPasswordForm";

function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const action = forgot(values);
      const resultAction = await dispatch(action);
      const data = unwrapResult(resultAction);
      if (data) {
        navigate("/login");
        toastObj.success("Please check email");
      }
    } catch (error) {
      toastObj.error(error);
    }
  };
  return (
    <Container sx={{ marginTop: 1 }}>
      <ForgotPasswordForm onSubmit={handleSubmit} />
    </Container>
  );
}

export default ForgotPassword;
