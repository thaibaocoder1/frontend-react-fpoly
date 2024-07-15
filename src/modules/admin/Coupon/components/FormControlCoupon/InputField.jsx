import PropTypes from "prop-types";
import { Controller } from "react-hook-form";

const InputField = ({ form, name, label, type = "text" }) => {
  const { control } = form;
  return (
    <div className="flex flex-col w-full gap-1 mb-3">
      <label htmlFor={name}>{label}</label>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <>
            <input
              {...field}
              className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#ffffff] border border-slate-700 rounded-md text-[#000000]"
              type={type}
              id={name}
              placeholder={label}
            />
            <p className="text-white text-sm">{error && error.message}</p>
          </>
        )}
      />
    </div>
  );
};
InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default InputField;
