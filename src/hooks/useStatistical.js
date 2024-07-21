import { getStatistical } from "@app/slice/OrderSlice";
import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

const selectOrder = (state) => state.order.data;
const selectOrderState = createSelector([selectOrder], (order) => ({
  statistical: order.statistical,
}));

const useStatistical = () => {
  const dispatch = useDispatch();
  const { statistical } = useSelector(selectOrderState, shallowEqual);
  useEffect(() => {
    const promise = dispatch(getStatistical());
    return () => promise.abort();
  }, [dispatch]);

  return { statistical };
};

export default useStatistical;
