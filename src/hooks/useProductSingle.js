import { getOneProduct } from "@app/slice/ProductSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useProductSingle = (productId) => {
  const dispatch = useDispatch();
  const { current, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    const promise = dispatch(getOneProduct(productId));
    return () => promise.abort();
  }, [productId, dispatch]);

  return { current, loading, error };
};

export default useProductSingle;
