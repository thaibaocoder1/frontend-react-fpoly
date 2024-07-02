import PropTypes from "prop-types";
import { useState } from "react";

const ProductContent = ({ product }) => {
  const [state, setState] = useState("reviews");
  return (
    <section>
      <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto pb-16">
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
                {/* {state === "reviews" ? (
                  <Reviews product={product} />
                ) : (
                )} */}
                <p className="py-5 text-slate-600">{product.description}</p>
              </div>
            </div>
          </div>

          <div className="w-[28%] md-lg:w-full">
            <div className="pl-4 md-lg:pl-0">
              <div className="px-3 py-2 text-slate-600 bg-slate-200">
                <h2 className="font-bold">From {product.name}</h2>
              </div>
              <div className="flex flex-col gap-5 mt-3 border p-3">
                {/* {moreProducts.map((p, i) => {
                  return (
                    <Link className="block">
                      <div className="relative h-[270px]">
                        <img
                          className="w-full h-full"
                          src={p.images[0]}
                          alt=""
                        />
                        {p.discount !== 0 && (
                          <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2">
                            {p.discount}%
                          </div>
                        )}
                      </div>

                      <h2 className="text-slate-600 py-1 font-bold">
                        {p.name}
                      </h2>
                      <div className="flex gap-2">
                        <h2 className="text-lg font-bold text-slate-600">
                          ${p.price}
                        </h2>
                        <div className="flex items-center gap-2">
                          <Rating ratings={p.rating} />
                        </div>
                      </div>
                    </Link>
                  );
                })} */}
              </div>
            </div>
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
