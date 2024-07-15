import { setEmtpyAccount } from "@app/slice/AccountSlice";
import AccountList from "@modules/admin/Account/components/AccountList";
import AccountListDeleted from "@modules/admin/Account/components/AccountListDeleted";
import { useState } from "react";
import { MdAutoDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const AccountAdmin = () => {
  const dispatch = useDispatch();
  const [isDelete, setIsDelete] = useState(false);
  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="flex lg:hidden justify-between items-center mb-5 p-4 bg-white rounded-md">
        <div className="flex items-center gap-2">
          <h1 className="text-black font-semibold text-lg">
            {isDelete ? "Deleted Account" : "All Accounts"}
          </h1>
          <button
            onClick={() => setIsDelete((prev) => !prev)}
            className={`flex items-center gap-2 px-2 rounded-md text-white transition-all duration-300 ${
              isDelete ? "bg-red-500" : "bg-slate-400"
            }`}
          >
            Deleted
            <MdAutoDelete style={{ marginTop: 3, display: "inline-block" }} />
          </button>
        </div>
        <Link
          to={"add"}
          className="bg-red-500 shadow-lg hover:shadow-red-500/40 px-4 py-2 cursor-pointer text-white rounded-sm text-sm text-center"
          onClick={() => dispatch(setEmtpyAccount())}
        >
          Add
        </Link>
      </div>
      <div className="flex flex-wrap w-full">
        {isDelete ? <AccountListDeleted /> : <AccountList />}
      </div>
    </div>
  );
};

export default AccountAdmin;
