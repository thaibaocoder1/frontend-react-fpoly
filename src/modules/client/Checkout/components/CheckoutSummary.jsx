import { formatOriginalPrice } from "@utils/Format";
import PropTypes from "prop-types";

const CheckoutSummary = ({ cart, totalPrice, shippingPrice }) => {
  return (
    <div className="w-full">
      <div className="bg-white p-3 text-slate-600 flex flex-col gap-3 rounded-lg">
        <h2 className="text-xl font-bold">Order Summary</h2>
        <div className="flex justify-between items-center">
          <span>Items Total ({cart.length})</span>
          <span>{formatOriginalPrice(totalPrice)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Delivery Fee</span>
          <span>{formatOriginalPrice(shippingPrice)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Total</span>
          <span className="text-lg text-[#059473]">
            {formatOriginalPrice(shippingPrice + totalPrice)}
          </span>
        </div>
      </div>
    </div>
  );
};
CheckoutSummary.propTypes = {
  cart: PropTypes.array,
  totalPrice: PropTypes.number,
  shippingPrice: PropTypes.number,
};

export default CheckoutSummary;
