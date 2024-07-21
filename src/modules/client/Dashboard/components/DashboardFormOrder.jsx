import useOrderUser from "@hooks/useOrderUser";
import { useState } from "react";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { useSelector } from "react-redux";

const DashboardFormOrder = () => {
  const userLoggined = useSelector((state) => state.auth.user);
  const [filters] = useState({
    _all: true,
  });
  const { orders } = useOrderUser(userLoggined._id, filters);
  const orderCounts = orders.reduce((acc, order) => {
    const status = order.status;
    if (acc[status]) {
      acc[status]++;
    } else {
      acc[status] = 1;
    }
    return acc;
  }, {});

  return (
    <>
      <div className="flex justify-center items-center p-5 bg-white rounded-md gap-5">
        <div className="bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl">
          <span className="text-xl text-green-800">
            <RiShoppingCart2Fill />
          </span>
        </div>
        <div className="flex flex-col justify-start items-start text-slate-600">
          <h2 className="text-3xl font-bold">
            {orders.length > 0 && orders.length}
          </h2>
          <span>Orders</span>
        </div>
      </div>
      <div className="flex justify-center items-center p-5 bg-white rounded-md gap-5">
        <div className="bg-sky-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl">
          <span className="text-xl text-sky-800">
            <RiShoppingCart2Fill />
          </span>
        </div>
        <div className="flex flex-col justify-start items-start text-slate-600">
          <h2 className="text-3xl font-bold">{orderCounts[1]}</h2>
          <span>Pending Orders</span>
        </div>
      </div>
      <div className="flex justify-center items-center p-5 bg-white rounded-md gap-5">
        <div className="bg-blue-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl">
          <span className="text-xl text-blue-800">
            <RiShoppingCart2Fill />
          </span>
        </div>
        <div className="flex flex-col justify-start items-start text-slate-600">
          <h2 className="text-3xl font-bold">{orderCounts[4]}</h2>
          <span className="whitespace-nowrap">Completed Orders</span>
        </div>
      </div>
      <div className="flex justify-center items-center p-5 bg-white rounded-md gap-5">
        <div className="bg-red-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl">
          <span className="text-xl text-red-800">
            <RiShoppingCart2Fill />
          </span>
        </div>
        <div className="flex flex-col justify-start items-start text-slate-600">
          <h2 className="text-3xl font-bold">{orderCounts[5]}</h2>
          <span className="whitespace-nowrap">Cancelled Orders</span>
        </div>
      </div>
      <div className="flex justify-center items-center p-5 bg-white rounded-md gap-5">
        <div className="bg-black w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl">
          <span className="text-xl text-white">
            <RiShoppingCart2Fill />
          </span>
        </div>
        <div className="flex flex-col justify-start items-start text-slate-600">
          <h2 className="text-3xl font-bold">{orderCounts[6]}</h2>
          <span>Rejected Orders</span>
        </div>
      </div>
    </>
  );
};

export default DashboardFormOrder;
