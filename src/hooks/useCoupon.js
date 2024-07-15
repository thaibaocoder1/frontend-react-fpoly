import { getAllCoupons } from "@app/slice/CouponSlice";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

const useCoupon = (filters) => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.coupon);
  const config = useMemo(() => {
    return {
      params: {
        _page: filters?._page,
        _limit: filters?._limit,
        _search: filters?._search,
      },
    };
  }, [filters]);

  useEffect(() => {
    const promise = dispatch(getAllCoupons(config));
    return () => promise.abort();
  }, [dispatch, config]);

  return { data, loading, error };
};

export default useCoupon;
