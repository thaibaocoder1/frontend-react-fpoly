import { formatOriginalPrice, formatSalePrice } from "@utils/Format";
import PropTypes from "prop-types";

const CheckoutCart = ({ cart }) => {
  return (
    <div className="flex bg-white p-4 flex-col gap-2 mb-3 rounded-lg">
      <div className="flex justify-start items-center">
        <h2 className="text-xl text-slate-600 font-bold">Cart</h2>
      </div>
      {cart.length > 0 &&
        cart.map((item) => (
          <div key={item._id} className="w-full flex flex-wrap">
            <div className="flex sm:w-full gap-2 w-8/12">
              <div className="flex gap-2 justify-start items-center">
                <img
                  className="w-[60px] h-[60px] object-cover"
                  src={item.thumb[0].fileName}
                  alt={item.name}
                />
                <div className="pr-4 text-slate-600">
                  <h2 className="text-base font-semibold">{item.name}</h2>
                  <p className="text-sm">Code: {item.code}</p>
                  <span className="text-sm">Quantity: {item.quantity}</span>
                </div>
              </div>
            </div>
            <div className="flex justify-between w-4/12 sm:w-full sm:mt-3">
              <div className="pl-4 sm:pl-0">
                <h2 className="text-base text-orange-500">
                  {formatSalePrice(item.price, item.discount)}
                </h2>
                <p className="line-through text-sm">
                  {formatOriginalPrice(item.price)}
                </p>
                <p>-{item.discount}%</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
CheckoutCart.propTypes = {
  cart: PropTypes.array,
};

export default CheckoutCart;
