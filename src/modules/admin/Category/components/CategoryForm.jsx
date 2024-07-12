import { createCategory, updateCategory } from "@app/slice/CategorySlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { convertBase64, convertObjToFormData } from "@utils/Convert";
import toastObj from "@utils/Toast";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import slugify from "slugify";
import * as yup from "yup";
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const schema = (isEditMode) =>
  yup.object({
    title: yup.string().required("Please enter this field"),
    imageUrl: yup
      .mixed()
      .required("A file is required")
      .test("required", "A file is required", (value) => {
        return isEditMode ? true : !!value && value.length > 0;
      })
      .test("format", "Please choose one file", (value) => {
        return isEditMode
          ? true
          : !value || (value && SUPPORTED_FORMATS.includes(value[0]?.type));
      }),
  });
const CategoryForm = () => {
  const [image, setImage] = useState("");
  const dispatch = useDispatch();
  const currentCategory = useSelector((state) => state.category.current);
  const isShowDialog = useSelector((state) => state.category.show);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    clearErrors,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema(!!currentCategory)),
  });

  useEffect(() => {
    if (currentCategory) {
      setValue("title", currentCategory.title);
      if (currentCategory.imageUrl) {
        setImage(currentCategory.imageUrl);
      }
    } else {
      setValue("title", "");
      setImage("");
    }
    isShowDialog === false && clearErrors(["title", "imageUrl"]);
  }, [currentCategory, setValue, clearErrors, isShowDialog]);

  const onSubmit = async (data) => {
    data.slug = slugify(data.title, {
      replacement: "-",
      remove: undefined,
      lower: true,
      strict: false,
      locale: "vi",
      trim: true,
    });
    !data.imageUrl[0] && (data.imageUrl = currentCategory.imageUrl);
    let newCategory = convertObjToFormData(data);
    if (currentCategory) {
      newCategory.append("id", currentCategory?._id);
      dispatch(updateCategory(newCategory));
    } else {
      const imageUrl = await convertBase64(data.imageUrl[0]);
      setImage(imageUrl);
      const formData = convertObjToFormData(data);
      dispatch(createCategory(formData));
    }
    toastObj.success("Handle success!");
    reset();
    setImage("");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col w-full gap-1 mb-3">
        <label htmlFor="title">Category Name</label>
        <input
          className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]"
          type="text"
          id="title"
          {...register("title")}
          placeholder="Category name"
        />
        <p className="text-white text-sm">{errors.title?.message}</p>
      </div>

      <div>
        <label
          className="flex justify-center items-center flex-col h-[238px] cursor-pointer border border-dashed hover:border-red-500 w-full border-[#d0d2d6]"
          htmlFor="image"
        >
          {image !== "" ? (
            <img
              src={image}
              alt="Placeholder"
              className={`${image !== "" ? "block" : "hidden"} w-full h-full`}
            />
          ) : (
            <span>Select Image</span>
          )}
        </label>

        <input
          {...register("imageUrl")}
          className="hidden"
          type="file"
          name="imageUrl"
          id="image"
        />
        <p className="text-white text-sm pt-1">{errors.imageUrl?.message}</p>
      </div>
      <div className="mt-4">
        <button className="bg-red-500 w-full hover:shadow-red-300/50 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3">
          Submit
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
