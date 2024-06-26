import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Carousel from "react-multi-carousel";

const ProductFeature = () => {
  const responsive = {
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
  };

  return (
    <div className="overflow-hidden flex gap-8 flex-col-reverse">
      <Carousel
        autoPlay={false}
        infinite={false}
        arrows={false}
        responsive={responsive}
        transitionDuration={500}
        renderButtonGroupOutside={true}
        customButtonGroup={<ButtonGroup />}
      >
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
          exercitationem mollitia nemo tenetur inventore cupiditate sequi natus
          quam amet dolore impedit aspernatur alias velit nulla aliquid neque,
          aperiam omnis rem.
        </p>
      </Carousel>
    </div>
  );
};
const ButtonGroup = ({ next, previous }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="text-xl font-bold text-slate-600">Text</div>
      <div className="flex justify-center items-center gap-3 text-slate-600">
        <button
          onClick={() => previous()}
          className="w-[30px] h-[30px] flex justify-center items-center bg-slate-300 border border-slate-200"
        >
          <IoIosArrowBack />
        </button>
        <button
          onClick={() => next()}
          className="w-[30px] h-[30px] flex justify-center items-center bg-slate-300 border border-slate-200"
        >
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
};

export default ProductFeature;
