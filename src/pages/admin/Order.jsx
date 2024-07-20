import { printInvoiceOrder } from "@app/slice/OrderSlice";
import Loading from "@components/Loading/Loading";
import SearchItem from "@components/SearchItem/SearchItem";
import useOrder from "@hooks/useOrder";
import OrderItem from "@modules/admin/Order/components/OrderItem";
import OrderListSkeleton from "@modules/admin/Order/components/OrderListSkeleton";
import { Pagination } from "@mui/material";
import toastObj from "@utils/Toast";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const OrderAdmin = () => {
  const dispatch = useDispatch();
  const isLoadingOrder = useSelector((state) => state.order.loading);
  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 6,
    _search: "",
    _status: "",
  });
  const { orders, pagination } = useOrder(filters);
  const handleSearchChange = (value) => {
    setFilters((prev) => ({ ...prev, _search: value }));
  };
  const handlePageChange = (_, page) => {
    setFilters((prev) => ({ ...prev, _page: page }));
  };
  const handleStatusChange = (e) => {
    setFilters((prev) => ({ ...prev, _status: e.target.value }));
  };
  const handlePrintInvoice = async (id) => {
    try {
      const results = await dispatch(printInvoiceOrder(id));
      if (results.type.includes("fulfilled")) {
        toastObj.success("Send order to email successful");
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (isLoadingOrder) return <Loading />;

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full rounded-md">
        <div className="flex lg:hidden justify-between items-center mb-5 p-4 bg-white rounded-md">
          <h1 className="text-black font-semibold text-lg">Orders</h1>
        </div>
        <div className="relative overflow-x-auto bg-white p-4 rounded-md">
          <div className="flex justify-between items-center">
            <h3 className="text-slate-600 bg-slate-300 p-2 rounded-md">
              Filters
            </h3>
            <div>
              <SearchItem onChange={handleSearchChange} />
              <select
                onChange={handleStatusChange}
                className="px-3 py-1 mr-2 outline-none bg-white border border-gray-300 focus:border-gray-500 rounded-md text-slate-600 text-base"
              >
                <option value="">--All--</option>
                <option value="1">Pending</option>
                <option value="2">Confirmed</option>
                <option value="3">Shipping</option>
                <option value="4">Completed</option>
                <option value="5">Cancelled</option>
                <option value="6">Rejected</option>
              </select>
            </div>
          </div>
          <table className="w-full text-sm text-left">
            <thead className="text-sm text-black uppercase border-b border-slate-700">
              <tr>
                <th scope="col" className="py-3 px-4">
                  Order Id
                </th>
                <th scope="col" className="py-3 px-4">
                  Fullname
                </th>
                <th scope="col" className="py-3 px-4">
                  Email
                </th>
                <th scope="col" className="py-3 px-4">
                  Payment Status
                </th>
                <th scope="col" className="py-3 px-4">
                  Order Status
                </th>
                <th scope="col" className="py-3 px-4">
                  Date
                </th>
                <th scope="col" className="py-3 px-4">
                  Action
                </th>
              </tr>
            </thead>
            {orders.length === 0 ? (
              <OrderListSkeleton />
            ) : (
              <tbody className="text-slate-600">
                {orders.map((item) => (
                  <OrderItem
                    key={item._id}
                    order={item}
                    onClick={handlePrintInvoice}
                  />
                ))}
              </tbody>
            )}
          </table>
          <div className="w-full flex justify-end mt-4 bottom-4 right-4">
            <Pagination
              count={pagination.totalPages}
              page={pagination.page || 1}
              variant="outlined"
              shape="rounded"
              color="primary"
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderAdmin;
