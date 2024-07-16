import useProductSingle from "@hooks/useProductSingle";
import ProductDetail from "@modules/client/Product/components/ProductDetail";
import ProductDetailSkeleton from "@modules/client/Product/components/ProductDetailSkeleton";
import { IoIosArrowForward } from "react-icons/io";
import { NavLink, useParams } from "react-router-dom";

const ShopDetail = () => {
  const { id } = useParams();
  const { current } = useProductSingle(id);
  if (!current) return <ProductDetailSkeleton />;
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
      <ProductDetail product={current} />
    </>
  );
};

export default ShopDetail;
