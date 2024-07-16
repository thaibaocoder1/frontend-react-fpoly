import { addProductToCart } from "@app/slice/CartSlice";
import { formatOriginalPrice, formatSalePrice } from "@utils/Format";
import toastObj from "@utils/Toast";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

const QuickView = ({ item }) => {
  const productId = item._id;
  const userLoggined = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    if (userLoggined && userLoggined._id) {
      dispatch(
        addProductToCart({
          userId: userLoggined._id,
          quantity: 1,
          productId,
          isBuyNow: false,
        })
      );
      toastObj.success("Add to cart success");
    } else {
      toastObj.error("Please login first");
    }
  };
  return (
    <div className="p-4 max-w-lg mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="flex flex-col items-center">
        <img
          className="h-64 w-full object-contain"
          src={item.thumb[0].fileName}
          alt={item.name}
        />
        <div className="mt-4 grid grid-cols-5 gap-2">
          {item.thumb.map((thumb, index) => (
            <img
              key={index}
              className="h-24 w-full object-cover border border-dashed border-slate-500"
              src={thumb.fileName}
              alt={`${item.name} thumbnail ${index + 1}`}
            />
          ))}
        </div>
      </div>
      <div className="py-4">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
          {item.code}
        </div>
        <h1 className="block mt-1 text-lg leading-tight font-medium text-black">
          {item.name}
        </h1>
        <p className="mt-2 text-gray-500">{item.description}</p>
        <div className="mt-2">
          <span className="text-xl font-bold text-black mr-1">
            {formatSalePrice(item.price, item.discount)}
          </span>
          <span className="text-base font-medium text-slate-400 line-through relative -top-1">
            {formatOriginalPrice(item.price)}
          </span>
        </div>
        <div className="mt-2">
          <button
            onClick={handleAddToCart}
            className="bg-indigo-500 text-white px-3 py-2 rounded-lg transition-all hover:bg-indigo-600 shadow-md duration-300"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};
QuickView.propTypes = {
  item: PropTypes.object,
};

export default QuickView;
