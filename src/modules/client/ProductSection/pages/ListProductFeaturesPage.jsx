import useProduct from "@hooks/useProduct";
import toastObj from "@utils/Toast";
import ProductLatest from "../components/ProductLatest";
import ProductSkeleton from "../components/ProductSkeleton";
import ProductFeature from "../components/ProductFeature";

const ListProductFeaturesPage = () => {
  const { productList, isLoading, error } = useProduct();

  return (
    <div className="w-[85%] flex flex-wrap mx-auto">
      {error && toastObj.error(error)}
      {isLoading ? (
        <ProductSkeleton length={8} />
      ) : (
        <ProductLatest data={productList.slice(0, 8)} />
      )}
      <div className="py-[90px] w-full grid grid-cols-3 md-lg:grid-cols-2 md:grid-cols-1 gap-6">
        <ProductFeature title="Test 1" />
        <ProductFeature title="Test 2" />
        <ProductFeature title="Test 3" />
      </div>
    </div>
  );
};

export default ListProductFeaturesPage;
