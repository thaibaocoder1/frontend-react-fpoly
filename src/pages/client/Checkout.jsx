import CheckoutCart from "@modules/client/Checkout/components/CheckoutCart";
import CheckoutShipping from "@modules/client/Checkout/components/CheckoutShipping";
import CheckoutSummary from "@modules/client/Checkout/components/CheckoutSummary";
import { Link, useLocation } from "react-router-dom";

const CheckoutPage = () => {
  const location = useLocation();
  const { cart, totalPrice, shippingPrice } = location.state || [];
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
          <div className="w-full flex">
            <div className="w-[60%] md-lg:w-full">
              <CheckoutShipping />
            </div>
            <div className="w-[35%] md-lg:w-full pl-3 md-lg:pl-0 md-lg:mt-5">
              <CheckoutCart cart={cart} />
              <CheckoutSummary
                cart={cart}
                totalPrice={totalPrice}
                shippingPrice={shippingPrice}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CheckoutPage;
