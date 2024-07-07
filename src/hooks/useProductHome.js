import { getProductsNoParams } from "@app/slice/ProductSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useProductHome = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    const controller = new AbortController();
    dispatch(getProductsNoParams({ signal: controller.signal }));
    return () => controller.abort();
  }, [dispatch]);

  return { data, loading, error };
};

export default useProductHome;
