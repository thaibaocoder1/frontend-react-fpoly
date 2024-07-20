import PropTypes from "prop-types";
import ProductRatingTemp from "./ProductRatingTemp";
import { convertPercent } from "@utils/Convert";

const ProductRatingColumn = ({ ratingCounts }) => {
  const totalRatings = Object.values(ratingCounts).reduce(
    (sum, count) => sum + count,
    0
  );
  const ratingList = [5, 4, 3, 2, 1, 0];
  return (
    <div className="flex gap-2 flex-col py-4">
      {ratingList.map((x, index) => (
        <div key={index} className="flex justify-start items-center gap-5">
          <div className="text-md flex gap-1 w-[93px]">
            <ProductRatingTemp rating={x} />
          </div>
          <div className="w-[200px] h-[14px] bg-slate-200 relative">
            <div
              className={`h-full ${
                ratingCounts?.[x]
                  ? `w-${convertPercent(totalRatings, ratingCounts?.[x])}`
                  : "w-0"
              } bg-[#Edbb0E]`}
            ></div>
          </div>
          <p className="text-sm text-slate-600">{ratingCounts?.[x] || 0}</p>
        </div>
      ))}
    </div>
  );
};

ProductRatingColumn.propTypes = {
  ratingCounts: PropTypes.object,
};

export default ProductRatingColumn;
