import { getOneOrderWithId } from "@app/slice/OrderSlice";
import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

const selectOrder = (state) => state.order;
const selectOrderState = createSelector([selectOrder], (order) => ({
  current: order.current,
}));

const useSingleOrderUser = (id) => {
  const dispatch = useDispatch();
  const { current } = useSelector(selectOrderState, shallowEqual);
  useEffect(() => {
    const promise = dispatch(getOneOrderWithId(id));
    return () => promise.abort();
  }, [dispatch, id]);

  return { current };
};

export default useSingleOrderUser;
