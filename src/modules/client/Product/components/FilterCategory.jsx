import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const FilterCategory = ({ onChange }) => {
  const { categories } = useSelector((state) => state.category.data);
  const handleClick = (slug) => {
    onChange &&
      onChange({
        _category: slug,
        _page: 1,
      });
  };
  return (
    <>
      <h2 className="text-3xl font-bold mb-3 text-slate-600">Category</h2>
      <div className="py-2">
        {categories.length > 0 &&
          categories.map((c, i) => (
            <div key={i} className="flex justify-start items-center gap-2 py-1">
              <p
                onClick={() => handleClick(c.slug)}
                className={`text-slate-600 block cursor-pointer transition-all duration-300 hover:pl-2  hover:text-sky-600`}
              >
                {c.title}
              </p>
            </div>
          ))}
      </div>
    </>
  );
};
FilterCategory.propTypes = {
  onChange: PropTypes.func,
};

export default FilterCategory;
