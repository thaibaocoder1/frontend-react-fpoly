import { getProductsNoParams } from "@app/slice/ProductSlice";
import { createSelector } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const selectProduct = (state) => state.product;
const selectProductState = createSelector([selectProduct], (product) => ({
  data: product.data,
}));
const useProductHome = (searchTerm = "") => {
  const dispatch = useDispatch();
  const { data } = useSelector(selectProductState, shallowEqual);
  useEffect(() => {
    const promise = dispatch(getProductsNoParams(searchTerm));
    return () => promise.abort();
  }, [dispatch, searchTerm]);

  return { data };
};

export default useProductHome;
