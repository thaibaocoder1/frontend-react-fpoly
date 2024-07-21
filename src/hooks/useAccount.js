import { getAllAccount } from "@app/slice/AccountSlice";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { createSelector } from "reselect";

const selectAccount = (state) => state.account;

const selectAccountState = createSelector([selectAccount], (account) => ({
  data: account.data,
}));

const useAccount = (filters) => {
  const dispatch = useDispatch();
  const { data } = useSelector(selectAccountState, shallowEqual);

  const config = useMemo(
    () => ({
      params: {
        _page: filters?._page,
        _limit: filters?._limit,
        _search: filters?._search,
        _all: filters?._all,
      },
    }),
    [filters?._page, filters?._limit, filters?._search, filters?._all]
  );

  useEffect(() => {
    const promise = dispatch(getAllAccount(config));
    return () => promise.abort();
  }, [dispatch, config]);

  return { data };
};

export default useAccount;
