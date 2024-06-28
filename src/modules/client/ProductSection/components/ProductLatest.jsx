import PropTypes from "prop-types";
import Product from "./Product";

const ProductLatest = ({ data }) => {
  return (
    <div className="w-full">
      <div className="text-center flex justify-center items-center flex-col text-4xl text-slate-600 font-bold relative pb-[35px]">
        <h2>Latest Products</h2>
        <div className="w-[100px] h-[2px] bg-[#059473] mt-4"></div>
      </div>
      <div className="w-full grid grid-cols-4 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
        {data.map((item) => (
          <Product key={item._id} product={item} />
        ))}
      </div>
    </div>
  );
};

ProductLatest.propTypes = {
  data: PropTypes.array.isRequired,
};

export default ProductLatest;
