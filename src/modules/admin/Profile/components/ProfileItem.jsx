import { getOneAccount } from "@app/slice/AccountSlice";
import { update } from "@app/slice/AuthSlice";
import ModalUpdateProfile from "@components/Modal/ModalUpdateProfile";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileFormUpdate from "./ProfileFormUpdate";
import toastObj from "@utils/Toast";

const ProfileItem = () => {
  const userLoggined = useSelector((state) => state.auth.user);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const handleUpdateProfile = () => {
    setOpen(true);
    dispatch(getOneAccount(userLoggined._id));
  };
  const handleSubmitForm = async (data) => {
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
    <div className="w-full md:w-6/12">
      <div className="w-full p-4 bg-[#585392] rounded-lg text-[#d0d2d6]">
        <div className="flex justify-between items-center bg-slate-800 rounded-md p-5">
          <div className="flex flex-1 justify-between text-sm flex-col gap-2 p-0 rounded-md relative">
            <div className="flex gap-2">
              <span>Fullname:</span>
              <span>{userLoggined.fullname}</span>
            </div>
            <div className="flex gap-2">
              <span>Username:</span>
              <span>{userLoggined.username}</span>
            </div>
            <div className="flex gap-2">
              <span>Email:</span>
              <span>{userLoggined.email}</span>
            </div>
            <div className="flex gap-2">
              <span>Role:</span>
              <span>{userLoggined.role}</span>
            </div>
            <div className="flex gap-2">
              <span>Status:</span>
              <span
                className={`${
                  userLoggined.isActive ? "bg-red-500" : "bg-slate-500"
                } text-white text-xs cursor-pointer font-normal ml-2 px-2 py-0.5 rounded`}
              >
                {userLoggined.isActive ? "Active" : "Deactive"}
              </span>
            </div>
            <div className="mt-1">
              <button
                onClick={handleUpdateProfile}
                className="bg-white text-black px-2 py-1 rounded-md"
              >
                Update
              </button>
            </div>
          </div>
          <div className="w-[200px] rounded-full">
            <img
              src={userLoggined.imageUrl.fileName}
              alt={userLoggined.username}
            />
          </div>
        </div>
      </div>
      <ModalUpdateProfile
        open={open}
        handleClose={() => setOpen((prev) => !prev)}
      >
        <ProfileFormUpdate onSubmit={handleSubmitForm} />
      </ModalUpdateProfile>
    </div>
  );
};

export default ProfileItem;
