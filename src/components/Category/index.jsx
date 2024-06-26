import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import image from "../../assets/banner/1.jpg";

const Categories = () => {
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
        {/* {Categoriess.length > 0 &&
                  Categoriess.map((b, i) => (
                    <Link key={i} to={`product/details/${b.link}`}>
                      <img src={b.Categories} alt="" />
                    </Link>
                  ))} */}
        {[1, 2, 3, 4, 5, 6].map((item, i) => (
          <Link key={i} to={`#`}>
            <img src={image} alt="Categories" />
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default Categories;
