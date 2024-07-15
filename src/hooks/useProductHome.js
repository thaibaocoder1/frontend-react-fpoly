import { getProductsNoParams } from "@app/slice/ProductSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useProductHome = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.product);
  useEffect(() => {
    const promise = dispatch(getProductsNoParams());
    return () => {
      promise.abort();
    };
  }, [dispatch]);

  return { data, loading, error };
};

export default useProductHome;
