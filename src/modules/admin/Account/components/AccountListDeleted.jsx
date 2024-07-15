import {
  destroyAccount,
  getAllAccount,
  getAllAccountTrash,
  recoverAccount,
} from "@app/slice/AccountSlice";
import { setEmptyError } from "@app/slice/CouponSlice";
import ModalConfirmAccount from "@components/Modal/ModalConfirmAccount";
import SearchItem from "@components/SearchItem/SearchItem";
import useAccountTrash from "@hooks/useAccountTrash";
import { Pagination } from "@mui/material";
import toastObj from "@utils/Toast";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AccountItemDeleted from "./AccountItemDeleted";
import AccountItemEmpty from "./AccountItemEmpty";

const AccountListDeleted = () => {
  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 6,
    _search: "",
  });
  const [modal, setModal] = useState({
    open: false,
    userId: "",
  });
  const { data } = useAccountTrash(filters);
  const dispatch = useDispatch();
  const isHasError = useSelector((state) => state.account.error);
  const handleClick = (userId) => {
    if (userId) setModal((prev) => ({ ...prev, open: true, userId }));
  };
  const handlePageChange = (_, page) => {
    setFilters((prev) => ({ ...prev, _page: page }));
  };
  const handleSearchChange = (value) => {
    setFilters((prev) => ({ ...prev, _search: value }));
  };
  const handleDeleteUser = async (id) => {
    try {
      const results = await dispatch(destroyAccount(id));
      if (!results.type.includes("rejected"))
        toastObj.success("Delete success");
      dispatch(getAllAccount(filters));
    } catch (error) {
      console.log(error);
    }
  };
  const handleRecover = async (id) => {
    try {
      const results = await dispatch(recoverAccount(id));
      if (!results.type.includes("rejected"))
        toastObj.success("Recover success");
      dispatch(getAllAccountTrash(filters));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (isHasError) {
      toastObj.error(isHasError);
      dispatch(setEmptyError());
    }
  }, [isHasError, dispatch]);

  return (
    <div className="w-full">
      <div className="w-full p-4 bg-white rounded-md">
        <div className="flex justify-between items-center">
          <h3 className="text-slate-600 bg-slate-300 p-2 rounded-md">Search</h3>
          <SearchItem onChange={handleSearchChange} />
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-sm text-black uppercase border-b border-slate-700">
              <tr>
                <th scope="col" className="py-3 px-4">
                  No
                </th>
                <th scope="col" className="py-3 px-4">
                  Image
                </th>
                <th scope="col" className="py-3 px-4">
                  Fullname
                </th>
                <th scope="col" className="py-3 px-4">
                  Username
                </th>
                <th scope="col" className="py-3 px-4">
                  Email
                </th>
                <th scope="col" className="py-3 px-4">
                  Phone
                </th>
                <th scope="col" className="py-3 px-4">
                  Role
                </th>
                <th scope="col" className="py-3 px-4">
                  Status
                </th>
                <th scope="col" className="py-3 px-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data.deleted.length > 0 ? (
                data.deleted.map((user) => (
                  <AccountItemDeleted
                    key={user._id}
                    user={user}
                    onClick={handleClick}
                    onClickRecover={handleRecover}
                  />
                ))
              ) : (
                <AccountItemEmpty />
              )}
            </tbody>
          </table>
        </div>

        <div className="w-full inline-flex justify-end mt-4 bottom-4 right-4">
          {data.deleted.length > 0 && (
            <Pagination
              count={data.pagination.totalPages}
              page={data.pagination.page || 1}
              variant="outlined"
              shape="rounded"
              color="primary"
              onChange={handlePageChange}
            />
          )}
        </div>
      </div>
      <ModalConfirmAccount
        open={modal.open}
        handleClose={() => setModal((prev) => ({ ...prev, open: false }))}
        userId={modal.userId}
        onConfirm={handleDeleteUser}
      />
    </div>
  );
};

export default AccountListDeleted;
