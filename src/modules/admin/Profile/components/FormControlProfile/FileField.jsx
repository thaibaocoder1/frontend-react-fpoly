import { convertBase64 } from "@utils/Convert";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

const FileField = ({ form, name, current }) => {
  const [image, setImage] = useState("");
  const { control } = form;
  useEffect(() => {
    if (current) {
      setImage(current.imageUrl.fileName);
    }
  }, [current]);
  return (
    <>
      <div className="sm:gap-4 md:gap-4 gap-3 w-full text-[#d0d2d6] mb-4">
        <label
          className="flex justify-center items-center flex-col h-[180px] cursor-pointer border border-dashed hover:border-red-500 w-full text-[#d0d2d6]"
          htmlFor={name}
        >
          {image ? (
            <div className="flex justify-center items-center flex-col h-full w-[200px] cursor-pointerhover:border-red-500 relative">
              <img
                src={image}
                alt="image"
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <>
              <span>Add Image</span>
            </>
          )}
        </label>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange }, fieldState: { error } }) => (
            <>
              <input
                onChange={async (e) => {
                  const imageBase64 = await convertBase64(e.target.files[0]);
                  setImage(imageBase64);
                  onChange(e.target.files);
                }}
                type="file"
                id={name}
                className="hidden"
                accept="image/*"
              />
              {error && (
                <p className="text-red-500 text-sm mt-1">{error.message}</p>
              )}
            </>
          )}
          rules={{
            validate: (value) => value && value.length > 0,
          }}
        />
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
