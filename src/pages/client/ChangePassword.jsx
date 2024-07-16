import DashboardFormPassword from "@modules/client/Dashboard/components/DashboardFormPassword";

const ChangePassword = () => {
  return (
    <div className="p-4 bg-white rounded-md">
      <h2 className="text-xl text-slate-600 pb-3">Change Password</h2>
      <DashboardFormPassword />
    </div>
  );
};

export default ChangePassword;
