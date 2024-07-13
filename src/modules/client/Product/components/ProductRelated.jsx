import Product from "@modules/client/ProductSection/components/Product";
import PropTypes from "prop-types";
import "react-multi-carousel/lib/styles.css";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const ProductRelated = ({ relatedProducts }) => {
  return (
    <section className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto pb-8">
      <h2 className="text-2xl pb-8 text-slate-600">Related Products</h2>
      <div>
        <Swiper
          slidesPerView={"auto"}
          breakpoints={{
            1280: {
              slidesPerView: 4,
            },
            565: {
              slidesPerView: 3,
            },
          }}
          spaceBetween={25}
          modules={[Pagination]}
          className="mySwiper"
        >
          {relatedProducts.map((item) => (
            <SwiperSlide key={item._id}>
              <Product product={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
ProductRelated.propTypes = {
  relatedProducts: PropTypes.array.isRequired,
};

export default ProductRelated;
