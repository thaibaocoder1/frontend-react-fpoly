import { memo } from "react";
import PropTypes from "prop-types";
import { formatOrderStatus } from "@utils/Format";

const OrderItem = memo(({ item }) => {
  return (
    <tr className="bg-white border-b">
      <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
        {item._id}
      </td>
      <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
        {item.fullname}
      </td>
      <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
        {item.email}
      </td>
      <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
        Waiting
      </td>
      <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
        {formatOrderStatus(item.status)}
      </td>
      <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
        <a href="./order-detail.html">
          <span className="bg-green-200 cursor-pointer text-green-800 text-md font-semibold mr-2 p-[6px] rounded">
            View
          </span>
        </a>
      </td>
    </tr>
  );
});
OrderItem.displayName = "OrderItem";

OrderItem.propTypes = {
  item: PropTypes.object,
};

export default OrderItem;
