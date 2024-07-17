import { login, setEmtpyUser } from "@app/slice/AuthSlice";
import logo from "@assets/react.svg";
import StorageKeys from "@constants/StorageKeys";
import { yupResolver } from "@hookform/resolvers/yup";
import { unwrapResult } from "@reduxjs/toolkit";
import toastObj from "@utils/Toast";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const schema = yup.object({
  email: yup
    .string()
    .required("Please enter email")
    .email("Please enter a valid email"),
  password: yup
    .string()
    .required("Please enter password")
    .min(6, "Please enter at least 6 characters"),
});
function LoginForm() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmitData = async (values) => {
    try {
      values.admin = true;
      const action = login(values);
      const resultAction = await dispatch(action);
      const data = unwrapResult(resultAction);
      if (data.role.toLowerCase() === StorageKeys.ADMIN) {
        navigate("/admin");
      } else {
        toastObj.error("Account unauthrization");
        dispatch(setEmtpyUser());
      }
    } catch (error) {
      toastObj.error(error);
    }
  };
  return (
    <div className="min-w-screen min-h-screen bg-[#cdcae9] flex justify-center items-center">
      <div className="w-[350px] text-slate-600 p-2">
        <div className="bg-white p-4 rounded-md">
          <div className="h-[70px] flex justify-center items-center">
            <div className="w-[180px] h-[50px]">
              <img
                className="w-full h-full"
                src={logo}
                alt="image"
                loading="lazy"
              />
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmitData)}>
            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="email" className="text-slate-600">
                Email
              </label>
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <input
                      {...field}
                      className="px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md"
                      type="text"
                      placeholder="Email"
                      id="email"
                    />
                    {error && (
                      <p className="text-red-500 text-sm">{error.message}</p>
                    )}
                  </>
                )}
              />
            </div>

            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="password" className="text-slate-600">
                Password
              </label>
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <input
                      {...field}
                      className="px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md"
                      type="password"
                      name="password"
                      placeholder="Password"
                      id="password"
                    />
                    {error && (
                      <p className="text-red-500 text-sm">{error.message}</p>
                    )}
                  </>
                )}
              />
            </div>

            <button className="bg-slate-800 w-full hover:shadow-blue-300/ hover:shadow-lg text-white rounded-md px-7 py-2 mb-3">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
