import PropTypes from "prop-types";
import ProductShop from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addProductToWishList,
  setEmptyError,
  setStatusSuccess,
} from "@app/slice/WishlistSlice";
import toastObj from "@utils/Toast";
import { addProductToCart } from "@app/slice/CartSlice";
import { memo, useCallback, useEffect, useState } from "react";
import ModalViewProduct from "@components/Modal/ModalViewProduct";
import QuickView from "@components/QuickView/QuickView";

const ProductList = memo(({ data, styles }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLoggined = useSelector((state) => state.auth.user);
  const isHasErrorWishList = useSelector((state) => state.wishlist.error);
  const isSuccessWishList = useSelector((state) => state.wishlist.success);
  const [viewProduct, setViewProduct] = useState(null);
  const [open, setOpen] = useState(false);

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
  const handleAddToCart = useCallback(
    (p) => {
      if (userLoggined && userLoggined._id) {
        dispatch(
          addProductToCart({
            userId: userLoggined._id,
            quantity: 1,
            productId: p._id,
            isBuyNow: false,
          })
        );
        toastObj.success("Add to cart success!");
      } else {
        toastObj.error("Please login first");
        navigate("/login");
      }
    },
    [userLoggined, dispatch, navigate]
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
    <div
      className={`w-full grid ${
        styles === "grid"
          ? "grid-cols-3 md-lg:grid-cols-2 md:grid-cols-2"
          : "grid-cols-1 md-lg:grid-cols-2 md:grid-cols-2"
      } gap-3`}
    >
      {data.map((p) => (
        <ProductShop
          key={p._id}
          p={p}
          styles={styles}
          onClick={handleAddWishList}
          onClickCart={handleAddToCart}
          onClickView={handleQuickView}
        />
      ))}
      {open && (
        <ModalViewProduct open={open} handleClose={() => setOpen(false)}>
          <QuickView item={viewProduct} key={viewProduct._id} />
        </ModalViewProduct>
      )}
    </div>
  );
});
ProductList.displayName = "ProductList";

ProductList.propTypes = {
  data: PropTypes.array.isRequired,
  styles: PropTypes.string,
};

export default ProductList;
