import HeaderAdmin from "@components/Header/HeaderAdmin";
import Sidebar from "@components/Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="bg-[#cdcae9] w-full min-h-screen">
      <HeaderAdmin />
      <Sidebar />
      <div className="ml-0 lg:ml-[260px] pt-[95px] transition-all">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
