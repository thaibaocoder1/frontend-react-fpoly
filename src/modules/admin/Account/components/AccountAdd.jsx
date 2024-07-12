import { addAccount, setEmptyError } from "@app/slice/AccountSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import toastObj from "@utils/Toast";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AccountForm from "./AccountForm";

const AccountAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isHasError = useSelector((state) => state.account.error);
  const handleSubmit = async (data) => {
    const action = await dispatch(addAccount(data));
    const results = unwrapResult(action);
    if (results) toastObj.success("Add success");
    navigate("..");
  };
  useEffect(() => {
    if (isHasError) {
      toastObj.error(isHasError);
      dispatch(setEmptyError());
    }
  }, [isHasError, dispatch]);
  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-white rounded-md">
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-black text-xl font-semibold">Add Account</h1>
          <Link
            to={".."}
            className="bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-sm px-7 py-2 my-2"
          >
            All Accounts
          </Link>
        </div>
        <div>
          <AccountForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default AccountAdd;
