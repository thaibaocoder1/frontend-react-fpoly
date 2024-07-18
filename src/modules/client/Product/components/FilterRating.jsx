import { Rating } from "@mui/material";
import { AiFillStar } from "react-icons/ai";
import PropTypes from "prop-types";

const FilterRating = ({ onChange }) => {
  const handleChangeRating = (_, value) => {
    onChange && onChange({ _rating: value });
  };
  return (
    <div className="py-3 flex flex-col gap-4">
      <h2 className="text-3xl font-bold mb-3 text-slate-600">Rating</h2>
      <Rating
        icon={<AiFillStar />}
        size="large"
        defaultValue={5}
        onChange={handleChangeRating}
      />
    </div>
  );
};
FilterRating.propTypes = {
  onChange: PropTypes.func,
};

export default FilterRating;
