import {
  clearCart,
  removeProductCart,
  updateProductCart,
} from "@app/slice/CartSlice";
import ModalConfirmCart from "@components/Modal/ModalConfirmCart";
import useProductCart from "@hooks/useProductCart";
import toastObj from "@utils/Toast";
import { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

const CartList = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.data, shallowEqual);
  const { cart: results } = useProductCart();
  const [modalItem, setModalItem] = useState({
    open: false,
    data: {},
    all: false,
  });

  const cartProducts =
    results.length > 0
      ? cart.map((cartItem) => {
          const product = results.find(
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
          } else {
            setModalItem((prev) => ({ ...prev, open: true, data: product }));
          }
        }
        break;
      default:
        break;
    }
  };
  const handleDeleteItem = (item, all) => {
    all ? dispatch(clearCart()) : dispatch(removeProductCart(item._id));
    toastObj.success("Remove success!");
  };
  return (
    <>
      <section className="bg-[#eeeeee]">
        <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16">
          {cartProducts.length > 0 ? (
            <div className="flex flex-wrap">
              <div className="w-[67%] md-lg:w-full">
                <div className="pr-3 md-lg:pr-0">
                  <div className="flex flex-col gap-3">
                    <div className="bg-white p-4 flex justify-between items-center">
                      <h2 className="text-md text-green-500 font-semibold">
                        Stock Products {cartProducts.length}
                      </h2>
                      <button
                        className="px-5 py-[3px] bg-red-500 text-white"
                        onClick={() =>
                          setModalItem((prev) => ({
                            ...prev,
                            open: true,
                            all: true,
                          }))
                        }
                      >
                        Delete all
                      </button>
                    </div>

                    {cartProducts.length > 0 &&
                      cartProducts.map((pt) => (
                        <CartItem
                          key={pt._id}
                          pt={pt}
                          handleDelete={() =>
                            setModalItem((prev) => ({
                              ...prev,
                              open: true,
                              data: pt,
                            }))
                          }
                          handleChangeQuantity={handleChangeQuantity}
                        />
                      ))}
                  </div>
                </div>
              </div>
              <CartSummary cart={cartProducts} />
            </div>
          ) : (
            <Link className="px-4 py-1 bg-indigo-500 text-white" to="/shops">
              Shop Now
            </Link>
          )}
        </div>
      </section>
      <ModalConfirmCart
        open={modalItem.open}
        item={modalItem.data}
        all={modalItem.all}
        handleClose={() =>
          setModalItem((prev) => ({ ...prev, open: false, all: false }))
        }
        onConfirm={handleDeleteItem}
      />
    </>
  );
};

export default CartList;
