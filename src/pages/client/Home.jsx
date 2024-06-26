import Banner from "@components/Banner";
import Categories from "@components/Category";
import ProductSectionFeature from "@modules/client/ProductSection";
import ListProductFeaturesPage from "@modules/client/ProductSection/pages/ListProductFeaturesPage";

const Home = () => {
  return (
    <div className="w-full">
      <Banner />
      <Categories />
      <div className="py-[45px]">
        <ProductSectionFeature />
      </div>
      <div className="py-[45px]">
        <ListProductFeaturesPage />
      </div>
    </div>
  );
};

export default Home;
