import { formatSalePrice, formatSubtotalPrice } from "@utils/Format";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProductsNoParams } from "../../../app/slice/ProductSlice";
import {
  removeProductCart,
  updateProductCart,
} from "../../../app/slice/CartSlice";

const CartFeature = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.data);
  const { data } = useSelector((state) => state.product);
  const products = data?.products || [];

  useEffect(() => {
    dispatch(getProductsNoParams());
  }, [dispatch]);

  const cartProducts =
    products.length > 0
      ? cart.map((cartItem) => {
          const product = products.find(
            (product) => product._id === cartItem.productId
          );
          return {
            ...cartItem,
            ...product,
            quantity: cartItem.quantity,
            stock: product.quantity,
          };
        })
      : [];

  const handleChangeQuantity = (type, product) => {
    switch (type) {
      case "increment":
        {
          const temp = product.quantity + 1;
          if (temp <= product.stock) {
            dispatch(
              updateProductCart({
                quantity: temp,
                productId: product._id,
              })
            );
          }
        }
        break;
      case "decrement":
        {
          const temp = product.quantity - 1;
          if (temp !== 0) {
            dispatch(
              updateProductCart({
                quantity: temp,
                productId: product._id,
              })
            );
          }
        }
        break;
      default:
        break;
    }
  };
  const handleDeleteItem = (item) => {
    dispatch(removeProductCart(item._id));
  };
  return (
    <section className="bg-[#eeeeee]">
      <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16">
        {cartProducts.length > 0 ? (
          <div className="flex flex-wrap">
            <div className="w-[67%] md-lg:w-full">
              <div className="pr-3 md-lg:pr-0">
                <div className="flex flex-col gap-3">
                  <div className="bg-white p-4">
                    <h2 className="text-md text-green-500 font-semibold">
                      Stock Products {cartProducts.length}
                    </h2>
                  </div>

                  {cartProducts.length > 0 &&
                    cartProducts.map((pt) => (
                      <div
                        key={pt._id}
                        className="w-full flex flex-wrap bg-white p-4"
                      >
                        <div className="flex sm:w-full gap-2 w-7/12">
                          <div className="flex gap-2 justify-start items-center">
                            <img
                              className="w-[80px] h-[80px] object-cover"
                              src={pt.thumb.fileName}
                              alt={pt.name}
                            />
                            <div className="pr-4 text-slate-600">
                              <h2 className="text-md font-semibold">
                                {pt.name}
                              </h2>
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
                                onClick={() =>
                                  handleChangeQuantity("decrement", pt)
                                }
                                className="px-3 cursor-pointer"
                              >
                                -
                              </div>
                              <div className="px-3">{pt.quantity}</div>
                              <div
                                onClick={() =>
                                  handleChangeQuantity("increment", pt)
                                }
                                className="px-3 cursor-pointer"
                              >
                                +
                              </div>
                            </div>
                            <button
                              onClick={() => handleDeleteItem(pt)}
                              className="px-5 py-[3px] bg-red-500 text-white"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

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
                      <span></span>
                    </div>
                    <div className="flex gap-2">
                      <input
                        className="w-full px-3 py-2 border border-slate-200 outline-0 focus:border-green-500 rounded-sm"
                        type="text"
                        placeholder="Input Voucher Coupon"
                      />
                      <button className="px-5 py-[1px] bg-[#059473] text-white rounded-sm uppercase text-sm">
                        Apply
                      </button>
                    </div>

                    <div className="flex justify-between items-center">
                      <span>Total</span>
                      <span className="text-lg text-[#059473]"></span>
                    </div>
                    <button className="px-5 py-[6px] rounded-sm hover:shadow-red-500/50 hover:shadow-lg bg-red-500 text-sm font-medium text-white uppercase ">
                      Process to Checkout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <Link className="px-4 py-1 bg-indigo-500 text-white" to="/shops">
            Shop Now
          </Link>
        )}
      </div>
    </section>
  );
};

export default CartFeature;
