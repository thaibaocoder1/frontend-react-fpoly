import { useDispatch, useSelector } from "react-redux";
import ProfileForm from "./ProfileForm";
import { changePassword, setEmtpyError } from "@app/slice/AuthSlice";
import toastObj from "@utils/Toast";
import { useEffect } from "react";

const ProfileUpdate = () => {
  const dispatch = useDispatch();
  const userLoggined = useSelector((state) => state.auth.user);
  const isHasError = useSelector((state) => state.auth.error);
  const handleSubmit = async (data) => {
    try {
      data.id = userLoggined._id;
      const results = await dispatch(changePassword(data));
      if (!results.type.includes("rejected")) {
        toastObj.success("Change password success");
        return true;
      }
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
      return false;
    }
  };
  useEffect(() => {
    if (isHasError) {
      toastObj.error(isHasError);
      dispatch(setEmtpyError());
    }
  }, [isHasError, dispatch]);
  return (
    <div className="w-full md:w-6/12">
      <div className="w-full pl-0 md:pl-7 mt-6 md:mt-0">
        <div className="bg-[#585392] rounded-md text-[#d0d2d6] p-4">
          <h1 className="text-[#d0d2d6] text-lg mb-3 font-semibold">
            Change Password
          </h1>
          <ProfileForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;
