import useCategory from "@hooks/useCategory";
import CategoryAddEdit from "./CategoryAddEdit";
import CategoryItem from "./CategoryItem";
import { useDispatch, useSelector } from "react-redux";
import {
  removeCategory,
  setEmptyError,
} from "../../../../app/slice/CategorySlice";
import { useEffect, useState } from "react";
import toastObj from "@utils/Toast";
import SearchItem from "@components/SearchItem/SearchItem";
import { Pagination } from "@mui/material";

const CategoryList = () => {
  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 6,
    _search: "",
  });
  const { data } = useCategory(filters);
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.category.error);
  useEffect(() => {
    if (errorMessage) {
      toastObj.error(errorMessage);
      dispatch(setEmptyError());
    }
  }, [errorMessage, dispatch]);
  const handleClickItem = (category) => {
    dispatch(removeCategory(category._id));
  };
  const handlePageChange = (_, page) => {
    setFilters((prev) => ({ ...prev, _page: page }));
  };
  const handleSearchChange = (value) => {
    setFilters((prev) => ({ ...prev, _search: value }));
  };

  return (
    <>
      <div className="w-full lg:w-7/12">
        <div className="w-full p-4 bg-white rounded-md">
          <div className="flex justify-between items-center">
            <h3 className="text-slate-600 bg-slate-300 p-2 rounded-md">
              Search
            </h3>
            <SearchItem onChange={handleSearchChange} />
          </div>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-black">
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
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.categories.map((item) => (
                  <CategoryItem
                    key={item._id}
                    category={item}
                    onClick={handleClickItem}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-full inline-flex justify-end mt-4 bottom-4 right-4">
            <Pagination
              count={data.pagination.totalPages}
              page={data.pagination.page || 1}
              variant="outlined"
              shape="rounded"
              color="primary"
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
      <CategoryAddEdit />
    </>
  );
};

export default CategoryList;
