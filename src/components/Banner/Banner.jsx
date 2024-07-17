import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import { memo, useMemo } from "react";

const Banner = memo(() => {
  const responsive = useMemo(
    () => ({
      superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 1,
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
      },
    }),
    []
  );
  return (
    <div className="w-full md-lg:mt-6">
      <div className="w-[85%] lg:w-[90%] mx-auto">
        <div className="w-full flex flex-wrap md-lg:gap-8">
          <div className="w-full my-8">
            <Carousel
              autoPlay={true}
              infinite={true}
              arrows={true}
              showDots={true}
              responsive={responsive}
            >
              {[1, 2, 3, 4, 5, 6].map((item, i) => (
                <Link key={item} to={`#`}>
                  <img
                    src={`src/assets/banner/${i + 1}.jpg`}
                    alt="Banner"
                    loading="lazy"
                  />
                </Link>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
});
Banner.displayName = "Banner";

export default Banner;
