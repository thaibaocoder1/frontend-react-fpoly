import useCategory from "@hooks/useCategory";
import useProduct from "@hooks/useProduct";
import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { BsFillGridFill } from "react-icons/bs";
import { CiStar } from "react-icons/ci";
import { FaThList } from "react-icons/fa";
import ProductList from "../components/ProductList";

const ListPage = () => {
  const [category, setCategory] = useState("");
  const { categoryList } = useCategory();
  const { productList } = useProduct();

  const queryCategory = (e, value) => {
    if (e.target.checked) {
      setCategory(value);
    } else {
      setCategory("");
    }
  };

  return (
    <section className="py-16">
      <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
        {/* ${!filter ? "mb-6" : "mb-0"}  */}
        <div className={`md:block hidden`}>
          <button
            // onClick={() => setFilter(!filter)}
            className="text-center w-full py-2 px-3 bg-indigo-500 text-white"
          >
            Filter Product
          </button>
        </div>

        <div className="w-full flex flex-wrap">
          {/* ${
              filter
                ? "md:h-0 md:overflow-hidden md:mb-6"
                : "md:h-auto md:overflow-auto md:mb-0"
            }  */}
          <div className={`w-3/12 md-lg:w-4/12 md:w-full pr-8`}>
            <h2 className="text-3xl font-bold mb-3 text-slate-600">Category</h2>
            <div className="py-2">
              {categoryList.map((c, i) => (
                <div
                  key={i}
                  className="flex justify-start items-center gap-2 py-1"
                >
                  <input
                    checked={category === c.title ? true : false}
                    onChange={(e) => queryCategory(e, c.title)}
                    type="checkbox"
                    id={c.title}
                  />
                  <label
                    className="text-slate-600 block cursor-pointer"
                    htmlFor={c.title}
                  >
                    {c.title}
                  </label>
                </div>
              ))}
            </div>

            <div className="py-2 flex flex-col gap-5">
              <h2 className="text-3xl font-bold mb-3 text-slate-600">Price</h2>
              {/* <Range
                step={5}
                min={priceRange.low}
                max={priceRange.high}
                values={state.values}
                onChange={(values) => setState({ values })}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    className="w-full h-[6px] bg-slate-200 rounded-full cursor-pointer"
                  >
                    {children}
                  </div>
                )}
                renderThumb={({ props }) => (
                  <div
                    className="w-[15px] h-[15px] bg-[#059473] rounded-full"
                    {...props}
                  />
                )}
              /> */}
              <div>
                {/* <span className="text-slate-800 font-bold text-lg">
                  ${Math.floor(state.values[0])} - $
                  {Math.floor(state.values[1])}
                </span> */}
              </div>
            </div>

            <div className="py-3 flex flex-col gap-4">
              <h2 className="text-3xl font-bold mb-3 text-slate-600">Rating</h2>
              <div className="flex flex-col gap-3">
                <div
                  // onClick={() => setRating(5)}
                  className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer"
                >
                  <span>
                    <AiFillStar />
                  </span>
                  <span>
                    <AiFillStar />
                  </span>
                  <span>
                    <AiFillStar />
                  </span>
                  <span>
                    <AiFillStar />
                  </span>
                  <span>
                    <AiFillStar />
                  </span>
                </div>

                <div
                  // onClick={() => setRating(4)}
                  className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer"
                >
                  <span>
                    <AiFillStar />
                  </span>
                  <span>
                    <AiFillStar />
                  </span>
                  <span>
                    <AiFillStar />
                  </span>
                  <span>
                    <AiFillStar />
                  </span>
                  <span>
                    <CiStar />
                  </span>
                </div>

                <div
                  // onClick={() => setRating(3)}
                  className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer"
                >
                  <span>
                    <AiFillStar />
                  </span>
                  <span>
                    <AiFillStar />
                  </span>
                  <span>
                    <AiFillStar />
                  </span>
                  <span>
                    <CiStar />
                  </span>
                  <span>
                    <CiStar />
                  </span>
                </div>

                <div
                  // onClick={() => setRating(2)}
                  className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer"
                >
                  <span>
                    <AiFillStar />
                  </span>
                  <span>
                    <AiFillStar />
                  </span>
                  <span>
                    <CiStar />
                  </span>
                  <span>
                    <CiStar />
                  </span>
                  <span>
                    <CiStar />
                  </span>
                </div>

                <div
                  // onClick={() => setRating(1)}
                  className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer"
                >
                  <span>
                    <AiFillStar />
                  </span>
                  <span>
                    <CiStar />
                  </span>
                  <span>
                    <CiStar />
                  </span>
                  <span>
                    <CiStar />
                  </span>
                  <span>
                    <CiStar />
                  </span>
                </div>

                <div
                  // onClick={resetRating}
                  className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer"
                >
                  <span>
                    <CiStar />
                  </span>
                  <span>
                    <CiStar />
                  </span>
                  <span>
                    <CiStar />
                  </span>
                  <span>
                    <CiStar />
                  </span>
                  <span>
                    <CiStar />
                  </span>
                </div>
              </div>
            </div>

            <div className="py-5 flex flex-col gap-4 md:hidden">Latest</div>
          </div>

          <div className="w-9/12 md-lg:w-8/12 md:w-full">
            <div className="pl-8 md:pl-0">
              <div className="py-4 bg-white mb-10 px-3 rounded-md flex justify-between items-start border">
                <h2 className="text-lg font-medium text-slate-600">
                  ({productList.length}) Products
                </h2>
                <div className="flex justify-center items-center gap-3">
                  <select
                    // onChange={(e) => setSortPrice(e.target.value)}
                    className="p-1 border outline-0 text-slate-600 font-semibold"
                    name=""
                    id=""
                  >
                    <option value="">Sort By</option>
                    <option value="low-to-high">Low to High Price</option>
                    <option value="high-to-low">High to Low Price </option>
                  </select>
                  <div className="flex justify-center items-start gap-4 md-lg:hidden">
                    <div
                      // onClick={() => setStyles("grid")}
                      // ${
                      //   styles === "grid" && "bg-slate-300"
                      // }
                      className={`p-2 text-slate-600 hover:bg-slate-300 cursor-pointer rounded-sm `}
                    >
                      <BsFillGridFill />
                    </div>
                    <div
                      // onClick={() => setStyles("list")}
                      // ${
                      //   styles === "list" && "bg-slate-300"
                      // }
                      className={`p-2 text-slate-600 hover:bg-slate-300 cursor-pointer rounded-sm `}
                    >
                      <FaThList />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pb-8">
                <ProductList data={productList} styles="grid" />
              </div>

              <div>
                {/* {totalProduct > parPage && (
                  <Pagination
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                    totalItem={totalProduct}
                    parPage={parPage}
                    showItem={Math.floor(totalProduct / parPage)}
                  />
                )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListPage;
