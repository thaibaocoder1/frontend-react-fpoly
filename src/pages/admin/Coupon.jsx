import { setEmtpyCoupon, toggleDialog } from "@app/slice/CouponSlice";
import CouponList from "@modules/admin/Coupon/components/CouponList";
import { useDispatch } from "react-redux";

const CouponAdmin = () => {
  const dispatch = useDispatch();
  const handleClickAdd = () => {
    dispatch(toggleDialog());
    dispatch(setEmtpyCoupon());
  };
  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="flex lg:hidden justify-between items-center mb-5 p-4 bg-white rounded-md">
        <h1 className="text-black font-semibold text-lg">All Coupon</h1>
        <button
          className="bg-red-500 shadow-lg hover:shadow-red-500/40 px-4 py-2 cursor-pointer text-white rounded-sm text-sm"
          onClick={handleClickAdd}
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap w-full">
        <CouponList />
      </div>
    </div>
  );
};

export default CouponAdmin;
