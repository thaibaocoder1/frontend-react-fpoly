import {
  checkCoupon,
  deleteCouponStorage,
  setEmptyError,
} from "@app/slice/CouponSlice";
import CartKeys from "@constants/CartKeys";
import { formatOriginalPrice } from "@utils/Format";
import toastObj from "@utils/Toast";
import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartCoupon from "./CartCoupon";

const CartSummary = ({ cart = [] }) => {
  const [value, setValue] = useState("");
  const distpatch = useDispatch();
  const isHasError = useSelector((state) => state.coupon.error);
  const { couponStorage } = useSelector(
    (state) => state.coupon.data,
    shallowEqual
  );
  const totalPrice = useMemo(() => {
    return cart.reduce(
      (total, item) =>
        total + item.quantity * ((100 - item.discount) / 100) * item.price,
      0
    );
  }, [cart]);
  const shippingPrice = useMemo(() => {
    let percentCoupon;
    if (couponStorage.length > 0) {
      percentCoupon = couponStorage.reduce((acc, item) => {
        return (acc + item.value) / 100;
      }, 0);
    } else {
      percentCoupon = 0;
    }
    return cart.length * CartKeys.SHIPPING * (1 - percentCoupon);
  }, [cart, couponStorage]);

  const handleApplyCoupon = async () => {
    if (value) {
      const data = await distpatch(checkCoupon(value));
      data && setValue("");
    } else {
      toastObj.error("Please fill into input");
    }
  };
  const handleDeleteCoupon = (name) => {
    distpatch(deleteCouponStorage(name));
  };
  useEffect(() => {
    if (isHasError) {
      toastObj.error(isHasError);
      distpatch(setEmptyError());
    }
  }, [isHasError, distpatch]);
  return (
    <div className="w-[33%] md-lg:w-full">
      <div className="pl-3 md-lg:pl-0 md-lg:mt-5">
        {cart.length > 0 && (
          <div className="bg-white p-3 text-slate-600 flex flex-col gap-3">
            <h2 className="text-xl font-bold">Order Summary</h2>
            <div className="flex justify-between items-center">
              <span>Items</span>
              <span>{cart.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Shipping Fee</span>
              <span>{formatOriginalPrice(shippingPrice)}</span>
            </div>
            <div className="flex gap-2">
              <input
                className="w-full px-3 py-2 border border-slate-200 outline-0 focus:border-green-500 rounded-sm"
                type="text"
                placeholder="Input Voucher Coupon"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <button
                onClick={handleApplyCoupon}
                className="px-5 py-[1px] bg-[#059473] text-white rounded-sm uppercase text-sm"
              >
                Apply
              </button>
            </div>
            {couponStorage.length > 0 &&
              couponStorage.map((item) => (
                <CartCoupon
                  key={item.name}
                  coupon={item}
                  onClickDelete={handleDeleteCoupon}
                />
              ))}
            <div className="flex justify-between items-center">
              <span>Total</span>
              <span className="text-lg text-[#059473]">
                {formatOriginalPrice(totalPrice + shippingPrice)}
              </span>
            </div>
            <Link
              to="/checkout"
              state={{
                cart: cart.map((item) => ({
                  ...item,
                  isBuyNow: true,
                })),
                totalPrice,
                shippingPrice,
                prevPath: "cart",
              }}
              disabled={cart.length === 0}
              className="px-5 py-[6px] rounded-sm hover:shadow-red-500/50 hover:shadow-lg bg-red-500 text-sm font-medium text-white uppercase text-center"
            >
              Process to Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

CartSummary.propTypes = {
  cart: PropTypes.array.isRequired,
};

export default CartSummary;
