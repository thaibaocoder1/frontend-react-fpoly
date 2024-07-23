import { active, setEmtpyActive } from "@app/slice/AuthSlice";
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
    (async () => {
      try {
        const action = active(id);
        const resultAction = await dispatch(action);
        const data = unwrapResult(resultAction);
        if (data) {
          toastObj.success("Account activated successfully!");
          navigate("/login");
        } else {
          toastObj.error("Account is activated");
        }
      } catch (error) {
        toastObj.error(error);
      }
    })();
    return () => dispatch(setEmtpyActive());
  }, [dispatch, id, navigate]);

  return <div></div>;
};

export default ActiveAccount;
