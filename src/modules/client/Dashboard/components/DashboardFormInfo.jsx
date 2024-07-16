import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { convertObjToFormData } from "@utils/Convert";
import InputField from "./FormControlDashboard/InputField";
import FileField from "./FormControlDashboard/FileField";

const schema = (isEditMode) =>
  yup.object({
    fullname: yup.string().required("Please enter this field"),
    username: yup
      .string()
      .required("Please enter this field")
      .min(6, "Please enter at least 6 characters"),
    phone: yup
      .string()
      .required("Please enter phone")
      .test("match-regex", "Phone not match with pattern", (value) =>
        /(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(value)
      ),
    imageUrl: yup
      .mixed()
      .test("file-required", "Image is required", (value) => value)
      .test("file-type", "Unsupported file format", (value) => {
        return isEditMode
          ? true
          : value &&
              ["image/jpg", "image/jpeg", "image/png"].includes(value[0].type);
      }),
  });

const DashboardFormInfo = ({ onSubmit }) => {
  const userDispatch = useSelector((state) => state.account.current);
  const form = useForm({
    defaultValues: {
      fullname: "",
      username: "",
      phone: "",
      imageUrl: "",
    },
    resolver: yupResolver(schema(!!userDispatch)),
  });
  const onSubmitData = (data) => {
    const formData = convertObjToFormData(data);
    const isValid = onSubmit(formData);
    if (isValid) form.reset();
  };
  useEffect(() => {
    if (userDispatch) {
      const fields = ["fullname", "username", "imageUrl", "phone"];
      fields.forEach((field) =>
        form.setValue(
          field,
          field === "imageUrl"
            ? userDispatch[field].fileName
            : userDispatch[field]
        )
      );
    }
  }, [userDispatch, form]);
  return (
    <form onSubmit={form.handleSubmit(onSubmitData)} style={{ width: 500 }}>
      <InputField form={form} name="fullname" placeholder="Fullname" />
      <InputField form={form} name="username" placeholder="Username" />
      <InputField form={form} name="phone" placeholder="Phone" />
      <FileField
        form={form}
        name="imageUrl"
        placeholder="Image"
        current={userDispatch}
      />
      <div className="flex justify-end">
        <button className="bg-[#059473] hover:shadow-md text-white rounded-md px-7 py-2 my-2">
          Save Changes
        </button>
      </div>
    </form>
  );
};
DashboardFormInfo.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default DashboardFormInfo;
