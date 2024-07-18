import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import PropTypes from "prop-types";
import toastObj from "@utils/Toast";

const FilterPrice = ({ onChange }) => {
  const [values, setValues] = useState({
    _minPrice: "",
    _maxPrice: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = () => {
    if (values._minPrice === "" || values._maxPrice === "") {
      toastObj.error("Enter price to search");
      return;
    }
    onChange && onChange(values);
    setValues({
      _minPrice: "",
      _maxPrice: "",
    });
  };
  return (
    <div className="py-2 flex flex-col gap-2">
      <h2 className="text-3xl font-bold text-slate-600">Price</h2>
      <Box display={"flex"} flexDirection={"column"}>
        <Box
          sx={{
            display: "flex",
            flexFlow: "row nowrap",
            alignItems: "center",
          }}
        >
          <TextField
            variant="standard"
            name="_minPrice"
            onChange={handleChange}
            value={values._minPrice}
          />
          <span style={{ marginInline: 10 }}>-</span>
          <TextField
            variant="standard"
            name="_maxPrice"
            onChange={handleChange}
            value={values._maxPrice}
          />
        </Box>
        <Button
          variant="outlined"
          color="primary"
          sx={{ marginTop: 1, width: 100 }}
          onClick={handleSubmit}
        >
          Apply
        </Button>
      </Box>
    </div>
  );
};
FilterPrice.propTypes = {
  onChange: PropTypes.func,
};

export default FilterPrice;
