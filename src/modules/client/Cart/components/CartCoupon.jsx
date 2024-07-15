import PropTypes from "prop-types";
import { FaTrash } from "react-icons/fa";

const CartCoupon = ({ coupon, onClickDelete }) => {
  const handleClickDelete = (name) => {
    onClickDelete && onClickDelete(name);
  };
  return (
    <div className="flex justify-between items-center border-b border-b-slate-300 py-1">
      <span className="text-base font-medium">{coupon.name}</span>
      <div className="flex items-center gap-1">
        <span className="text-base text-green-500">{coupon.value}%</span>
        <span
          className="cursor-pointer"
          onClick={() => handleClickDelete(coupon.name)}
        >
          <FaTrash />
        </span>
      </div>
    </div>
  );
};
CartCoupon.propTypes = {
  coupon: PropTypes.object,
  onClickDelete: PropTypes.func,
};

export default CartCoupon;
