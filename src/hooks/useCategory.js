import { getAllCategory } from "@app/slice/CategorySlice";
import { useEffect, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

const selectCategory = (state) => state.category;
const selectCategoryState = createSelector([selectCategory], (category) => ({
  data: category.data,
  loading: category.loading,
  error: category.error,
}));
const defaultFilters = {
  _page: 1,
  _limit: 10,
  _search: "",
};

const useCategory = (filters = defaultFilters) => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    selectCategoryState,
    shallowEqual
  );

  const config = useMemo(
    () => ({
      params: {
        _page: filters?._page,
        _limit: filters?._limit,
        _search: filters?._search,
      },
    }),
    [filters]
  );

  useEffect(() => {
    const promise = dispatch(getAllCategory(config));
    return () => {
      promise.abort();
    };
  }, [dispatch, config]);

  return { data, loading, error };
};

export default useCategory;
