import PropTypes from "prop-types";
import { useState } from "react";
import ProductReviews from "./ProductReviews";

const ProductContent = ({ product }) => {
  const [state, setState] = useState("reviews");

  return (
    <section className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto pb-16">
      <div className="flex flex-wrap">
        <div className="w-[72%] md-lg:w-full">
          <div className="pr-4 md-lg:pr-0">
            <div className="grid grid-cols-2">
              <button
                onClick={() => setState("reviews")}
                className={`py-1 hover:text-white px-5 hover:bg-[#059473] ${
                  state === "reviews"
                    ? "bg-[#059473] text-white"
                    : "bg-slate-200 text-slate-700"
                } rounded-sm`}
              >
                Reviews
              </button>

              <button
                onClick={() => setState("description")}
                className={`py-1 hover:text-white px-5 hover:bg-[#059473] ${
                  state === "description"
                    ? "bg-[#059473] text-white"
                    : "bg-slate-200 text-slate-700"
                } rounded-sm`}
              >
                Description
              </button>
            </div>

            <div>
              {state === "reviews" ? (
                <ProductReviews product={product} />
              ) : (
                <p className="py-5 text-slate-600">{product.content}</p>
              )}
            </div>
          </div>
        </div>

        <div className="w-[28%] md-lg:w-full">
          <div className="pl-4 md-lg:pl-0">
            <div className="px-3 py-2 text-slate-600 bg-slate-200">
              <h2 className="font-bold">From {product.name}</h2>
            </div>
            <div className="flex flex-col gap-5 mt-3 border p-3">TEMP DATA</div>
          </div>
        </div>
      </div>
    </section>
  );
};
ProductContent.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductContent;
