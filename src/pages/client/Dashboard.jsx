import DashboardFeature from "@modules/client/Dashboard";
import { useState } from "react";
import { FaList } from "react-icons/fa";

const Dashboard = () => {
  const [filterShow, setFilterShow] = useState(false);

  return (
    <div className="bg-slate-200 mt-5">
      <div className="w-[90%] mx-auto md-lg:block hidden">
        <button
          onClick={() => setFilterShow(!filterShow)}
          className="text-center py-3 px-3 bg-green-500 text-white"
        >
          <FaList />
        </button>
      </div>

      <div className="h-full mx-auto">
        <DashboardFeature filterShow={filterShow} />
      </div>
    </div>
  );
};

export default Dashboard;
