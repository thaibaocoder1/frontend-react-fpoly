import { getAllCategory } from "@app/slice/CategorySlice";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

const defaultFilters = {
  _page: 1,
  _limit: 10,
  _search: "",
};
const useCategory = (filters = defaultFilters) => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.category);
  const config = useMemo(() => {
    return {
      params: {
        _page: filters?._page,
        _limit: filters?._limit,
        _search: filters?._search,
      },
    };
  }, [filters]);

  useEffect(() => {
    const promise = dispatch(getAllCategory(config));
    return () => {
      promise.abort();
    };
  }, [dispatch, config]);

  return { data, loading, error };
};

export default useCategory;
