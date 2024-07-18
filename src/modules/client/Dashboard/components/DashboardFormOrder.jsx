import { RiShoppingCart2Fill } from "react-icons/ri";

const DashboardFormOrder = () => {
  return (
    <>
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
    </>
  );
};

export default DashboardFormOrder;
