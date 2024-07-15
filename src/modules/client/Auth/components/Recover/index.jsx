import { recover } from "@app/slice/AuthSlice";
import { Container } from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import toastObj from "@utils/Toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import RecoverForm from "../RecoverForm/RecoverForm";

function Recover() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const action = recover(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      navigate("/login");
      toastObj.success("Please check email");
    } catch (error) {
      toastObj.error(error);
    }
  };
  return (
    <Container sx={{ marginTop: 1 }}>
      <RecoverForm onSubmit={handleSubmit} />
    </Container>
  );
}

export default Recover;
