import { getOneAccount } from "@app/slice/AccountSlice";
import { update } from "@app/slice/AuthSlice";
import ModalUpdateProfile from "@components/Modal/ModalUpdateProfile";
import toastObj from "@utils/Toast";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardFormInfo from "../components/DashboardFormInfo";
import DashboardFormOrder from "../components/DashboardFormOrder";

const Index = () => {
  const userLoggined = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleUpdateInfo = () => {
    setOpen(true);
    dispatch(getOneAccount(userLoggined._id));
  };
  const handleSubmit = async (data) => {
    try {
      data.append("id", userLoggined._id);
      const results = await dispatch(update(data));
      if (!results.type.includes("rejected")) {
        toastObj.success("Change success");
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    userLoggined?._id && (
      <>
        <div className="grid grid-cols-3 md:grid-cols-1 gap-5">
          <DashboardFormOrder />
        </div>
        <div className="bg-white p-5 mt-5 rounded-md">
          <div className="flex items-center justify-between">
            <h2 className="pb-5 text-xl text-slate-600 font-semibold">
              Info User
            </h2>
            <button
              className="bg-[#059473] text-white px-2 py-1 rounded-md"
              onClick={handleUpdateInfo}
            >
              Change info
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-4 bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="flex justify-center items-center p-4">
              <img
                className="w-48 h-48 rounded-full"
                src={userLoggined.imageUrl.fileName}
                alt={userLoggined.username}
                loading="lazy"
              />
            </div>
            <div className="p-4">
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-gray-700">Username</label>
                    <input
                      type="text"
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                      value={userLoggined.username}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Fullname</label>
                    <input
                      type="text"
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                      value={userLoggined.fullname}
                      readOnly
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-gray-700">Email</label>
                    <input
                      type="email"
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                      value={userLoggined.email}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Phone</label>
                    <input
                      type="text"
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                      value={userLoggined.phone}
                      readOnly
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700">Role</label>
                  <input
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    value={userLoggined.role}
                    readOnly
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        <ModalUpdateProfile open={open} handleClose={() => setOpen(false)}>
          <DashboardFormInfo onSubmit={handleSubmit} />
        </ModalUpdateProfile>
      </>
    )
  );
};

export default Index;
