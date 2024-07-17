import axios, { CanceledError } from "axios";
import { useEffect, useState } from "react";

const useFetchData = (url, shouldFetch = true) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!shouldFetch) {
      setData(null);
      return;
    }
    const abortController = new AbortController();
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(url, { signal: abortController.signal });
        setData(res.data.results);
      } catch (error) {
        if (error instanceof CanceledError) return;
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    return () => abortController.abort();
  }, [url, shouldFetch]);

  return { data, isLoading, error };
};

export default useFetchData;
