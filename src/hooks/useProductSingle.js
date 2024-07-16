import { getOneProduct } from "@app/slice/ProductSlice";
import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

const selectProduct = (state) => state.product;
const selectCurrentProduct = createSelector([selectProduct], (product) => ({
  current: product.current,
}));

const useProductSingle = (productId) => {
  const dispatch = useDispatch();
  const { current } = useSelector(selectCurrentProduct, shallowEqual);

  useEffect(() => {
    const promise = dispatch(getOneProduct(productId));
    return () => promise.abort();
  }, [productId, dispatch]);

  return { current };
};

export default useProductSingle;
