import PropTypes from "prop-types";
import { Controller } from "react-hook-form";

const InputField = ({ placeholder, name, form, type = "text" }) => {
  const { control } = form;
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name}>{placeholder}</label>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-slate-500"
              type={type}
              id={name}
              placeholder={placeholder}
              {...field}
            />
            {error && <p className="text-red-500 text-sm">{error.message}</p>}
          </>
        )}
      />
    </div>
  );
};

InputField.propTypes = {
  form: PropTypes.object,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default InputField;
