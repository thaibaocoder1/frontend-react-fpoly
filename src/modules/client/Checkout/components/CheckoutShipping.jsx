import {
  addOrder,
  addOrderDetailList,
  setEmptyError,
} from "@app/slice/OrderSlice";
import { updateFieldProduct } from "@app/slice/ProductSlice";
import { handleOrderDetailList } from "@utils/Order";
import toastObj from "@utils/Toast";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import CheckoutFormShip from "./CheckoutFormShip";
import { useNavigate } from "react-router-dom";
import { makePayment } from "@utils/Payment";

const CheckoutShipping = ({ shippingPrice, cart }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLoggined = useSelector((state) => state.auth.user);
  const couponStorage = useSelector(
    (state) => state.coupon.data.couponStorage,
    shallowEqual
  );
  const isHasError = useSelector((state) => state.order.error);
  const handleSubmitData = async (data) => {
    try {
      data.userId = userLoggined._id;
      data.coupons = couponStorage;
      data.deliveryFee = shippingPrice;
      if (data.payment === "Online") {
        const checkoutSuccessful = await makePayment(cart);
        if (!checkoutSuccessful) {
          return;
        }
      }
      const order = await dispatch(addOrder(data));
      if (order.type.includes("fulfilled")) {
        const { changeQuantityProduct, orderDetailList } =
          handleOrderDetailList(order, cart);
        const results = await Promise.all([
          dispatch(addOrderDetailList(orderDetailList)),
          dispatch(updateFieldProduct(changeQuantityProduct)),
        ]);
        if (results && results.length > 0) {
          toastObj.success("Checkout successfully!");
          navigate("/order/complete", { replace: true });
        }
      }
    } catch (error) {
      toastObj.error(error.message);
    }
  };
  useEffect(() => {
    if (isHasError) {
      toastObj.error(isHasError);
      dispatch(setEmptyError());
    }
  }, [isHasError, dispatch]);
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
  cart: PropTypes.array,
};

export default CheckoutShipping;
