import { MdCurrencyExchange, MdProductionQuantityLimits } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import PieChart from "./PieChart";
import LineChart from "./LineChart";
import useAllProduct from "@hooks/useAllProduct";
import useAccount from "@hooks/useAccount";
import { useState } from "react";
import useOrder from "@hooks/useOrder";
import { shallowEqual, useSelector } from "react-redux";
import { formatCurrencyNumberVI } from "@utils/Format";

const HomeStatistical = () => {
  const [filters] = useState({
    _all: true,
  });
  const { cart: products } = useAllProduct();
  const { data } = useAccount(filters);
  const { orders } = useOrder(filters);
  const totalIncoming = useSelector(
    (state) => state.order.totalIncoming,
    shallowEqual
  );
  return (
    <>
      <div className="w-full grid grid-cols-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7">
        <div className="flex justify-between items-center p-5 bg-[#fae8e8] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#5c5a5a]">
            <h2 className="text-3xl font-bold">
              {formatCurrencyNumberVI(totalIncoming)}
            </h2>
            <span className="text-md font-medium">Total Incoming</span>
          </div>

          <div className="w-[47px] h-[47px] rounded-full bg-[#fa0305] flex justify-center items-center text-xl">
            <MdCurrencyExchange className="text-[#fae8e8] shadow-lg" />
          </div>
        </div>

        <div className="flex justify-between items-center p-5 bg-[#fde2ff] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#5c5a5a]">
            <h2 className="text-3xl font-bold">
              {products.length > 0 && products.length}
            </h2>
            <span className="text-md font-medium">Products</span>
          </div>

          <div className="w-[47px] h-[47px] rounded-full bg-[#760077] flex justify-center items-center text-xl">
            <MdProductionQuantityLimits className="text-[#fae8e8] shadow-lg" />
          </div>
        </div>

        <div className="flex justify-between items-center p-5 bg-[#e9feea] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#5c5a5a]">
            <h2 className="text-3xl font-bold">
              {data.users.length > 0 && data.users.length}
            </h2>
            <span className="text-md font-medium">Users</span>
          </div>

          <div className="w-[47px] h-[47px] rounded-full bg-[#038000] flex justify-center items-center text-xl">
            <FaUsers className="text-[#fae8e8] shadow-lg" />
          </div>
        </div>

        <div className="flex justify-between items-center p-5 bg-[#ecebff] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#5c5a5a]">
            <h2 className="text-3xl font-bold">
              {orders.length > 0 && orders.length}
            </h2>
            <span className="text-md font-medium">Orders</span>
          </div>

          <div className="w-[47px] h-[47px] rounded-full bg-[#0200f8] flex justify-center items-center text-xl">
            <FaCartShopping className="text-[#fae8e8] shadow-lg" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 mt-2">
        <LineChart />
        <PieChart />
      </div>
    </>
  );
};

export default HomeStatistical;
