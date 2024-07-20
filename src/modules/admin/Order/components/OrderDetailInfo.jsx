import { formatOriginalPrice } from "@utils/Format";
import PropTypes from "prop-types";
import { memo } from "react";

const OrderTableItem = memo(
  ({ order }) => {
    return (
      <tr key={order._id}>
        <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
          {order.productID._id}
        </td>
        <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
          <img
            loading="lazy"
            className="w-[60px] h-[60px] object-cover"
            src={order.productID.thumb[0].fileName}
            alt={order.productID.name}
          />
        </td>
        <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
          {order.productID.name}
        </td>
        <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
          {order.quantity}
        </td>
        <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
          {formatOriginalPrice(order.price)}
        </td>
        <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
          {formatOriginalPrice(order.price * order.quantity)}
        </td>
      </tr>
    );
  },
  (prev, next) => prev._id === next._id
);
OrderTableItem.displayName = "OrderTableItem";

OrderTableItem.propTypes = {
  order: PropTypes.object,
};

export default OrderTableItem;
