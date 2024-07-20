import { formatOrderPayment, formatOrderStatus } from "@utils/Format";
import PropTypes from "prop-types";
import { memo } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Link } from "react-router-dom";
dayjs.extend(customParseFormat);

const OrderItem = memo(
  ({ order, onClick }) => {
    const handlePrintInvoice = async (id) => {
      onClick && (await onClick(id));
    };
    return (
      <tr>
        <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
          {order._id}
        </td>
        <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
          {order.fullname}
        </td>
        <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
          {order.email}
        </td>
        <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
          {formatOrderPayment(order.payment, order.status)}
        </td>
        <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
          {formatOrderStatus(order.status)}
        </td>
        <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
          {dayjs(order.createdAt).format("DD/MM/YYYY HH:mm:ss")}
        </td>
        <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
          <div className="flex justify-start items-center gap-2">
            <Link
              to={`../orders/${order._id}`}
              className="p-[6px] text-white bg-sky-500 rounded hover:shadow-lg "
            >
              View
            </Link>
            <button
              onClick={() => handlePrintInvoice(order._id)}
              hidden={order.status === 5 || order.status === 6}
              className="bg-green-200 cursor-pointer hover:shadow-lg text-green-800 text-md font-semibold mr-2 p-[6px] rounded"
            >
              Print invoice
            </button>
          </div>
        </td>
      </tr>
    );
  },
  (prev, next) => prev._id === next._id
);
OrderItem.displayName = "OrderItem";

OrderItem.propTypes = {
  order: PropTypes.object,
  onClick: PropTypes.func,
};

export default OrderItem;
