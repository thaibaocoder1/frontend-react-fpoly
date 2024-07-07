import { getOneProduct } from "@app/slice/ProductSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useProductSingle = (productId) => {
  const dispatch = useDispatch();
  const { current, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    const controller = new AbortController();
    dispatch(getOneProduct(productId, { signal: controller.signal }));
    return () => controller.abort();
  }, [productId, dispatch]);

  return { current, loading, error };
};

export default useProductSingle;
