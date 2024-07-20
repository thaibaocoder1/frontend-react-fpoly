import useAllProduct from "@hooks/useAllProduct";
import { useDebouncedValue } from "@utils/DebounceV2";
import { formatSalePrice } from "@utils/Format";
import toastObj from "@utils/Toast";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

const SearchHeader = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [productList, setProductList] = useState([]);
  const { cart: data } = useAllProduct();
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 500);
  useEffect(() => {
    if (debouncedSearchTerm) {
      const newProductList = [...data].filter((item) =>
        item.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
      setProductList(newProductList);
    } else {
      setProductList([]);
    }
  }, [debouncedSearchTerm, data]);
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!searchTerm) {
      toastObj.error("Please fill this field");
      if ("URLSearchParams" in window) {
        const url = new URL(window.location);
        if (url.searchParams.has("search")) url.searchParams.delete("search");
        history.pushState(null, "", url);
      }
      return;
    }
    if (productList.length === 0) {
      toastObj.error("Not found product");
      return;
    } else {
      navigate({
        pathname: "/shops",
        search: `?search=${debouncedSearchTerm}`,
      });
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmitForm}
        className="flex border h-[50px] items-center relative gap-6"
      >
        <label
          htmlFor="searchInput"
          className="relative after:absolute after:h-[25px] after:w-[1px] after:bg-[#afafaf] after:-right-[15px] after:-top-[5px]  ml-3 md:hidden"
        >
          <BsSearch></BsSearch>
        </label>
        <input
          className="w-full relative bg-transparent text-slate-500 outline-0 px-3 h-full"
          type="text"
          name="search"
          id="searchInput"
          placeholder="What do you need"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="bg-[#059473] right-0 absolute px-8 h-full font-semibold uppercase text-white">
          Search
        </button>
      </form>
      <div
        className={`bg-white p-3 transition-all duration-300 shadow-md hover:shadow-lg absolute z-50 rounded-t-none rounded-b-md flex flex-col w-full h-max overflow-auto origin-top-center ${
          productList.length > 0 ? "opacity-100 scale-100" : "opacity-0 scale-0"
        }`}
      >
        {productList.length > 0 &&
          productList.map((product) => (
            <div
              className="flex items-start mb-2 pb-2 border-b-2"
              key={product._id}
            >
              <figure className="w-[60px] h-[60px]">
                <img
                  src={product.thumb[0].fileName}
                  alt={product.name}
                  className="w-full rounded-sm h-full object-cover"
                />
              </figure>
              <div className="flex-1 ml-5">
                <Link to={`/shops/detail/${product._id}`}>{product.name}</Link>
                <div>
                  <span>
                    {formatSalePrice(product.price, product.discount)}
                  </span>
                  <span className="text-red-400 ml-1">{product.discount}%</span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default SearchHeader;
