import { getProductsNoParams } from "@app/slice/ProductSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import { removeProductCart, updateProductCart } from "@app/slice/CartSlice";
import ModalConfirmCart from "@components/Modal/ModalConfirmCart";
import toastObj from "@utils/Toast";

const CartList = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.data);
  const { data } = useSelector((state) => state.product);
  const products = data?.products || [];
  const [modalItem, setModalItem] = useState({
    open: false,
    data: {},
  });
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
          } else {
            setModalItem((prev) => ({ ...prev, open: true, data: product }));
          }
        }
        break;
      default:
        break;
    }
  };
  const handleDeleteItem = (item) => {
    dispatch(removeProductCart(item._id));
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
                    <div className="bg-white p-4">
                      <h2 className="text-md text-green-500 font-semibold">
                        Stock Products {cartProducts.length}
                      </h2>
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
        handleClose={() => setModalItem((prev) => ({ ...prev, open: false }))}
        onConfirm={handleDeleteItem}
      />
    </>
  );
};

export default CartList;
