import PropTypes from "prop-types";
import { Controller } from "react-hook-form";

const CheckoutSelectFieldDistrict = ({
  form,
  name,
  data,
  selectedDistrict,
}) => {
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
                selectedDistrict(e.target.selectedOptions[0].dataset.id);
              }}
              value={value || ""}
            >
              <option value="">--Select one district--</option>
              {data &&
                data.map((item) => (
                  <option
                    key={item.district_id}
                    value={item.district_name}
                    data-id={item.district_id}
                  >
                    {item.district_name}
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

CheckoutSelectFieldDistrict.propTypes = {
  form: PropTypes.object,
  name: PropTypes.string.isRequired,
  data: PropTypes.array,
  selectedDistrict: PropTypes.func,
};

export default CheckoutSelectFieldDistrict;
