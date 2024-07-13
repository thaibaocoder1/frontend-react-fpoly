import { formatSalePrice, formatSubtotalPrice } from "@utils/Format";
import PropTypes from "prop-types";

const CartItem = ({ pt, handleChangeQuantity, handleDelete }) => {
  return (
    <div className="w-full flex flex-wrap bg-white p-4">
      <div className="flex sm:w-full gap-2 w-7/12">
        <div className="flex gap-2 justify-start items-center">
          <img
            className="w-[80px] h-[80px] object-cover"
            src={pt.thumb[0].fileName}
            alt={pt.name}
          />
          <div className="pr-4 text-slate-600">
            <h2 className="text-md font-semibold">{pt.name}</h2>
            <span className="text-sm">Code: {pt.code}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between w-5/12 sm:w-full sm:mt-3">
        <div className="pl-4 sm:pl-0">
          <h2 className="text-lg text-orange-500">
            Price: {formatSalePrice(pt.price, pt.discount)}
          </h2>
          <p>Discount: -{pt.discount}%</p>
          <p>Subtotal: {formatSubtotalPrice(pt)}</p>
        </div>
        <div className="flex gap-2 flex-col">
          <div className="flex bg-slate-200 h-[30px] justify-center items-center text-xl">
            <div
              onClick={() => handleChangeQuantity("decrement", pt)}
              className="px-3 cursor-pointer select-none"
            >
              -
            </div>
            <div className="px-3">{pt.quantity}</div>
            <div
              onClick={() => handleChangeQuantity("increment", pt)}
              className="px-3 cursor-pointer select-none"
            >
              +
            </div>
          </div>
          <button
            onClick={() => handleDelete(pt)}
            className="px-5 py-[3px] bg-red-500 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  pt: PropTypes.object.isRequired,
  handleChangeQuantity: PropTypes.func,
  handleDelete: PropTypes.func,
};

export default CartItem;
