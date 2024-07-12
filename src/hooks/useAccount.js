import { getAllAccount } from "@app/slice/AccountSlice";
import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const useAccount = (filters) => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.account);
  const config = useMemo(() => {
    return {
      params: {
        _page: filters?._page,
        _limit: filters?._limit,
        _search: filters?._search,
      },
    };
  }, [filters]);
  const mountedRef = useRef(false);
  useEffect(() => {
    let promise;
    if (mountedRef.current) {
      promise = dispatch(getAllAccount(config));
    } else {
      mountedRef.current = true;
    }
    return () => promise && promise.abort();
  }, [dispatch, config]);

  return { data, loading, error };
};

export default useAccount;
