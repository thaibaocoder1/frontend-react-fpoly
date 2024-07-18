import useProduct from "@hooks/useProduct";
import { Box, LinearProgress, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { BsFillGridFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import FilterCategory from "../components/FilterCategory";
import FilterPrice from "../components/FilterPrice";
import FilterRating from "../components/FilterRating";
import FilterViews from "../components/FilterViews";
import ProductList from "../components/ProductList";
import { useDispatch, useSelector } from "react-redux";
import toastObj from "@utils/Toast";
import { setEmptyError } from "@app/slice/ProductSlice";
import SortProduct from "../components/SortProduct";

const ListPage = () => {
  const [styles, setStyles] = useState("grid");
  const [filter, setFilter] = useState(true);
  const [searchParams] = useSearchParams();
  const categoryTerm = searchParams.get("category") || "";
  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 6,
    _category: categoryTerm,
    _sort: "",
  });
  const { data } = useProduct(filters);
  const isHasError = useSelector((state) => state.product.error);
  const dispatch = useDispatch();
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      _page: 1,
      _category: categoryTerm,
    }));
  }, [categoryTerm]);
  const handlePageChange = (_, page) => {
    setFilters((prev) => ({ ...prev, _page: page }));
  };
  const handleSortChange = (sortValue) => {
    setFilters((prev) => ({ ...prev, _sort: sortValue }));
  };
  const handleFiltersChange = (newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
  };
  const setNewFilters = (newFilters) => setFilters(newFilters);
  useEffect(() => {
    if (isHasError) {
      toastObj.error(isHasError);
      dispatch(setEmptyError());
    }
  }, [isHasError, dispatch]);
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
            <FilterCategory onChange={handleFiltersChange} />
            <FilterPrice onChange={handleFiltersChange} />
            <FilterRating onChange={handleFiltersChange} />
          </div>

          <div className="w-9/12 md-lg:w-8/12 md:w-full">
            <div className="pl-8 md:pl-0">
              <div className="py-4 bg-white px-3 rounded-md flex justify-between items-start border">
                <h2 className="text-lg font-medium text-slate-600">
                  ({data.products.length}) Products
                </h2>
                <div className="flex justify-center items-center gap-3">
                  <SortProduct onChange={handleSortChange} />
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
              <FilterViews filters={filters} onChange={setNewFilters} />
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
                  onChange={handlePageChange}
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
