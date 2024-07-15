import { addProductToCart } from "@app/slice/CartSlice";
import { addProductToWithList, setEmptyError } from "@app/slice/WithlistSlice";
import toastObj from "@utils/Toast";
import PropTypes from "prop-types";
import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Product from "./Product";

const ProductLatest = memo(({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLoggined = useSelector((state) => state.auth.user);
  const isHasErrorWithList = useSelector((state) => state.withlist.error);
  const isSuccessWithList = useSelector((state) => state.withlist.success);

  const handleAddCart = (item) => {
    if (userLoggined && userLoggined._id) {
      dispatch(
        addProductToCart({
          userId: userLoggined._id,
          quantity: 1,
          productId: item._id,
        })
      );
      toastObj.success("Add to cart success");
    } else {
      toastObj.error("Please login first");
      navigate("/login");
    }
  };
  const handleAddWithList = (item) => {
    dispatch(addProductToWithList(item._id));
  };

  useEffect(() => {
    if (isHasErrorWithList) {
      toastObj.error(isHasErrorWithList);
      dispatch(setEmptyError());
    }
    if (isSuccessWithList) {
      toastObj.success("Add to withlist");
    }
  }, [isHasErrorWithList, isSuccessWithList, dispatch]);
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
            onClickWithList={handleAddWithList}
          />
        ))}
      </div>
    </div>
  );
});
ProductLatest.displayName = "ProductLatest";

ProductLatest.propTypes = {
  data: PropTypes.array.isRequired,
};

export default ProductLatest;
