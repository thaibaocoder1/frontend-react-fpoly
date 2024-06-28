import categoryApi from "@api/CategoryApi";
import { CanceledError } from "axios";
import { useEffect, useState } from "react";

const useCategory = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const { request, cancel } = categoryApi.getAll();
    const getCategoryList = async () => {
      try {
        setIsLoading(true);
        const res = await request;
        if (res && res.status === "success") {
          setIsLoading(false);
          const { data } = res;
          setCategoryList(data);
        }
      } catch (error) {
        if (error instanceof CanceledError) return;
        setError(error.message);
        setIsLoading(true);
      }
    };
    getCategoryList();
    return () => cancel();
  }, []);

  return { categoryList, isLoading, error };
};

export default useCategory;
