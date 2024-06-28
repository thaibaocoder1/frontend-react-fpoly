import productApi from "@api/ProductApi";
import { CanceledError } from "axios";
import { useEffect, useState } from "react";

const useProduct = () => {
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const { request, cancel } = productApi.getAll();
    const getProductList = async () => {
      try {
        setIsLoading(true);
        const res = await request;
        if (res && res.status === "success") {
          setIsLoading(false);
          const { data } = res;
          setProductList(data);
        }
      } catch (error) {
        if (error instanceof CanceledError) return;
        setError(error.message);
        setIsLoading(true);
      }
    };
    getProductList();
    return () => cancel();
  }, []);

  return { productList, isLoading, error };
};

export default useProduct;
