import useCategory from "@hooks/useCategory";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";

const SelectField = ({ form, name }) => {
  const { data } = useCategory();
  const { control } = form;
  return (
    <div className="flex flex-col w-full gap-1 relative">
      <label htmlFor={name}>Category</label>
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
              onChange={(e) => onChange(e.currentTarget.value)}
              value={value || ""}
            >
              <option value="">--Select category--</option>
              {data.categories.length > 0 &&
                data.categories.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.title}
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
