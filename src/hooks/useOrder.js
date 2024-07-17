import { getOrderWithId } from "@app/slice/OrderSlice";
import { useEffect, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

const selectOrder = (state) => state.order.data;
const selectOrderState = createSelector([selectOrder], (order) => ({
  orders: order.data,
}));

const useOrder = (filters, id) => {
  const dispatch = useDispatch();
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

  const orders = useSelector(selectOrderState, shallowEqual);

  useEffect(() => {
    const promise = dispatch(getOrderWithId(id, config));
    return () => promise.abort();
  }, [config, dispatch, id]);

  return orders;
};

export default useOrder;
