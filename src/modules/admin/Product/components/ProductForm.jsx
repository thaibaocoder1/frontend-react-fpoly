import { yupResolver } from "@hookform/resolvers/yup";
import { convertObjToFormData } from "@utils/Convert";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import FileField from "./FormControlProduct/FileField";
import InputField from "./FormControlProduct/InputField";
import SelectField from "./FormControlProduct/SelectField";
import TextareaField from "./FormControlProduct/TextareaField";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
const schema = (isEditMode) =>
  yup.object({
    name: yup.string().required("Please enter name"),
    code: yup
      .string()
      .required("Please enter code")
      .test(
        "start-with-hash-code",
        "Code must be start with BAODEV",
        (value) => {
          return value.startsWith("BAODEV");
        }
      ),
    quantity: yup
      .number()
      .typeError("Quantity must be a number")
      .required("Please enter quantity"),
    price: yup
      .number()
      .typeError("Price must be a number")
      .required("Please enter price"),
    discount: yup.number().typeError("Discount must be a number"),
    description: yup.string().required("Please enter description"),
    content: yup.string().required("Please enter content"),
    imageUrl: yup
      .array()
      .min(1, "At least one file is required")
      .required("A file is required")
      .test("format", "Please choose supported files", (value = []) => {
        for (let i = 0; i < value.length; i++) {
          const item = value[i];
          const term =
            item instanceof File
              ? item.type
              : isEditMode
              ? item.contentType
              : item.type;
          if (!SUPPORTED_FORMATS.includes(term)) {
            return false;
          }
        }
        return true;
      }),
    categoryID: yup.string().required("Please choose one category"),
  });
const ProductForm = ({ onSubmit, current }) => {
  const navigate = useNavigate();
  const form = useForm({
    mode: "onBlur",
    defaultValues: {
      code: "",
      name: "",
      quantity: 0,
      price: 0,
      discount: 0,
      description: "",
      content: "",
      imageUrl: [],
      categoryID: "",
    },
    resolver: yupResolver(schema(!!current), { abortEarly: false }),
  });
  const onSubmitData = async (data) => {
    const formData = convertObjToFormData(data);
    onSubmit && (await onSubmit(formData));
  };
  const handleResetForm = () => {
    form.clearErrors();
  };
  useEffect(() => {
    if (current) {
      const fields = [
        "code",
        "name",
        "quantity",
        "price",
        "discount",
        "description",
        "content",
        "imageUrl",
        "categoryID",
      ];
      fields.forEach((field) => {
        form.setValue(
          field,
          field === "categoryID"
            ? current[field]?._id
            : field === "imageUrl"
            ? current["thumb"]
            : current[field]
        );
      });
    }
  }, [current, form]);

  return (
    <form
      className="grid grid-cols-2 lg:grid-cols-1 gap-3"
      onSubmit={form.handleSubmit(onSubmitData)}
    >
      <section>
        <div className="grid grid-cols-2 mb-3 md:flex-row gap-4 w-full text-black">
          <InputField form={form} name="name" placeholder="Product name" />
          <InputField form={form} name="code" placeholder="Product code" />
        </div>
        <div className="grid grid-cols-1 mb-3 md:flex-row gap-4 w-full text-black">
          <SelectField form={form} name="categoryID" />
        </div>
        <div className="grid grid-cols-3 mb-3 md:flex-row gap-4 w-full text-black">
          <InputField
            form={form}
            name="quantity"
            placeholder="Product stock"
            type="number"
          />
          <InputField
            form={form}
            name="price"
            placeholder="Product price"
            type="number"
          />
          <InputField
            form={form}
            name="discount"
            placeholder="Product discount"
            type="number"
          />
        </div>
        <TextareaField
          name="description"
          placeholder="Description"
          form={form}
        />
        <TextareaField name="content" placeholder="Content" form={form} />
      </section>
      <div>
        <FileField form={form} name="imageUrl" current={current} />
        <button
          className="bg-red-500 w-[225px] hover:shadow-red-300/50 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
          type="submit"
        >
          Add Product
        </button>
        <button
          className="bg-blue-500 w-[225px] hover:shadow-blue-300/50 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3 ml-5"
          type="button"
          onClick={handleResetForm}
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
    </form>
  );
};
ProductForm.propTypes = {
  onSubmit: PropTypes.func,
  current: PropTypes.object,
};

export default ProductForm;
