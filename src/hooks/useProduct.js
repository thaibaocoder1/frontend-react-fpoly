import { getProductsWithParams } from "@app/slice/ProductSlice";
import { useEffect, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

const selectProduct = (state) => state.product;

const selectProductState = createSelector([selectProduct], (product) => ({
  data: product.data,
}));

const useProduct = (filters) => {
  const dispatch = useDispatch();

  const config = useMemo(
    () => ({
      params: {
        _page: filters?._page,
        _limit: filters?._limit,
        _category: filters?._category,
        _search: filters?._search,
      },
    }),
    [filters]
  );

  const { data } = useSelector(selectProductState, shallowEqual);

  useEffect(() => {
    const promise = dispatch(getProductsWithParams(config));
    return () => promise.abort();
  }, [config, dispatch]);

  return { data };
};

export default useProduct;
