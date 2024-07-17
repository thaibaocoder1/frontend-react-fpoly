import { getOrderWithId } from "@app/slice/OrderSlice";
import { useEffect, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

const selectOrder = (state) => state.order.data;
const selectOrderState = createSelector([selectOrder], (order) => ({
  ordersWithUser: order.ordersWithUser,
}));

const useOrderUser = (id, filters) => {
  const config = useMemo(
    () => ({
      params: {
        _page: filters?._page,
        _limit: filters?._limit,
      },
    }),
    [filters]
  );
  const dispatch = useDispatch();
  const { ordersWithUser } = useSelector(selectOrderState, shallowEqual);
  useEffect(() => {
    const promise = dispatch(getOrderWithId({ id, config }));
    return () => promise.abort();
  }, [dispatch, id, config]);

  return { ordersWithUser };
};

export default useOrderUser;
