import { getAllCategory } from "@app/slice/CategorySlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useCategory = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.category);

  useEffect(() => {
    const controller = new AbortController();
    dispatch(getAllCategory({ signal: controller.signal }));
    return () => {
      return controller.abort();
    };
  }, [dispatch]);

  return { data, loading, error };
};

export default useCategory;
