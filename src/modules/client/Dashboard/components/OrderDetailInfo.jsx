import { formatOrderStatus, formatOriginalPrice } from "@utils/Format";
import PropTypes from "prop-types";

const OrderDetailInfo = ({ current }) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="flex flex-col gap-2 font-semibold">
        <h2 className="text-slate-600 font-sans">
          Deliver To : <span className="pt-2 text-sm">{current.fullname}</span>
        </h2>
        <p>
          <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2 py-2 rounded">
            Home
          </span>
          <span className="text-slate-600 text-sm" id="shippingAddress">
            {current.address}
          </span>
        </p>
        <p className="text-slate-600 text-md font-semibold">
          Email to: {current.email}
        </p>
      </div>

      <div className="flex flex-col gap-2 text-slate-600 font-semibold">
        <p>
          Delivery Fee
          <span className="text-sm px-3 rounded-md">
            {formatOriginalPrice(current.deliveryFee)}
          </span>
        </p>
        <p>
          Payment Status:
          <span className="text-sm px-3 rounded-md">Waiting</span>
        </p>
        <p>
          Order Status:
          <span className="text-sm px-3 rounded-md">
            {formatOrderStatus(current.status)}
          </span>
        </p>
      </div>
    </div>
  );
};
OrderDetailInfo.propTypes = {
  current: PropTypes.object,
};

export default OrderDetailInfo;
