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
import { memo, useEffect } from "react";

const ProductList = memo(({ data, styles }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLoggined = useSelector((state) => state.auth.user);
  const isHasErrorWishList = useSelector((state) => state.wishlist.error);
  const isSuccessWishList = useSelector((state) => state.wishlist.success);

  const handleAddWishList = (item) => {
    if (userLoggined && userLoggined._id) {
      dispatch(addProductToWishList(item._id));
    } else {
      toastObj.error("Please login first");
    }
  };
  const handleAddToCart = (p) => {
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
  };
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
        />
      ))}
    </div>
  );
});
ProductList.displayName = "ProductList";

ProductList.propTypes = {
  data: PropTypes.array.isRequired,
  styles: PropTypes.string,
};

export default ProductList;
