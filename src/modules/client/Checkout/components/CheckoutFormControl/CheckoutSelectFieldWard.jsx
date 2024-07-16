import PropTypes from "prop-types";
import { Controller } from "react-hook-form";

const CheckoutSelectFieldWard = ({ form, name, data }) => {
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
              }}
              value={value}
            >
              <option value="">--Select one ward--</option>
              {data &&
                data.map((item) => (
                  <option key={item.ward_id} value={item.ward_name}>
                    {item.ward_name}
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

CheckoutSelectFieldWard.propTypes = {
  form: PropTypes.object,
  name: PropTypes.string.isRequired,
  data: PropTypes.array,
};

export default CheckoutSelectFieldWard;
