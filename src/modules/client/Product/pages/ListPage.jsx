import useProduct from "@hooks/useProduct";
import {
  Box,
  Button,
  LinearProgress,
  Pagination,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { BsFillGridFill } from "react-icons/bs";
import { CiStar } from "react-icons/ci";
import { FaThList } from "react-icons/fa";
import { shallowEqual, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ProductList from "../components/ProductList";

const ListPage = () => {
  const [category, setCategory] = useState("");
  const [styles, setStyles] = useState("grid");
  const [filter, setFilter] = useState(true);
  const { categories } = useSelector(
    (state) => state.category.data,
    shallowEqual
  );
  const [searchParams] = useSearchParams();
  const categoryTerm = searchParams.get("category") || "";
  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 6,
    _category: categoryTerm,
  });
  const { data } = useProduct(filters);
  const handleFiltersChange = (_, page) => {
    setFilters((prev) => ({ ...prev, _page: page }));
  };
  const queryCategory = (e, value) =>
    e.target.checked ? setCategory(value) : setCategory("");
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      _page: 1,
      _category: categoryTerm,
    }));
  }, [categoryTerm]);
  if (!data || !data.products || data.products.length === 0)
    return <LinearProgress />;
  return (
    <section className="py-16">
      <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
        <div className={`md:block hidden ${!filter ? "mb-6" : "mb-0"}`}>
          <button
            onClick={() => setFilter(!filter)}
            className="text-center w-full py-2 px-3 bg-indigo-500 text-white"
          >
            Filter Product
          </button>
        </div>

        <div className="w-full flex flex-wrap">
          <div
            className={`w-3/12 md-lg:w-4/12 md:w-full pr-8 ${
              filter
                ? "md:h-0 md:overflow-hidden md:mb-6"
                : "md:h-auto md:overflow-auto md:mb-0"
            }`}
          >
            <h2 className="text-3xl font-bold mb-3 text-slate-600">Category</h2>
            <div className="py-2">
              {categories.length > 0 &&
                categories.map((c, i) => (
                  <div
                    key={i}
                    className="flex justify-start items-center gap-2 py-1"
                  >
                    <input
                      checked={category === c.slug ? true : false}
                      onChange={(e) => queryCategory(e, c.slug)}
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

            <div className="py-2 flex flex-col gap-2">
              <h2 className="text-3xl font-bold text-slate-600">Price</h2>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    flexFlow: "row nowrap",
                    alignItems: "center",
                  }}
                >
                  <TextField variant="standard" name="salePrice_gte" />
                  <span style={{ marginInline: 10 }}>-</span>
                  <TextField variant="standard" name="salePrice_lte" />
                </Box>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ marginTop: 1 }}
                >
                  Apply
                </Button>
              </Box>
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
          </div>

          <div className="w-9/12 md-lg:w-8/12 md:w-full">
            <div className="pl-8 md:pl-0">
              <div className="py-4 bg-white mb-10 px-3 rounded-md flex justify-between items-start border">
                <h2 className="text-lg font-medium text-slate-600">
                  ({data.products.length}) Products
                </h2>
                <div className="flex justify-center items-center gap-3">
                  <select
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
                      onClick={() => setStyles("grid")}
                      className={`p-2 ${
                        styles === "grid" && "bg-slate-300"
                      } text-slate-600 hover:bg-slate-300 cursor-pointer rounded-sm`}
                    >
                      <BsFillGridFill />
                    </div>
                    <div
                      onClick={() => setStyles("list")}
                      className={`p-2 ${
                        styles === "list" && "bg-slate-300"
                      } text-slate-600 hover:bg-slate-300 cursor-pointer rounded-sm`}
                    >
                      <FaThList />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pb-8">
                <ProductList data={data.products} styles={styles} />
              </div>

              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Pagination
                  count={data.pagination.totalPages}
                  page={data.pagination.page || 1}
                  color="primary"
                  variant="outlined"
                  shape="rounded"
                  onChange={handleFiltersChange}
                />
              </Box>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListPage;
