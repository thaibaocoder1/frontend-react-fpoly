import PropTypes from "prop-types";
import { Controller } from "react-hook-form";

const TextareaField = ({ form, name, placeholder }) => {
  const { control } = form;
  return (
    <div className="flex flex-col w-full gap-1 last-of-type:mt-1">
      <label htmlFor={name} className="text-black">
        {placeholder}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-slate-500"
              name={name}
              id={name}
              placeholder={placeholder}
              cols="10"
              rows="4"
              {...field}
            ></textarea>
            {error && <p className="text-red-500 text-sm">{error.message}</p>}
          </>
        )}
      />
    </div>
  );
};

TextareaField.propTypes = {
  form: PropTypes.object,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default TextareaField;
