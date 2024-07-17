import { getProductsCart } from "@app/slice/ProductSlice";
import { createSelector } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const selectProduct = (state) => state.product.data;
const selectProductState = createSelector([selectProduct], (product) => ({
  cart: product.cart,
}));
const useProductCart = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector(selectProductState, shallowEqual);
  useEffect(() => {
    const promise = dispatch(getProductsCart());
    return () => promise.abort();
  }, [dispatch]);

  return { cart };
};

export default useProductCart;
