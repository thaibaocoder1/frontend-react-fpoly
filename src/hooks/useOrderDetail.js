import { getOrderDetailWithId } from "@app/slice/OrderSlice";
import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

const selectOrder = (state) => state.order;
const selectOrderState = createSelector([selectOrder], (order) => ({
  details: order.details,
}));

const useOrderDetail = (id) => {
  const dispatch = useDispatch();
  const { details } = useSelector(selectOrderState, shallowEqual);
  useEffect(() => {
    const promise = dispatch(getOrderDetailWithId(id));
    return () => promise.abort();
  }, [dispatch, id]);

  return { details };
};

export default useOrderDetail;
