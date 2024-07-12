import { converMutipletBase64 } from "@utils/Convert";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { CiCircleRemove } from "react-icons/ci";

const FileField = ({ name, form, current }) => {
  const { control } = form;
  const [imageList, setImageList] = useState([]);
  useEffect(() => {
    if (current) {
      setImageList(current.thumb);
    }
  }, [current, form]);
  const handleRemoveImage = (item) => {
    const imageListClone = JSON.parse(JSON.stringify(imageList)).filter(
      (img) => img._id !== item._id
    );
    setImageList(imageListClone);
    form.setValue("imageUrl", imageListClone);
  };
  return (
    <>
      <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 gap-3 w-full  text-black mb-4">
        <label
          className="flex justify-center items-center flex-col h-[180px] cursor-pointer border border-dashed border-slate-500 hover:border-red-500 w-full text-black"
          htmlFor={name}
        >
          <span>Add Image</span>
          <Controller
            name={name}
            control={control}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <>
                <input
                  type="file"
                  id={name}
                  name={name}
                  multiple
                  className="hidden"
                  onChange={async (e) => {
                    const files = e.target.files;
                    const images = await converMutipletBase64(
                      Array.from(files)
                    );
                    setImageList([...imageList, ...images]);
                    return onChange([...imageList, ...files]);
                  }}
                />
                {error && (
                  <p className="text-red-500 text-sm">{error.message}</p>
                )}
              </>
            )}
            rules={{
              validate: (value) => {
                return value && value.length > 0;
              },
            }}
          />
        </label>
      </div>
      <div className="grid grid-cols-5 md-lg:grid-cols-3 sm:w-full gap-4">
        {imageList.length > 0
          ? imageList.map((item, index) => (
              <div
                key={index}
                className="flex justify-center items-center flex-col h-[140px] cursor-pointer border border-dashed border-slate-500 hover:border-red-500 w-full mb-4 relative"
              >
                <div
                  className="absolute w-5 h-5 bg-red-500 right-0 top-0 -translate-y-1/2 translate-x-1/2 text-white flex items-center justify-center z-50"
                  onClick={() => handleRemoveImage(item)}
                >
                  <CiCircleRemove />
                </div>
                <img
                  src={typeof item === "string" ? item : item.fileName}
                  alt="image"
                  className="w-full h-full object-cover"
                />
              </div>
            ))
          : ""}
      </div>
    </>
  );
};

FileField.propTypes = {
  form: PropTypes.object,
  name: PropTypes.string.isRequired,
  current: PropTypes.object,
};

export default FileField;
