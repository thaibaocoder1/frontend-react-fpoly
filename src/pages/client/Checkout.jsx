import CartKeys from "@constants/CartKeys";
import useProductCart from "@hooks/useProductCart";
import CheckoutCart from "@modules/client/Checkout/components/CheckoutCart";
import CheckoutShipping from "@modules/client/Checkout/components/CheckoutShipping";
import CheckoutSkeleton from "@modules/client/Checkout/components/CheckoutSkeleton";
import CheckoutSummary from "@modules/client/Checkout/components/CheckoutSummary";
import { shallowEqual, useSelector } from "react-redux";
import { Link, Navigate, useLocation } from "react-router-dom";

const CheckoutPage = () => {
  const location = useLocation();
  const state = location.state;
  const { cart: products } = useProductCart();
  const cart = useSelector((state) => state.cart.data, shallowEqual);
  if (cart.length === 0) return <Navigate to={"/login"} replace />;
  const cartProducts =
    products.length > 0
      ? cart
          .map((cartItem) => {
            const product = products?.find(
              (product) => product._id === cartItem.productId
            );
            if (!product) return null;
            return {
              ...cartItem,
              ...product,
              quantity: cartItem.quantity,
              stock: product.quantity,
            };
          })
          .filter((item) => item.isBuyNow)
      : [];
  const shippingPrice =
    products.length > 0 && cartProducts.length * CartKeys.SHIPPING;
  const totalPrice =
    cartProducts.length > 0 &&
    cartProducts.reduce(
      (total, item) =>
        total + item.quantity * ((100 - item.discount) / 100) * item.price,
      0
    );
  if (cartProducts.length === 0 && state.cart && state.cart.length === 0)
    return <CheckoutSkeleton />;
  return (
    <>
      <section className="bg-[url('/images/checkout.jpg')] h-[300px] mt-6 bg-cover bg-no-repeat relative bg-left">
        <div className="absolute left-0 top-0 w-full h-full bg-[#2422228a]">
          <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
            <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-white">
              <h2 className="text-3xl font-bold">Checkout</h2>
              <div className="flex justify-center items-center gap-2 text-lg w-full">
                <Link to="/" className="hover:underline">
                  Home
                </Link>
                <span className="pt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
                <span>Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#eeeeee]">
        <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16">
          <div className="w-full flex lg:flex-col">
            <div className="w-[60%] lg:w-full">
              <CheckoutShipping
                shippingPrice={
                  state && state.prevPath.includes("cart")
                    ? state.shippingPrice
                    : shippingPrice
                }
                cart={
                  state && state.prevPath.includes("cart")
                    ? state.cart
                    : cartProducts
                }
              />
            </div>
            <div className="w-[35%] lg:w-full pl-3 lg:pl-0 lg:mt-3">
              <CheckoutCart
                cart={
                  state && state.prevPath.includes("cart")
                    ? state.cart
                    : cartProducts
                }
              />
              <CheckoutSummary
                cart={
                  state && state.prevPath.includes("cart")
                    ? state.cart
                    : cartProducts
                }
                totalPrice={
                  state && state.prevPath.includes("cart")
                    ? state.totalPrice
                    : totalPrice
                }
                shippingPrice={
                  state && state.prevPath.includes("cart")
                    ? state.shippingPrice
                    : shippingPrice
                }
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CheckoutPage;
