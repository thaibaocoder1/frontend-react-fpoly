import { addProductToCart } from "@app/slice/CartSlice";
import Rating from "@components/Rating/Rating";
import { formatOriginalPrice, formatSalePrice } from "@utils/Format";
import toastObj from "@utils/Toast";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaGithub,
  FaHeart,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import Carousel from "react-multi-carousel";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getRelatedProducts } from "../../../../app/slice/ProductSlice";
import ProductContent from "./ProductContent";
import ProductRelated from "./ProductRelated";
import { PacmanLoader } from "react-spinners";

const ProductDetail = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const { data, loading } = useSelector((state) => state.product);
  const userInfo = useSelector((state) => state.auth.user);
  useEffect(() => {
    const controller = new AbortController();
    dispatch(getRelatedProducts(product._id, { signal: controller.signal }));
    return () => controller.abort();
  }, [product, dispatch]);
  const increaseQuantity = () => {
    if (quantity >= product.stock) {
      toastObj.error("Out of Stock");
    } else {
      setQuantity(quantity + 1);
    }
  };
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const handleAddToCart = () => {
    if (userInfo && userInfo._id) {
      dispatch(
        addProductToCart({
          userId: userInfo._id,
          quantity: 1,
          productId: product._id,
        })
      );
      toastObj.success("Add to cart success!");
    } else {
      toastObj.error("Please login first");
      navigate("/login");
    }
  };
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
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
      breakpoint: { max: 464, min: 0 },
      items: 3,
    },
    smmobile: {
      breakpoint: { max: 640, min: 0 },
      items: 2,
    },
    xsmobile: {
      breakpoint: { max: 440, min: 0 },
      items: 1,
    },
  };
  if (loading === true)
    return (
      <div className="fixed inset-0 flex items-center justify-center w-full h-full transition-all duration-300">
        <PacmanLoader />
      </div>
    );

  return (
    <>
      <section>
        <div className="bg-slate-100 py-5 mb-5">
          <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
            <div className="flex justify-start items-center text-md text-slate-600 w-full gap-1">
              <Link to="/">Home</Link>
              <span className="pt-1">
                <IoIosArrowForward />
              </span>
              <Link to="/">{product?.categoryID.title}</Link>
              <span className="pt-1">
                <IoIosArrowForward />
              </span>
              <Link to="/">{product?.name}</Link>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto pb-16">
          <div className="grid grid-cols-2 md-lg:grid-cols-1 gap-8">
            <div>
              <div className="p-5 border">
                <img
                  className="h-[400px] w-full"
                  src={product.thumb?.[0].fileName}
                  alt={product.name}
                />
              </div>
              <div className="py-3">
                <Carousel
                  autoPlay={true}
                  infinite={true}
                  responsive={responsive}
                  transitionDuration={500}
                >
                  {product?.thumb.map((img, i) => {
                    return (
                      <div key={i} className="bg-slate-50">
                        <img
                          className="h-[100px] w-full cursor-pointer object-contain"
                          src={img.fileName}
                          alt={i}
                        />
                      </div>
                    );
                  })}
                </Carousel>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="text-3xl text-slate-600 font-bold">
                <h3>{product.name}</h3>
              </div>
              <div className="flex justify-start items-center gap-4">
                <div className="flex text-xl">
                  <Rating ratings={4.5} />
                </div>
                <span className="text-green-500">(24 reviews)</span>
              </div>

              <div className="text-2xl text-red-500 font-bold flex gap-3">
                {product.discount !== 0 ? (
                  <>
                    Price:
                    <h2 className="line-through">
                      {formatOriginalPrice(product?.price)}
                    </h2>
                    <h2>
                      {formatSalePrice(product?.price, product?.discount)}
                      (-{product?.discount}%)
                    </h2>
                  </>
                ) : (
                  <h2>Price: {formatOriginalPrice(product.price)}</h2>
                )}
              </div>

              <div className="text-slate-600">
                <p>Code: {product.code}</p>
                <p className="py-1 font-bold">
                  Description: {product.description}
                </p>
              </div>

              <div className="flex gap-2 pb-10 border-b">
                {product.quantity > 0 ? (
                  <>
                    <div className="flex bg-slate-200 h-[50px] justify-center items-center text-xl">
                      <div
                        className="px-6 cursor-pointer self-center select-none"
                        onClick={() => decreaseQuantity()}
                      >
                        -
                      </div>
                      <div className="px-6">{quantity}</div>
                      <div
                        className="px-6 cursor-pointer self-center select-none"
                        onClick={() => increaseQuantity()}
                      >
                        +
                      </div>
                    </div>
                    <button
                      onClick={handleAddToCart}
                      className="px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-green-500/40 bg-[#059473] text-white"
                    >
                      Add To Cart
                    </button>
                    {product.quantity > 0 ? (
                      <button className="px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-green-500/40 bg-[#247462] text-white">
                        Buy Now
                      </button>
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  ""
                )}
                <div>
                  <div className="h-[50px] w-[50px] flex justify-center items-center cursor-pointer hover:shadow-lg hover:shadow-cyan-500/40 bg-cyan-500 text-white">
                    <FaHeart />
                  </div>
                </div>
              </div>

              <div className="flex py-5 gap-5">
                <div className="w-[150px] text-black font-bold text-xl flex flex-col gap-5">
                  <span>Availability</span>
                  <span>Share On</span>
                </div>
                <div className="flex flex-col gap-5">
                  <span
                    className={`text-${product.stock ? "green" : "red"}-500`}
                  >
                    {product.quantity > 0
                      ? `In Stock (${product.quantity})`
                      : "Out Of Stock"}
                  </span>

                  <ul className="flex justify-start items-center gap-3">
                    <li>
                      <a
                        className="w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-indigo-500 rounded-full text-white"
                        href="#"
                      >
                        <FaFacebookF />
                      </a>
                    </li>
                    <li>
                      <a
                        className="w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-cyan-500 rounded-full text-white"
                        href="#"
                      >
                        <FaTwitter />
                      </a>
                    </li>
                    <li>
                      <a
                        className="w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-purple-500 rounded-full text-white"
                        href="#"
                      >
                        <FaLinkedin />
                      </a>
                    </li>
                    <li>
                      <a
                        className="w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-blue-500 rounded-full text-white"
                        href="#"
                      >
                        <FaGithub />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ProductContent product={product} />
      <ProductRelated relatedProducts={data.related} />
    </>
  );
};

ProductDetail.propTypes = {
  product: PropTypes.object,
};

export default ProductDetail;
