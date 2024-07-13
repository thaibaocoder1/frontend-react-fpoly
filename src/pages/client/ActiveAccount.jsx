import { active, setEmtpyError, setEmtpyUser } from "@app/slice/AuthSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import toastObj from "@utils/Toast";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const ActiveAccount = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const activateAccount = async () => {
      try {
        const action = active(id);
        const resultAction = await dispatch(action);
        const data = unwrapResult(resultAction);
        data && toastObj.success("Account activated successfully!");
        navigate("/login");
      } catch (error) {
        toastObj.error(error);
      }
    };
    activateAccount();
    return () => {
      dispatch(setEmtpyUser());
      dispatch(setEmtpyError());
    };
  }, [dispatch, id, navigate]);

  return <div></div>;
};

export default ActiveAccount;
