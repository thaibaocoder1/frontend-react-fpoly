import { debounce } from "@utils/Debounce";
import PropTypes from "prop-types";

const SearchItem = ({ onChange }) => {
  const handleSearchInput = (e) => {
    onChange && onChange(e.target.value);
  };
  const debouncedHandleSearchInput = debounce(handleSearchInput, 700);
  return (
    <input
      type="text"
      className="w-[200px] px-3 py-1 border border-gray-300 rounded-sm focus:outline-none focus:border-blue-500 mr-2 placeholder:text-sm"
      placeholder="Search..."
      name="search"
      onChange={debouncedHandleSearchInput}
    />
  );
};
SearchItem.propTypes = {
  onChange: PropTypes.func,
};

export default SearchItem;
