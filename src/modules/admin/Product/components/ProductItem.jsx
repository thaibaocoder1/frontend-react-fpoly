import { formatSalePrice } from "@utils/Format";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProductItem = ({ product }) => {
  return (
    <tr>
      <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
        {product._id}
      </td>
      <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
        <img
          className="w-[60px] h-[60px] object-cover"
          src={product.thumb[0].fileName}
          alt={product.name}
        />
      </td>
      <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
        {product.name}
      </td>
      <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
        {product.categoryID.title}
      </td>
      <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
        {product.code}
      </td>
      <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
        {formatSalePrice(product.price, product.discount)}
      </td>
      <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
        {product.discount === 0 ? (
          <span>No Discount</span>
        ) : (
          <span>%{product.discount}</span>
        )}
      </td>
      <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
        {product.quantity}
      </td>
      <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
        <div className="flex justify-start items-center gap-2">
          <Link
            to={`edit/${product._id}`}
            className="text-[#fafafa] p-[6px] bg-sky-500 rounded hover:shadow-lg cursor-pointer hover:shadow-sky-500/50"
          >
            Edit
          </Link>
          <Link
            to={`/shops/detail/${product._id}`}
            className="text-[#fafafa] p-[6px] bg-green-500 rounded hover:shadow-lg cursor-pointer hover:shadow-green-500/50"
          >
            View
          </Link>
        </div>
      </td>
    </tr>
  );
};

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductItem;
