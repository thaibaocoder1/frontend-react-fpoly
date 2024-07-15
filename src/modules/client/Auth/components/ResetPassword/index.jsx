import { reset } from "@app/slice/AuthSlice";
import { Container } from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import toastObj from "@utils/Toast";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ResetPasswordForm from "../ResetPasswordForm/ResetPasswordForm";

function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const handleSubmit = async (values) => {
    try {
      values._id = id;
      const action = reset(values);
      const resultAction = await dispatch(action);
      const data = unwrapResult(resultAction);
      if (data) {
        navigate("/login");
        toastObj.success("Reset password success!");
      }
    } catch (error) {
      toastObj.error(error);
    }
  };
  return (
    <Container sx={{ marginTop: 1 }}>
      <ResetPasswordForm onSubmit={handleSubmit}></ResetPasswordForm>
    </Container>
  );
}

export default ResetPassword;
