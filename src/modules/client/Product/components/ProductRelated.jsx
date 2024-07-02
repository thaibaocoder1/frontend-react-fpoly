import "react-multi-carousel/lib/styles.css";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper } from "swiper/react";
import PropTypes from "prop-types";

const ProductRelated = ({ relatedProducts }) => {
  return (
    <section>
      <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
        <h2 className="text-2xl py-8 text-slate-600">Related Products </h2>
        <div>
          <Swiper
            slidesPerView="auto"
            breakpoints={{
              1280: {
                slidesPerView: 3,
              },
              565: {
                slidesPerView: 2,
              },
            }}
            spaceBetween={25}
            loop={true}
            pagination={{
              clickable: true,
              el: ".custom_bullet",
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {/* {relatedProducts.map((p, i) => {
              return (
                <SwiperSlide key={i}>
                  <Link className="block">
                    <div className="relative h-[270px]">
                      <div className="w-full h-full">
                        <img
                          className="w-full h-full"
                          src={p.images[0]}
                          alt=""
                        />
                        <div className="absolute h-full w-full top-0 left-0 bg-[#000] opacity-25 hover:opacity-50 transition-all duration-500"></div>
                      </div>
                      {p.discount !== 0 && (
                        <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2">
                          {p.discount}%
                        </div>
                      )}
                    </div>

                    <div className="p-4 flex flex-col gap-1">
                      <h2 className="text-slate-600 text-lg font-bold">
                        {p.name}{" "}
                      </h2>
                      <div className="flex justify-start items-center gap-3">
                        <h2 className="text-lg font-bold text-slate-600">
                          ${p.price}
                        </h2>
                        <div className="flex">
                          <Rating ratings={p.rating} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })} */}
          </Swiper>
        </div>

        <div className="w-full flex justify-center items-center py-8">
          <div className="custom_bullet justify-center gap-3 !w-auto"></div>
        </div>
      </div>
    </section>
  );
};
ProductRelated.propTypes = {
  relatedProducts: PropTypes.array.isRequired,
};

export default ProductRelated;
