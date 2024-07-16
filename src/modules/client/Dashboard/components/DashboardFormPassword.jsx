import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import InputField from "./FormControlDashboard/InputField";
import { useDispatch, useSelector } from "react-redux";
import { changePassword, setEmtpyError } from "@app/slice/AuthSlice";
import toastObj from "@utils/Toast";
import { useEffect } from "react";

const schema = yup.object({
  oldPassword: yup.string().required("Please enter this field"),
  password: yup
    .string()
    .required("Please enter this field")
    .min(6, "Please enter at least 6 characters"),
  retypePassword: yup
    .string()
    .required("Please enter this field")
    .min(6, "Please enter at least 6 characters")
    .oneOf([yup.ref("password")], "Password not match"),
});
const DashboardFormPassword = () => {
  const form = useForm({
    defaultValues: {
      oldPassword: "",
      password: "",
      retypePassword: "",
    },
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const userLoggined = useSelector((state) => state.auth.user);
  const isHasError = useSelector((state) => state.auth.error);
  const onSubmitData = async (data) => {
    try {
      data.id = userLoggined._id;
      const results = await dispatch(changePassword(data));
      if (!results.type.includes("rejected")) {
        toastObj.success("Change password success");
        form.reset();
      }
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
    }
  };
  useEffect(() => {
    if (isHasError) {
      toastObj.error(isHasError);
      dispatch(setEmtpyError());
    }
  }, [isHasError, dispatch]);
  return (
    <form onSubmit={form.handleSubmit(onSubmitData)}>
      <InputField
        form={form}
        name="oldPassword"
        placeholder="Old Password"
        type="password"
      />
      <InputField
        form={form}
        name="password"
        placeholder="Password"
        type="password"
      />
      <InputField
        form={form}
        name="retypePassword"
        placeholder="Retype Password"
        type="password"
      />
      <button className="px-6 py-2 bg-[#059473] shadow-lg hover:shadow-green-500/30 text-white rounded-md mt-3">
        Update Password
      </button>
    </form>
  );
};

export default DashboardFormPassword;
