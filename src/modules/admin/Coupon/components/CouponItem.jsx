import { getOneCoupon } from "@app/slice/CouponSlice";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

const CategoryItem = ({ coupon, onClick }) => {
  const dispatch = useDispatch();
  const handleClickDelete = (id) => {
    onClick && onClick(id);
  };

  return (
    <tr>
      <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
        {coupon._id}
      </td>
      <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
        {coupon.name}
      </td>
      <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
        {coupon.value}%
      </td>
      <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
        {new Date(coupon.expireIns).toLocaleDateString("vi-VN")}
      </td>
      <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
        <div className="flex justify-start items-center gap-2">
          <span
            onClick={() => {
              dispatch(getOneCoupon(coupon._id));
            }}
            className="text-white p-[6px] cursor-pointer bg-sky-500 rounded hover:shadow-lg hover:shadow-sky-500/50"
          >
            Edit
          </span>
          <span
            onClick={() => handleClickDelete(coupon._id)}
            className="text-white p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50 cursor-pointer"
          >
            Delete
          </span>
        </div>
      </td>
    </tr>
  );
};
CategoryItem.propTypes = {
  coupon: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default CategoryItem;
