import { removeCoupon, setEmptyError } from "@app/slice/CouponSlice";
import ModalConfirmCoupon from "@components/Modal/ModalConfirmCoupon";
import SearchItem from "@components/SearchItem/SearchItem";
import useCoupon from "@hooks/useCoupon";
import { Pagination } from "@mui/material";
import toastObj from "@utils/Toast";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CouponAddEdit from "./CouponAddEdit";
import CategoryItem from "./CouponItem";
import CouponItemEmpty from "./CouponItemEmpty";

const CouponList = () => {
  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 6,
    _search: "",
  });
  const [modal, setModal] = useState({
    open: false,
    couponId: "",
  });
  const { data } = useCoupon(filters);
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.coupon.error);
  useEffect(() => {
    if (errorMessage) {
      toastObj.error(errorMessage);
      dispatch(setEmptyError());
    }
  }, [errorMessage, dispatch]);
  const handleClickItem = (id) => {
    if (id) setModal((prev) => ({ ...prev, open: true, couponId: id }));
  };
  const handlePageChange = (_, page) => {
    setFilters((prev) => ({ ...prev, _page: page }));
  };
  const handleSearchChange = (value) => {
    setFilters((prev) => ({ ...prev, _search: value }));
  };
  const handleDeleteCoupon = () => {
    dispatch(removeCoupon(modal.couponId));
    toastObj.success("Remove success");
  };

  return (
    <>
      <div className="w-full lg:w-7/12">
        <div className="w-full p-4 bg-white rounded-md">
          <div className="flex justify-between items-center">
            <h3 className="text-slate-600 bg-slate-300 p-2 rounded-md">
              Search
            </h3>
            <SearchItem onChange={handleSearchChange} />
          </div>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-black">
              <thead className="text-sm text-black uppercase border-b border-slate-700">
                <tr>
                  <th scope="col" className="py-3 px-4">
                    No
                  </th>
                  <th scope="col" className="py-3 px-4">
                    Name
                  </th>
                  <th scope="col" className="py-3 px-4">
                    Value
                  </th>
                  <th scope="col" className="py-3 px-4">
                    Expire date
                  </th>
                  <th scope="col" className="py-3 px-4">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.coupons.length > 0 ? (
                  data.coupons.map((item) => (
                    <CategoryItem
                      key={item._id}
                      coupon={item}
                      onClick={handleClickItem}
                    />
                  ))
                ) : (
                  <CouponItemEmpty />
                )}
              </tbody>
            </table>
          </div>
          <div className="w-full inline-flex justify-end mt-4 bottom-4 right-4">
            <Pagination
              count={data.pagination.totalPages}
              page={data.pagination.page || 1}
              variant="outlined"
              shape="rounded"
              color="primary"
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
      <CouponAddEdit />
      <ModalConfirmCoupon
        open={modal.open}
        handleClose={() => setModal((prev) => ({ ...prev, open: false }))}
        onConfirm={handleDeleteCoupon}
      />
    </>
  );
};

export default CouponList;
