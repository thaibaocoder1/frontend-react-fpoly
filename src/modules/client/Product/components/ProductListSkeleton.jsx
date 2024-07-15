import PropTypes from "prop-types";
import ProductShopSkeleton from "./ProductShopSkeleton";

const ProductListSkeleton = ({ styles, length }) => {
  return (
    <div
      className={`w-full grid ${
        styles === "grid"
          ? "grid-cols-3 md-lg:grid-cols-2 md:grid-cols-2"
          : "grid-cols-1 md-lg:grid-cols-2 md:grid-cols-2"
      } gap-3`}
    >
      {Array.from(length)
        .fill(null)
        .map((_, index) => (
          <ProductShopSkeleton key={index} styles={styles} />
        ))}
    </div>
  );
};

ProductListSkeleton.propTypes = {
  styles: PropTypes.string,
  length: PropTypes.number,
};

export default ProductListSkeleton;
