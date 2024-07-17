import { addProductToCart } from "@app/slice/CartSlice";
import {
  addProductToWishList,
  setEmptyError,
  setStatusSuccess,
} from "@app/slice/WishlistSlice";
import toastObj from "@utils/Toast";
import PropTypes from "prop-types";
import { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Product from "./Product";
import QuickView from "@components/QuickView/QuickView";
import ModalViewProduct from "@components/Modal/ModalViewProduct";

const ProductLatest = memo(({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLoggined = useSelector((state) => state.auth.user);
  const isHasErrorWishList = useSelector((state) => state.wishlist.error);
  const isSuccessWishList = useSelector((state) => state.wishlist.success);
  const [viewProduct, setViewProduct] = useState(null);
  const [open, setOpen] = useState(false);

  const handleAddCart = useCallback(
    (item) => {
      if (userLoggined && userLoggined._id) {
        dispatch(
          addProductToCart({
            userId: userLoggined._id,
            quantity: 1,
            productId: item._id,
            isBuyNow: false,
          })
        );
        toastObj.success("Add to cart success");
      } else {
        toastObj.error("Please login first");
        navigate("/login");
      }
    },
    [dispatch, navigate, userLoggined]
  );
  const handleAddWishList = useCallback(
    (item) => {
      if (userLoggined && userLoggined._id) {
        dispatch(addProductToWishList(item._id));
      } else {
        toastObj.error("Please login first");
      }
    },
    [userLoggined, dispatch]
  );
  const handleQuickView = useCallback((item) => {
    setOpen(true);
    setViewProduct(item);
  }, []);
  useEffect(() => {
    if (isHasErrorWishList) {
      toastObj.error(isHasErrorWishList);
      dispatch(setEmptyError());
    }
    if (isSuccessWishList) {
      toastObj.success("Add to wishlist");
      dispatch(setStatusSuccess());
    }
  }, [isHasErrorWishList, isSuccessWishList, dispatch]);
  return (
    <div className="w-full">
      <div className="text-center flex justify-center items-center flex-col text-4xl text-slate-600 font-bold relative pb-[35px]">
        <h2>Latest Products</h2>
        <div className="w-[100px] h-[2px] bg-[#059473] mt-4"></div>
      </div>
      <div className="w-full grid grid-cols-4 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
        {data.map((item) => (
          <Product
            key={item._id}
            product={item}
            onClickCart={handleAddCart}
            onClickWishList={handleAddWishList}
            onClickView={handleQuickView}
          />
        ))}
      </div>
      {open && (
        <ModalViewProduct open={open} handleClose={() => setOpen(false)}>
          <QuickView item={viewProduct} key={viewProduct._id} />
        </ModalViewProduct>
      )}
    </div>
  );
});
ProductLatest.displayName = "ProductLatest";

ProductLatest.propTypes = {
  data: PropTypes.array.isRequired,
};

export default ProductLatest;
