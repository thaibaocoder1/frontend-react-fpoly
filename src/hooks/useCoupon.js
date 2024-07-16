import { getAllCoupons } from "@app/slice/CouponSlice";
import { useEffect, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

const selectCoupon = (state) => state.coupon;

const selectCouponState = createSelector([selectCoupon], (coupon) => ({
  data: coupon.data,
  loading: coupon.loading,
  error: coupon.error,
}));

const useCoupon = (filters) => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(selectCouponState, shallowEqual);

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
    const promise = dispatch(getAllCoupons(config));
    return () => promise.abort();
  }, [dispatch, config]);

  return { data, loading, error };
};

export default useCoupon;
