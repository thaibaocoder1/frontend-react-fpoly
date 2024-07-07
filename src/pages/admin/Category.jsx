import { setShowDialog } from "@app/slice/CategorySlice";
import CategoryList from "@modules/admin/Category/components/CategoryList";
import { useDispatch } from "react-redux";

const CategoryAdmin = () => {
  const dispatch = useDispatch();
  const handleShowDialog = () => {
    dispatch(setShowDialog());
  };

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="flex lg:hidden justify-between items-center mb-5 p-4 bg-[#585392] rounded-md">
        <h1 className="text-[#d0d2d6] font-semibold text-lg">All Category</h1>
        <button
          className="bg-red-500 shadow-lg hover:shadow-red-500/40 px-4 py-2 cursor-pointer text-white rounded-sm text-sm"
          onClick={handleShowDialog}
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap w-full">
        <CategoryList />
      </div>
    </div>
  );
};

export default CategoryAdmin;
