import ModalConfirmCategory from "@components/Modal/ModalConfirmCategory";
import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getOneCategory } from "../../../../app/slice/CategorySlice";

const CategoryItem = ({ category, onClick }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const onConfirmClick = () => {
    onClick && onClick(category);
  };

  return (
    <>
      <tr>
        <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
          {category._id}
        </td>
        <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
          <img
            loading="lazy"
            className="w-[80px] h-[80px] md:w-full md:h-full object-cover"
            src={category.imageUrl}
            alt={category.title}
          />
        </td>
        <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
          {category.title}
        </td>

        <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
          <div className="flex justify-start items-center gap-2">
            <span
              onClick={() => {
                dispatch(getOneCategory(category._id));
              }}
              className="text-white p-[6px] cursor-pointer bg-sky-500 rounded hover:shadow-lg hover:shadow-sky-500/50"
            >
              Edit
            </span>
            <span
              onClick={() => setOpen(true)}
              className="text-white p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50 cursor-pointer"
            >
              Delete
            </span>
          </div>
        </td>
      </tr>
      <ModalConfirmCategory
        open={open}
        handleClose={() => setOpen(false)}
        onConfirm={onConfirmClick}
      />
    </>
  );
};
CategoryItem.propTypes = {
  category: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default CategoryItem;
