import { yupResolver } from "@hookform/resolvers/yup";
import { convertObjToFormData } from "@utils/Convert";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import FileField from "./FormFieldAccount/FileField";
import InputField from "./FormFieldAccount/InputField";
import SelectField from "./FormFieldAccount/SelectField";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const schema = yup.object({
  fullname: yup.string().required("Please enter fullname"),
  username: yup.string().required("Please enter username"),
  phone: yup
    .string()
    .required("Please enter phone")
    .test("match-regex", "Phone not match with pattern", (value) =>
      /(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(value)
    ),
  role: yup.string().required("Please choose one role"),
  imageUrl: yup
    .mixed()
    .test("file-required", "Image is required", (value) => value)
    .test("file-type", "Unsupported file format", (value) => {
      const condition = value.contentType
        ? true
        : value &&
          ["image/jpg", "image/jpeg", "image/png"].includes(value[0].type);
      return condition;
    }),
});
const AccountFormEdit = ({ onSubmit }) => {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      fullname: "",
      username: "",
      phone: "",
      role: "",
      imageUrl: "",
    },
    resolver: yupResolver(schema),
  });
  const currentAccount = useSelector((state) => state.account.current);
  const onSubmitData = async (data) => {
    const formData = convertObjToFormData(data);
    onSubmit && (await onSubmit(formData));
  };
  const { isSubmitting } = form.formState;
  useEffect(() => {
    if (currentAccount) {
      const fields = [
        "fullname",
        "username",
        "email",
        "phone",
        "role",
        "imageUrl",
      ];
      fields.forEach((field) =>
        form.setValue(
          field,
          field === "imageUrl"
            ? currentAccount["imageUrl"]
            : currentAccount[field]
        )
      );
    }
  }, [currentAccount, form]);
  return (
    <form
      className="grid grid-cols-2 lg:grid-cols-1 gap-3"
      onSubmit={form.handleSubmit(onSubmitData)}
    >
      <section>
        <div className="grid grid-cols-2 mb-3 gap-4 w-full text-black">
          <InputField name="fullname" placeholder="Fullname" form={form} />
          <InputField name="username" placeholder="Username" form={form} />
        </div>
        <div className="grid grid-cols-2 mb-3 gap-4 w-full text-[#d0d2d6]">
          <InputField name="phone" placeholder="Phone" form={form} />
          <SelectField name="role" form={form} />
        </div>
      </section>
      <section>
        <FileField form={form} name="imageUrl" current={currentAccount} />
        <div className="flex justify-center ">
          <button
            className="bg-red-500 w-[225px] hover:shadow-red-300/50 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
            type="submit"
            disabled={isSubmitting}
          >
            Submit
          </button>
          <button
            className="bg-blue-500 w-[225px] hover:shadow-blue-300/50 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3 ml-5"
            type="button"
            onClick={() => form.clearErrors()}
          >
            Reset form
          </button>
          <button
            className="bg-slate-500 w-[225px] hover:shadow-slate-300/50 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3 ml-5"
            type="button"
            onClick={() => navigate("..")}
          >
            Back
          </button>
        </div>
      </section>
    </form>
  );
};

AccountFormEdit.propTypes = {
  onSubmit: PropTypes.func,
};

export default AccountFormEdit;
