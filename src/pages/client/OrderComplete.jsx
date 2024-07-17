import { useDispatch } from "react-redux";
import complete from "../../assets/banner/complete.png";
import { useEffect } from "react";
import { clearCart } from "@app/slice/CartSlice";
import { Link } from "react-router-dom";
import { clearCoupon } from "@app/slice/CouponSlice";

const OrderComplete = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearCart());
    dispatch(clearCoupon());
  }, [dispatch]);
  return (
    <div className="max-w-3xl mx-auto px-4 pt-16 pb-24 text-center">
      <div className="mb-8">
        <img src={complete} className="w-16 inline-block" loading="lazy" />
      </div>
      <h2 className="text-gray-800 font-medium text-3xl mb-3">
        YOUR ORDER IS COMPLETED!
      </h2>
      <p className="text-gray-600">
        Thank you for your order! Your order is being processed and will be
        complete with 3-6 hours. You will receive and email confirmation when
        you order is completed
      </p>

      <div className="mt-10">
        <Link
          to="/shops"
          className="bg-[#059473] border border-primary text-white px-6 py-3 font-medium rounded-md uppercase transition text-center"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderComplete;
