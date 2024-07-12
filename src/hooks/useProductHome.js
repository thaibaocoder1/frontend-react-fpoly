import { getProductsNoParams } from "@app/slice/ProductSlice";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const useProductHome = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.product);
  const mountedRef = useRef(false);
  useEffect(() => {
    let promise;
    if (mountedRef.current) {
      promise = dispatch(getProductsNoParams());
    } else {
      mountedRef.current = true;
    }
    return () => promise && promise.abort();
  }, [dispatch]);

  return { data, loading, error };
};

export default useProductHome;
