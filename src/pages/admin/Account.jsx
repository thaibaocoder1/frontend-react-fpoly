import { setEmtpyAccount } from "@app/slice/AccountSlice";
import AccountList from "@modules/admin/Account/components/AccountList";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const AccountAdmin = () => {
  const dispatch = useDispatch();
  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="flex lg:hidden justify-between items-center mb-5 p-4 bg-white rounded-md">
        <h1 className="text-black font-semibold text-lg">All Accounts</h1>
        <Link
          to={"add"}
          className="bg-red-500 shadow-lg hover:shadow-red-500/40 px-4 py-2 cursor-pointer text-white rounded-sm text-sm text-center"
          onClick={() => dispatch(setEmtpyAccount())}
        >
          Add
        </Link>
      </div>
      <div className="flex flex-wrap w-full">
        <AccountList />
      </div>
    </div>
  );
};

export default AccountAdmin;
