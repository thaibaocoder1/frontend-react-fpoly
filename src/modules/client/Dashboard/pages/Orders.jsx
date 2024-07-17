import useOrderUser from "@hooks/useOrderUser";
import { useSelector } from "react-redux";
import OrderTable from "../components/OrderTable";
import { useState } from "react";

const Orders = () => {
  const userLoggined = useSelector((state) => state.auth.user);
  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 6,
  });
  const { ordersWithUser } = useOrderUser(userLoggined._id, filters);

  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-600">My Orders</h2>
        <select
          className="outline-none px-3 py-1 border rounded-md text-slate-600"
          id="orderStatusSelect"
        >
          <option value="all">--Order status--</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="shipping">Shipping</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="pt-4">
        <div className="relative overflow-x-auto rounded-md">
          <OrderTable orders={ordersWithUser} />
        </div>
      </div>
    </div>
  );
};

export default Orders;
