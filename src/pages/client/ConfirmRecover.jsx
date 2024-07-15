import { confirmRecover, setEmtpyError } from "@app/slice/AuthSlice";
import toastObj from "@utils/Toast";
import { useEffect, useRef } from "react";
import { IoCloudDoneOutline } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

const ConfirmRecover = () => {
  const params = useSearchParams()[0];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isHasError = useSelector((state) => state.auth.error);
  const userId = params.get("id");
  const hashCode = params.get("hash");
  const checkRequestRecover = useRef({});
  checkRequestRecover.current = async () => {
    try {
      await dispatch(
        confirmRecover({
          id: userId,
          hash: hashCode,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    checkRequestRecover.current();
  }, []);
  useEffect(() => {
    let timer;
    if (isHasError) {
      toastObj.error(isHasError);
      dispatch(setEmtpyError());
    } else {
      timer = setTimeout(() => navigate("/login", { replace: true }), 1000);
    }
    return () => clearTimeout(timer);
  }, [isHasError, dispatch, navigate]);
  return (
    <section className="bg-white dark:bg-gray-900 w-full">
      <div className="container py-4 mx-auto">
        <div className="flex flex-col items-center max-w-sm mx-auto text-center">
          <p
            className={`p-3 text-sm font-medium ${
              isHasError ? "text-red-500 bg-red-50" : "text-blue-500 bg-blue-50"
            } rounded-full dark:bg-gray-800`}
          >
            {isHasError ? <MdErrorOutline /> : <IoCloudDoneOutline />}
          </p>
          <h1 className="mt-3 text-xl font-semibold text-gray-800 dark:text-white md:text-3xl">
            {isHasError ? isHasError : "Recover success"}
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            Bản quyền cung cấp bởi BAODEV
          </p>
        </div>
      </div>
    </section>
  );
};

export default ConfirmRecover;
