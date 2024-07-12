import { Link, useNavigate, useParams } from "react-router-dom";
import ProductForm from "./ProductForm";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  getOneProduct,
  updateProduct,
} from "@app/slice/ProductSlice";
import toastObj from "@utils/Toast";
import { useEffect } from "react";
import { setEmptyError } from "@app/slice/CategorySlice";
import { unwrapResult } from "@reduxjs/toolkit";

const ProductAddEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentProduct = useSelector((state) => state.product.current);
  const isHasError = useSelector((state) => state.product.error);
  const handleSubmit = async (data) => {
    if (!id) {
      const action = await dispatch(addProduct(data));
      const results = unwrapResult(action);
      if (results) toastObj.success("Add success");
      navigate("..");
    } else {
      data.append("id", id);
      const action = await dispatch(updateProduct(data));
      const results = unwrapResult(action);
      if (results) toastObj.success("Edit success");
      navigate("..");
    }
  };
  useEffect(() => {
    id && dispatch(getOneProduct(id));
  }, [id, dispatch]);
  useEffect(() => {
    if (isHasError) {
      toastObj.error(isHasError);
      dispatch(setEmptyError());
    }
  }, [isHasError, dispatch]);
  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-white rounded-md">
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-black text-xl font-semibold">
            {!id ? "Add Product" : "Edit Product"}
          </h1>
          <Link
            to={".."}
            className="bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-sm px-7 py-2 my-2"
          >
            All Product
          </Link>
        </div>
        <div>
          <ProductForm onSubmit={handleSubmit} current={currentProduct} />
        </div>
      </div>
    </div>
  );
};

export default ProductAddEdit;
