import { formatOriginalPrice, formatSalePrice } from "@utils/Format";
import PropTypes from "prop-types";
import { memo } from "react";
import { FaEye, FaRegHeart } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";

const Product = memo(
  ({ product, onClickCart, onClickWishList, onClickView }) => {
    const handleAddToCart = (product) => {
      onClickCart && onClickCart(product);
    };
    const handleAddWishList = (product) => {
      onClickWishList && onClickWishList(product);
    };
    const handleQuickViewProduct = (product) => {
      onClickView && onClickView(product);
    };
    return (
      <div className="hover:-translate-y-2 group transition-all duration-300 hover:shadow-md shadow rounded-md max-w-sm w-full mx-auto">
        <div className="flex flex-col">
          <div className="rounded-t-md h-48 w-full relative overflow-hidden">
            {product.discount ? (
              <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs right-2 top-2">
                {product.discount}%
              </div>
            ) : (
              ""
            )}
            <NavLink to={`/shops/detail/${product._id}`}>
              <img
                src={product.thumb[0].fileName}
                alt={product.name}
                className="sm:w-full w-full h-full object-contain mx-auto cursor-pointer"
              />
            </NavLink>
            <ul className="flex transition-all duration-500 -bottom-14 justify-center items-center gap-2 absolute w-full group-hover:bottom-3">
              <li
                onClick={() => handleAddWishList(product)}
                className="select-none w-[38px] h-[38px] cursor-pointer bg-slate-100 flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all"
              >
                <FaRegHeart />
              </li>
              <li
                onClick={() => handleQuickViewProduct(product)}
                className="select-none w-[38px] h-[38px] cursor-pointer bg-slate-100 flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all"
              >
                <FaEye />
              </li>
              <li
                onClick={() => handleAddToCart(product)}
                className="select-none w-[38px] h-[38px] cursor-pointer bg-slate-100 flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all"
              >
                <RiShoppingCartLine />
              </li>
            </ul>
          </div>
          <div className="flex-1 p-4">
            <span className="text-sm text-stone-500">{product.code}</span>
            <NavLink to={`shops/detail/${product._id}`}>
              <h3 className="text-lg lg:text-[15px] cursor-pointer py-2">
                {product.name}
              </h3>
            </NavLink>
            <div className="space-y-3">
              <div className="flex justify-start items-center gap-2 lg:gap-1">
                <p className="text-base lg:text-sm">
                  {formatSalePrice(product.price, product.discount)}
                </p>
                <p className="text-sm lg:text-[10px] line-through text-red-500">
                  {formatOriginalPrice(product.price)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
Product.displayName = "Product";

Product.propTypes = {
  product: PropTypes.object.isRequired,
  onClickCart: PropTypes.func,
  onClickWishList: PropTypes.func,
  onClickView: PropTypes.func,
};

export default Product;
