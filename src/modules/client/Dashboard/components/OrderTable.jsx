import PropTypes from "prop-types";
import OrderItem from "./OrderItem";
import OrderItemSkeleton from "./OrderItemSkeleton";

const OrderTable = ({ orders }) => {
  return (
    <table className="w-full text-sm text-left text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-200">
        <tr>
          <th scope="col" className="px-6 py-3">
            Order Id
          </th>
          <th scope="col" className="px-6 py-3">
            Fullname
          </th>
          <th scope="col" className="px-6 py-3">
            Email
          </th>
          <th scope="col" className="px-6 py-3">
            Payment Status
          </th>
          <th scope="col" className="px-6 py-3">
            Order Status
          </th>
          <th scope="col" className="px-6 py-3">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {orders.length > 0 ? (
          orders.map((order) => <OrderItem key={order._id} item={order} />)
        ) : (
          <OrderItemSkeleton />
        )}
      </tbody>
    </table>
  );
};
OrderTable.propTypes = {
  orders: PropTypes.array,
};

export default OrderTable;
