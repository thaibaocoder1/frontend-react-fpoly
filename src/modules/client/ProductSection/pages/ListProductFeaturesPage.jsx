import ProductFeature from "@modules/client/Product";

const ListProductFeaturesPage = () => {
  return (
    <div className="w-[85%] flex flex-wrap mx-auto">
      <div className="w-full grid grid-cols-3 md-lg:grid-cols-2 md:grid-cols-1 gap-6">
        <ProductFeature />
        <ProductFeature />
        <ProductFeature />
      </div>
    </div>
  );
};

export default ListProductFeaturesPage;
