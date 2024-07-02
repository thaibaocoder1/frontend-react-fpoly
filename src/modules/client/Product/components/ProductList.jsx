import PropTypes from "prop-types";
import ProductShop from "./Product";

const ProductList = ({ data, styles }) => {
  return (
    <div
      className={`w-full grid ${
        styles === "grid"
          ? "grid-cols-3 md-lg:grid-cols-2 md:grid-cols-2"
          : "grid-cols-1 md-lg:grid-cols-2 md:grid-cols-2"
      } gap-3`}
    >
      {data.map((p) => (
        <ProductShop key={p._id} p={p} styles={styles} />
      ))}
    </div>
  );
};

ProductList.propTypes = {
  data: PropTypes.array.isRequired,
  styles: PropTypes.string,
};

export default ProductList;
