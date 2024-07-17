import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Categories = () => {
  const { categories } = useSelector((state) => state.category.data);
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mdtablet: {
      breakpoint: { max: 991, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 3,
    },
    smmobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
    xsmobile: {
      breakpoint: { max: 440, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="w-[87%] mx-auto relative">
      <div className="w-full">
        <div className="text-center flex justify-center items-center flex-col text-4xl text-slate-600 font-bold relative pb-[35px]">
          <h2>Top Category</h2>
          <div className="w-[100px] h-[2px] bg-[#059473] mt-4"></div>
        </div>
      </div>
      <Carousel
        autoPlay={true}
        infinite={true}
        arrows={true}
        responsive={responsive}
        transitionDuration={500}
      >
        {categories.length > 0 &&
          categories.map((item) => (
            <Link
              className="h-[200px] border block"
              key={item._id}
              to={`shops?category=${item.slug}`}
            >
              <div className="w-full h-full relative">
                <img
                  loading="lazy"
                  src={item.imageUrl}
                  className="w-full h-full object-cover"
                  alt={item.slug}
                />
                <div className="absolute bottom-4 w-full mx-auto font-bold left-0 flex justify-center items-center">
                  <span className="py-[2px] px-6 bg-slate-700/50 text-white">
                    {item.title}
                  </span>
                </div>
              </div>
            </Link>
          ))}
      </Carousel>
    </div>
  );
};

export default Categories;
