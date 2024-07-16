import { getAllAccount } from "@app/slice/AccountSlice";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { createSelector } from "reselect";

const selectAccount = (state) => state.account;

const selectAccountState = createSelector([selectAccount], (account) => ({
  data: account.data,
  loading: account.loading,
  error: account.error,
}));

const useAccount = (filters) => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    selectAccountState,
    shallowEqual
  );

  const config = useMemo(
    () => ({
      params: {
        _page: filters?._page,
        _limit: filters?._limit,
        _search: filters?._search,
      },
    }),
    [filters?._page, filters?._limit, filters?._search]
  );

  useEffect(() => {
    const promise = dispatch(getAllAccount(config));
    return () => promise.abort();
  }, [dispatch, config]);

  return { data, loading, error };
};

export default useAccount;
