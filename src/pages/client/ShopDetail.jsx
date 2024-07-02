import productApi from "@api/ProductApi";
import ProductDetail from "@modules/client/Product/components/ProductDetail";
import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { NavLink, useParams } from "react-router-dom";

const ShopDetail = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState({});

  useEffect(() => {
    async function getProduct() {
      setIsLoading(true);
      try {
        const res = await productApi.getOne(id);
        if (res && res.status === "success") {
          const { data } = res;
          setProduct(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
    getProduct();
  }, [id]);

  return (
    <>
      <section
        className={`bg-[url('https://vending-cdn.kootoro.com/torov-cms/upload/image/1669358914523-kh%C3%A1i%20ni%E1%BB%87m%20qu%E1%BA%A3ng%20c%C3%A1o%20banner%20tr%C3%AAn%20website.jpg')] h-[250px] mt-6 bg-cover bg-no-repeat relative bg-left`}
      >
        <div className="absolute left-0 top-0 w-full h-full bg-[#2422228a]">
          <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
            <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-white">
              <h2 className="text-3xl font-bold">Shop Detail</h2>
              <div className="flex justify-center items-center gap-2 text-lg w-full">
                <NavLink to="/">Home</NavLink>
                <span className="pt-1">
                  <IoIosArrowForward />
                </span>
                <span>Shop Detail</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {isLoading ? "Loading..." : <ProductDetail product={product} />}
    </>
  );
};

export default ShopDetail;
