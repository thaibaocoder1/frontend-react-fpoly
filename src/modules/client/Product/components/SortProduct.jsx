import PropTypes from "prop-types";

const SortProduct = ({ onChange }) => {
  const handleSortChange = (e) => {
    onChange && onChange(e.target.value);
  };
  return (
    <select
      className="p-1 border outline-0 text-slate-600 font-semibold"
      name="sort"
      onChange={handleSortChange}
    >
      <option value="">Sort By</option>
      <option value="ASC">Low to High Price</option>
      <option value="DESC">High to Low Price </option>
    </select>
  );
};
SortProduct.propTypes = {
  onChange: PropTypes.func,
};

export default SortProduct;
