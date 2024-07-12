import { getProductsWithParams } from "@app/slice/ProductSlice";
import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const useProduct = (filters) => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.product);
  const config = useMemo(() => {
    return {
      params: {
        _page: filters?._page,
        _limit: filters?._limit,
        _category: filters?._category,
        _search: filters?._search,
      },
    };
  }, [filters]);
  const mountedRef = useRef(false);
  useEffect(() => {
    let promise;
    if (mountedRef.current) {
      promise = dispatch(getProductsWithParams(config));
    } else {
      mountedRef.current = true;
    }
    return () => promise && promise.abort();
  }, [config, dispatch]);

  return { data, loading, error };
};

export default useProduct;
