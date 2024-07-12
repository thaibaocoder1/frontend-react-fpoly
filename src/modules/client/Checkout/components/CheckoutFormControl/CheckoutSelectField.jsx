import PropTypes from "prop-types";
import { Controller } from "react-hook-form";

const CheckoutSelectField = ({ form, name, data, selectedProvince }) => {
  const { control } = form;

  return (
    <div className="flex flex-col w-full gap-1 relative">
      <label htmlFor={name}>
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </label>
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
              onChange={(e) => {
                onChange(e.target.value);
                selectedProvince(e.target.selectedOptions[0].dataset.id);
              }}
              value={value || ""}
            >
              <option value="">--Select one province--</option>
              {data &&
                data.map((item) => (
                  <option
                    key={item.province_id}
                    value={item.province_name}
                    data-id={item.province_id}
                  >
                    {item.province_name}
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

CheckoutSelectField.propTypes = {
  form: PropTypes.object,
  name: PropTypes.string.isRequired,
  data: PropTypes.array,
  selectedProvince: PropTypes.func,
};

export default CheckoutSelectField;
