import { formatSalePrice } from "@utils/Format";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const WishlistItem = ({ item, onClickCart, onClickDelete }) => {
  return (
    <tr className="bg-white border-b">
      <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
        <Link to={`/shops/detail/${item._id}`}>{item.name}</Link>
      </td>
      <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
        {formatSalePrice(item.price, item.discount)}
      </td>
      <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
        <img
          className="w-[80px] h-[80px] object-cover"
          src={item.thumb[0].fileName}
          alt={item.name}
          loading="lazy"
        />
      </td>
      <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
        <Link
          to={`/shops/detail/${item._id}`}
          className="bg-green-200 cursor-pointer text-green-800 text-md font-semibold mr-2 p-[6px] rounded"
        >
          View
        </Link>
        <button
          onClick={() => onClickCart && onClickCart(item)}
          className="bg-[#caddff] cursor-pointer text-slate-700 text-md font-semibold mr-2 p-[6px] rounded"
        >
          Add to cart
        </button>
        <button
          onClick={() => onClickCart && onClickDelete(item)}
          className="bg-red-500 cursor-pointer text-white text-md font-semibold mr-2 p-[6px] rounded"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};
WishlistItem.propTypes = {
  item: PropTypes.object,
  onClickDelete: PropTypes.func,
  onClickCart: PropTypes.func,
};

export default WishlistItem;
