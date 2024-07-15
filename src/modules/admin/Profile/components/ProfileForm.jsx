import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import InputField from "./FormControlProfile/InputField";

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

const ProfileForm = ({ onSubmit }) => {
  const form = useForm({
    defaultValues: {
      oldPassword: "",
      password: "",
      retypePassword: "",
    },
    resolver: yupResolver(schema),
  });
  const onSubmitData = async (data) => {
    const isValid = await onSubmit(data);
    if (isValid) form.reset();
  };
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
      <button className="bg-red-500 hover:shadow-red-500/40 hover:shadow-md text-white rounded-md px-7 py-2 my-2">
        Save Changes
      </button>
    </form>
  );
};
ProfileForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default ProfileForm;
