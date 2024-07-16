import { getOneAccount } from "@app/slice/AccountSlice";
import { update } from "@app/slice/AuthSlice";
import ModalUpdateProfile from "@components/Modal/ModalUpdateProfile";
import toastObj from "@utils/Toast";
import { useState } from "react";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import DashboardFormInfo from "../components/DashboardFormInfo";

const Index = () => {
  const dispatch = useDispatch();
  const userLoggined = useSelector((state) => state.auth.user);
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
          <div className="flex justify-center items-center p-5 bg-white rounded-md gap-5">
            <div className="bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl">
              <span className="text-xl text-green-800">
                <RiShoppingCart2Fill />
              </span>
            </div>
            <div className="flex flex-col justify-start items-start text-slate-600">
              <h2 className="text-3xl font-bold">{0}</h2>
              <span>Orders</span>
            </div>
          </div>

          <div className="flex justify-center items-center p-5 bg-white rounded-md gap-5">
            <div className="bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl">
              <span className="text-xl text-green-800">
                <RiShoppingCart2Fill />
              </span>
            </div>
            <div className="flex flex-col justify-start items-start text-slate-600">
              <h2 className="text-3xl font-bold">{0}</h2>
              <span>Pending Orders</span>
            </div>
          </div>

          <div className="flex justify-center items-center p-5 bg-white rounded-md gap-5">
            <div className="bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl">
              <span className="text-xl text-green-800">
                <RiShoppingCart2Fill />
              </span>
            </div>
            <div className="flex flex-col justify-start items-start text-slate-600">
              <h2 className="text-3xl font-bold">{0}</h2>
              <span>Cancelled Orders</span>
            </div>
          </div>
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
