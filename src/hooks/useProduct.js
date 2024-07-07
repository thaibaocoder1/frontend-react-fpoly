import { getProductsWithParams } from "@app/slice/ProductSlice";
import { useEffect, useMemo } from "react";
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
      },
    };
  }, [filters]);

  useEffect(() => {
    const controller = new AbortController();
    dispatch(getProductsWithParams(config, { signal: controller.signal }));
    return () => controller.abort();
  }, [config, dispatch]);

  return { data, loading, error };
};

export default useProduct;
