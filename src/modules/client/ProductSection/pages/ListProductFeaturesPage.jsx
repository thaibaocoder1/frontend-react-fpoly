import useProductHome from "@hooks/useProductHome";
import toastObj from "@utils/Toast";
import ProductFeature from "../components/ProductFeature";
import ProductLatest from "../components/ProductLatest";
import ProductSkeleton from "../components/ProductSkeleton";

const ListProductFeaturesPage = () => {
  const { productList, isLoading, error } = useProductHome();

  if (error) return toastObj.error(error);
  if (isLoading)
    return (
      <div className="grid grid-cols-4 gap-3 mx-auto w-[85%]">
        <ProductSkeleton length={8} />
      </div>
    );

  return (
    <div className="w-[85%] flex flex-wrap mx-auto">
      <ProductLatest data={productList.slice(0, 8)} />
      <div className="py-[90px] w-full grid grid-cols-3 md-lg:grid-cols-2 md:grid-cols-1 gap-6">
        <ProductFeature
          title="Featured Products"
          products={[productList.slice(0, 3), productList.slice(3, 6)]}
        />
        <ProductFeature
          title="Hot Products"
          products={[productList.slice(6, 9), productList.slice(9, 12)]}
        />
        <ProductFeature
          title="Discount Products"
          products={[productList.slice(12, 15), productList.slice(15, 18)]}
        />
      </div>
    </div>
  );
};

export default ListProductFeaturesPage;
