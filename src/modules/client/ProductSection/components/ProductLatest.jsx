import React from "react";
import PropTypes from "prop-types";
import Product from "./Product";
import { FaEye, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RiShoppingCartLine } from "react-icons/ri";

const ProductLatest = (props) => {
  return (
    <div className="w-full">
      <div className="text-center flex justify-center items-center flex-col text-4xl text-slate-600 font-bold relative pb-[35px]">
        <h2>Latest Products</h2>
        <div className="w-[100px] h-[2px] bg-[#059473] mt-4"></div>
      </div>
      <div className="w-full grid grid-cols-4 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </div>
    </div>
  );
};

ProductLatest.propTypes = {};

export default ProductLatest;
