import PropTypes from "prop-types";

const ProductShopSkeleton = ({ styles }) => {
  return (
    <div
      className={`animate-pulse flex transition-all duration-1000 hover:shadow-md hover:-translate-y-3 ${
        styles === "grid"
          ? "flex-col justify-start items-start"
          : "justify-start items-center md-lg:flex-col md-lg:justify-start md-lg:items-start"
      } w-full gap-4 bg-white p-1 rounded-md border border-slate-200`}
    >
      <div
        className={
          styles === "grid"
            ? "w-full relative group h-[210px] md:h-[270px] xs:h-[170px] overflow-hidden"
            : "md-lg:w-full relative group h-[210px] md:h-[270px] overflow-hidden"
        }
      >
        <div
          className={`h-[200px] rounded-md md:h-[270px] xs:h-[170px] w-full ${
            styles === "grid" ? "object-contain" : "object-cover"
          }`}
        />
      </div>

      <div className="flex justify-start items-start flex-col gap-1 p-2">
        <h2 className="font-bold"></h2>
        <div className="flex justify-start items-center gap-3">
          <span className="text-md font-semibold h-2 bg-slate-700 rounded col-span-2"></span>
          <div className="flex h-2 bg-slate-700 rounded col-span-2"></div>
        </div>
      </div>
    </div>
  );
};

ProductShopSkeleton.propTypes = {
  styles: PropTypes.string.isRequired,
};

export default ProductShopSkeleton;
