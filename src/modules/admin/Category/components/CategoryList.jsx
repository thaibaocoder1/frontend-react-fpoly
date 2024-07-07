import useCategory from "@hooks/useCategory";
import CategoryAddEdit from "./CategoryAddEdit";
import CategoryItem from "./CategoryItem";
import { useDispatch, useSelector } from "react-redux";
import {
  removeCategory,
  setEmptyError,
} from "../../../../app/slice/CategorySlice";
import { useEffect } from "react";
import toastObj from "@utils/Toast";

const CategoryList = () => {
  const { data } = useCategory();
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.category.error);
  const handleClickItem = (category) => {
    dispatch(removeCategory(category._id));
  };
  useEffect(() => {
    if (errorMessage) {
      toastObj.error(errorMessage);
      dispatch(setEmptyError());
    }
  }, [errorMessage, dispatch]);

  return (
    <>
      <div className="w-full lg:w-7/12">
        <div className="w-full p-4 bg-[#585392] rounded-md">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-[#d0d2d6]">
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
        </div>
      </div>
      <CategoryAddEdit />
    </>
  );
};

export default CategoryList;
