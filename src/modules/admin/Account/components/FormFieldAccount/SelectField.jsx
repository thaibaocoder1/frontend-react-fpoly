import PropTypes from "prop-types";
import { Controller } from "react-hook-form";

const SelectField = ({ form, name }) => {
  const { control } = form;
  return (
    <div className="flex flex-col w-full gap-1 relative">
      <label htmlFor={name}>Role</label>
      <Controller
        name={name}
        control={control}
        render={({
          field: { onBlur, onChange, value },
          fieldState: { error },
        }) => (
          <>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none text-slate-500"
              id={name}
              onBlur={onBlur}
              onChange={(e) => onChange(e.target.value)}
              value={value || ""}
            >
              <option value="">--Select one role--</option>
              {["User", "Admin"].map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            {error && <p className="text-red-500 text-sm">{error.message}</p>}
          </>
        )}
      />
    </div>
  );
};

SelectField.propTypes = {
  form: PropTypes.object,
  name: PropTypes.string.isRequired,
};

export default SelectField;
