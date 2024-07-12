import useProduct from "@hooks/useProduct";
import { useState } from "react";
import ProductItem from "./ProductItem";
import { Outlet } from "react-router-dom";
import { Pagination } from "@mui/material";
import SearchItem from "@components/SearchItem/SearchItem";

const ProductList = () => {
  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 6,
    _search: "",
  });
  const { data } = useProduct(filters);
  const handlePageChange = (_, page) => {
    setFilters((prev) => ({ ...prev, _page: page }));
  };
  const handleSearchChange = (value) => {
    setFilters((prev) => ({ ...prev, _search: value }));
  };

  return (
    <>
      <div className="w-full">
        <div className="w-full p-4 bg-white rounded-md">
          <div className="flex justify-between items-center">
            <h3 className="text-slate-600 bg-slate-300 p-2 rounded-md">
              Search
            </h3>
            <SearchItem onChange={handleSearchChange} />
          </div>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-sm text-black uppercase border-b border-slate-700">
                <tr>
                  <th scope="col" className="py-3 px-4">
                    No
                  </th>
                  <th scope="col" className="py-3 px-4">
                    Image
                  </th>
                  <th scope="col" className="py-3 px-4">
                    Name
                  </th>
                  <th scope="col" className="py-3 px-4">
                    Category
                  </th>
                  <th scope="col" className="py-3 px-4">
                    Code
                  </th>
                  <th scope="col" className="py-3 px-4">
                    Price
                  </th>
                  <th scope="col" className="py-3 px-4">
                    Discount
                  </th>
                  <th scope="col" className="py-3 px-4">
                    Stock
                  </th>
                  <th scope="col" className="py-3 px-4">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.products.length > 0 &&
                  data.products.map((item) => (
                    <ProductItem key={item._id} product={item} />
                  ))}
              </tbody>
            </table>
          </div>

          <div className="w-full inline-flex justify-end mt-4 bottom-4 right-4">
            <Pagination
              count={data.pagination.totalPages || 4}
              page={data.pagination.page || 1}
              variant="outlined"
              shape="rounded"
              color="primary"
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default ProductList;
