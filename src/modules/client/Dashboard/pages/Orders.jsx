import useOrderUser from "@hooks/useOrderUser";
import { useSelector } from "react-redux";
import OrderTable from "../components/OrderTable";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Pagination } from "@mui/material";

const Orders = () => {
  const userLoggined = useSelector((state) => state.auth.user);
  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 6,
    _status: "",
  });
  const { orders, pagination } = useOrderUser(userLoggined._id, filters);
  const handleFilterChange = (e) => {
    setFilters((prev) => ({ ...prev, _status: e.target.value }));
  };
  const handlePageChange = (_, value) => {
    setFilters((prev) => ({ ...prev, _page: value }));
  };
  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-600">My Orders</h2>
        <select
          className="outline-none px-3 py-1 border rounded-md text-slate-600"
          id="orderStatusSelect"
          onChange={handleFilterChange}
        >
          <option value="">--Order status--</option>
          <option value="1">Pending</option>
          <option value="2">Confirmed</option>
          <option value="3">Shipping</option>
          <option value="4">Completed</option>
          <option value="5">Cancelled</option>
        </select>
      </div>
      <div className="pt-4">
        <div className="relative overflow-x-auto rounded-md">
          <OrderTable orders={orders} />
        </div>
        <div className="mt-2 flex justify-end">
          <Pagination
            count={pagination.totalPages || 1}
            page={pagination.page || 1}
            variant="outlined"
            shape="rounded"
            color="primary"
            onChange={handlePageChange}
          />
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Orders;
