import { Link } from "react-router-dom";

const CartFeature = () => {
  const card_products = [1, 2];
  const outOfStockProduct = [1, 2];

  return (
    <section className="bg-[#eeeeee]">
      <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16">
        {card_products.length > 0 || outOfStockProduct > 0 ? (
          <div className="flex flex-wrap">
            <div className="w-[67%] md-lg:w-full">
              <div className="pr-3 md-lg:pr-0">
                <div className="flex flex-col gap-3">
                  <div className="bg-white p-4">
                    <h2 className="text-md text-green-500 font-semibold">
                      Stock Products {card_products.length}
                    </h2>
                  </div>

                  {card_products.map((p, i) => (
                    <div key={i} className="flex bg-white p-4 flex-col gap-2">
                      <div className="flex justify-start items-center">
                        <h2 className="text-md text-slate-600 font-bold">
                          {p.shopName}
                        </h2>
                      </div>

                      {/* {p.products.map((pt, i) => (
                    <div key={i} className="w-full flex flex-wrap">
                      <div className="flex sm:w-full gap-2 w-7/12">
                        <div className="flex gap-2 justify-start items-center">
                          <img
                            className="w-[80px] h-[80px]"
                            src={pt.productInfo.images[0]}
                            alt=""
                          />
                          <div className="pr-4 text-slate-600">
                            <h2 className="text-md font-semibold">
                              {pt.productInfo.name}{" "}
                            </h2>
                            <span className="text-sm">
                              Brand: {pt.productInfo.brand}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between w-5/12 sm:w-full sm:mt-3">
                        <div className="pl-4 sm:pl-0">
                          <h2 className="text-lg text-orange-500">
                            $
                            {pt.productInfo.price -
                              Math.floor(
                                (pt.productInfo.price *
                                  pt.productInfo.discount) /
                                  100
                              )}
                          </h2>
                          <p className="line-through">
                            ${pt.productInfo.price}
                          </p>
                          <p>-{pt.productInfo.discount}%</p>
                        </div>
                        <div className="flex gap-2 flex-col">
                          <div className="flex bg-slate-200 h-[30px] justify-center items-center text-xl">
                            <div
                              // onClick={() => dec(pt.quantity, pt._id)}
                              className="px-3 cursor-pointer"
                            >
                              -
                            </div>
                            <div className="px-3">{pt.quantity}</div>
                            <div
                              // onClick={() =>
                              //   inc(
                              //     pt.quantity,
                              //     pt.productInfo.stock,
                              //     pt._id
                              //   )
                              // }
                              className="px-3 cursor-pointer"
                            >
                              +
                            </div>
                          </div>
                          <button
                            // onClick={() =>
                            //   dispatch(delete_card_product(pt._id))
                            // }
                            className="px-5 py-[3px] bg-red-500 text-white"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))} */}
                    </div>
                  ))}

                  {outOfStockProduct.length > 0 && (
                    <div className="flex flex-col gap-3">
                      <div className="bg-white p-4">
                        <h2 className="text-md text-red-500 font-semibold">
                          Out of Stock {outOfStockProduct.length}
                        </h2>
                      </div>

                      <div className="bg-white p-4">
                        {outOfStockProduct.map((p, i) => (
                          <div key={i} className="w-full flex flex-wrap">
                            <div className="flex sm:w-full gap-2 w-7/12">
                              <div className="flex gap-2 justify-start items-center">
                                <img
                                  className="w-[80px] h-[80px]"
                                  // src={p.products[0].images[0]}
                                  alt=""
                                />
                                <div className="pr-4 text-slate-600">
                                  <h2 className="text-md font-semibold">
                                    {/* {p.products[0].name}{" "} */}
                                  </h2>
                                  <span className="text-sm">
                                    {/* Brand: {p.products[0].brand} */}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-between w-5/12 sm:w-full sm:mt-3">
                              <div className="pl-4 sm:pl-0">
                                <h2 className="text-lg text-orange-500">
                                  {/* $
                              {p.products[0].price -
                                Math.floor(
                                  (p.products[0].price *
                                    p.products[0].discount) /
                                    100
                                )} */}
                                </h2>
                                <p className="line-through">
                                  {/* ${p.products[0].price} */}
                                </p>
                                {/* <p>-{p.products[0].discount}%</p> */}
                              </div>
                              <div className="flex gap-2 flex-col">
                                <div className="flex bg-slate-200 h-[30px] justify-center items-center text-xl">
                                  <div
                                    // onClick={() => dec(p.quantity, p._id)}
                                    className="px-3 cursor-pointer"
                                  >
                                    -
                                  </div>
                                  <div className="px-3">{p.quantity}</div>
                                  <div className="px-3 cursor-pointer">+</div>
                                </div>
                                <button
                                  // onClick={() =>
                                  //   dispatch(delete_card_product(p._id))
                                  // }
                                  className="px-5 py-[3px] bg-red-500 text-white"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="w-[33%] md-lg:w-full">
              <div className="pl-3 md-lg:pl-0 md-lg:mt-5">
                {card_products.length > 0 && (
                  <div className="bg-white p-3 text-slate-600 flex flex-col gap-3">
                    <h2 className="text-xl font-bold">Order Summary</h2>
                    <div className="flex justify-between items-center">
                      <span> Items </span>
                      <span> </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Shipping Fee </span>
                      <span> </span>
                    </div>
                    <div className="flex gap-2">
                      <input
                        className="w-full px-3 py-2 border border-slate-200 outline-0 focus:border-green-500 rounded-sm"
                        type="text"
                        placeholder="Input Vauchar Coupon"
                      />
                      <button className="px-5 py-[1px] bg-[#059473] text-white rounded-sm uppercase text-sm">
                        Apply
                      </button>
                    </div>

                    <div className="flex justify-between items-center">
                      <span>Total</span>
                      <span className="text-lg text-[#059473]"></span>
                    </div>
                    <button
                      // onClick={redirect}
                      className="px-5 py-[6px] rounded-sm hover:shadow-red-500/50 hover:shadow-lg bg-red-500 text-sm text-white uppercase "
                    >
                      {/* Process to Checkout ({buy_product_item}) */}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <Link className="px-4 py-1 bg-indigo-500 text-white" to="/shops">
              Shop Now
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default CartFeature;
