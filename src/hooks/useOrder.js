import { getOrderWithoutId } from "@app/slice/OrderSlice";
import { useEffect, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

const selectOrder = (state) => state.order.data;
const selectOrderState = createSelector([selectOrder], (order) => ({
  orders: order.orders,
  pagination: order.pagination,
}));

const useOrder = (filters) => {
  const dispatch = useDispatch();
  const config = useMemo(
    () => ({
      params: {
        _page: filters?._page,
        _limit: filters?._limit,
        _search: filters?._search,
        _status: filters?._status,
        _all: filters?._all,
      },
    }),
    [filters]
  );
  const { orders, pagination } = useSelector(selectOrderState, shallowEqual);
  useEffect(() => {
    const promise = dispatch(getOrderWithoutId(config));
    return () => promise.abort();
  }, [config, dispatch]);

  return { orders, pagination };
};

export default useOrder;
