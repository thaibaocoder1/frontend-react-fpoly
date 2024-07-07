import { IoMdCloseCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setHideDialog } from "../../../../app/slice/CategorySlice";
import CategoryForm from "./CategoryForm";

const CategoryAddEdit = () => {
  const dispatch = useDispatch();
  const isShowDialog = useSelector((state) => state.category.show);
  const currentCategory = useSelector((state) => state.category.current);

  return (
    <>
      <div
        className={`w-[320px] lg:w-5/12 translate-x-100 lg:relative lg:right-0 fixed z-[9999] top-0 transition-all duration-500 shadow-slate-400 ${
          isShowDialog ? "right-0" : "-right-[340px]"
        }`}
      >
        <div className="w-full pl-5">
          <div className="bg-[#585392] h-screen lg:h-auto px-3 py-2 lg:rounded-md text-[#d0d2d6]">
            <div className="flex justify-between items-center mb-4 p-2">
              <h1 className="text-[#d0d2d6] font-semibold text-xl w-full text-center">
                {currentCategory ? "Edit Category" : "Add Category"}
              </h1>
              <div
                className="flex items-center justify-center bg-slate-400 rounded-md text-white hover:text-black cursor-pointer lg:hidden w-9 aspect-square transition-all duration-300"
                onClick={() => dispatch(setHideDialog())}
              >
                <IoMdCloseCircle />
              </div>
            </div>
            <CategoryForm />
          </div>
        </div>
      </div>
      <div
        onClick={() => dispatch(setHideDialog())}
        className={`fixed duration-200 ${
          !isShowDialog || currentCategory ? "invisible" : "visible"
        } w-screen h-screen top-0 left-0 z-[999999`}
      ></div>
    </>
  );
};

export default CategoryAddEdit;
