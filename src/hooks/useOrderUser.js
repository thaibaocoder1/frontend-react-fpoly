import { getOrderWithId } from "@app/slice/OrderSlice";
import { useEffect, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

const selectOrder = (state) => state.order.ordersWithUser;
const selectOrderState = createSelector([selectOrder], (order) => ({
  orders: order.orders,
  pagination: order.pagination,
}));

const useOrderUser = (id, filters) => {
  const config = useMemo(
    () => ({
      params: {
        _page: filters?._page,
        _limit: filters?._limit,
        _status: filters?._status,
        _all: filters?._all,
      },
    }),
    [filters]
  );
  const dispatch = useDispatch();
  const { orders, pagination } = useSelector(selectOrderState, shallowEqual);
  useEffect(() => {
    const promise = dispatch(getOrderWithId({ id, config }));
    return () => promise.abort();
  }, [dispatch, id, config]);

  return { orders, pagination };
};

export default useOrderUser;
