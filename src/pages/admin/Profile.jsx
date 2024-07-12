import ProfileItem from "@modules/admin/Profile/components/ProfileItem";
import ProfileUpdate from "@modules/admin/Profile/components/ProfileUpdate";

const ProfileAdmin = () => {
  return (
    <div className="px-2 lg:px-7 py-5">
      <div className="w-full flex flex-wrap">
        <ProfileItem />
        <ProfileUpdate />
      </div>
    </div>
  );
};

export default ProfileAdmin;
