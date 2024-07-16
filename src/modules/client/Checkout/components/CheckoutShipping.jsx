import { useDispatch, useSelector } from "react-redux";
import CheckoutFormShip from "./CheckoutFormShip";
import { addOrder } from "@app/slice/OrderSlice";
import PropTypes from "prop-types";

const CheckoutShipping = ({ shippingPrice }) => {
  const userLoggined = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const handleSubmitData = async (data) => {
    try {
      data.userId = userLoggined._id;
      data.deliveryFee = shippingPrice;
      const order = await dispatch(addOrder(data));
      if (order.type.includes("fulfilled")) {
        const { payload } = order;
        console.log("🚀 ~ handleSubmitData ~ payload:", payload);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-white p-6 shadow-sm rounded-md">
      <h2 className="text-slate-600 text-xl font-bold pb-3">
        Shipping Information
      </h2>
      <CheckoutFormShip onSubmit={handleSubmitData} />
    </div>
  );
};
CheckoutShipping.propTypes = {
  shippingPrice: PropTypes.number,
};

export default CheckoutShipping;
