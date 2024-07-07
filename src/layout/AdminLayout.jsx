import HeaderAdmin from "@components/Header/HeaderAdmin";
import Sidebar from "@components/Sidebar/Sidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="bg-[#cdcae9] w-full min-h-screen">
      <HeaderAdmin showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div
        className={`${
          !showSidebar ? "ml-2" : "ml-[270px]"
        } pt-[95px] transition-all`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
