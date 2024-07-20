import { addProductToCart } from "@app/slice/CartSlice";
import {
  addProductToWishList,
  setEmptyError,
  setStatusSuccess,
} from "@app/slice/WishlistSlice";
import { formatOriginalPrice, formatSalePrice } from "@utils/Format";
import toastObj from "@utils/Toast";
import PropTypes from "prop-types";
import { memo, useEffect, useMemo, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import Carousel from "react-multi-carousel";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getRelatedProducts } from "../../../../app/slice/ProductSlice";
import ProductContent from "./ProductContent";
import ProductRelated from "./ProductRelated";
import ProductSocial from "./ProductSocial";
import { Rating } from "@mui/material";

const ProductDetail = memo(({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [quantity, setQuantity] = useState(1);
  const { data } = useSelector((state) => state.product);
  const userInfo = useSelector((state) => state.auth.user);
  const isHasErrorWishList = useSelector((state) => state.wishlist.error);
  const isSuccessWishList = useSelector((state) => state.wishlist.success);
  useEffect(() => {
    const promise = dispatch(getRelatedProducts(product._id));
    return () => promise.abort();
  }, [product, dispatch]);
  const averageRating =
    product.reviews &&
    product.reviews.reduce((total, item) => total + item.rating, 0) /
      product.reviews.length;
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
          quantity,
          productId: product._id,
          isBuyNow: false,
        })
      );
      toastObj.success("Add to cart success!");
    } else {
      toastObj.error("Please login first");
      navigate("/login");
    }
  };
  const handleBuyNow = () => {
    if (userInfo && userInfo._id) {
      dispatch(
        addProductToCart({
          userId: userInfo._id,
          quantity,
          productId: product._id,
          isBuyNow: true,
        })
      );
      navigate("/checkout", { state: { prevPath: location.pathname } });
    } else {
      toastObj.error("Please login first");
      navigate("/login");
    }
  };
  const handleAddWishList = () => {
    dispatch(addProductToWishList(product._id));
  };
  const responsive = useMemo(
    () => ({
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
    }),
    []
  );
  useEffect(() => {
    if (isHasErrorWishList) {
      toastObj.error(isHasErrorWishList);
      dispatch(setEmptyError());
    }
    if (isSuccessWishList) {
      toastObj.success("Add to wishlist");
      dispatch(setStatusSuccess());
    }
  }, [isHasErrorWishList, isSuccessWishList, dispatch]);

  return (
    <>
      <section className="bg-slate-100 py-5 mb-5">
        <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
          <div className="flex justify-start items-center text-md text-slate-600 w-full gap-1">
            <Link to="/">Home</Link>
            <span className="pt-1">
              <IoIosArrowForward />
            </span>
            <Link to={`/shops?category=${product.categoryID.slug}`}>
              {product?.categoryID.title}
            </Link>
            <span className="pt-1">
              <IoIosArrowForward />
            </span>
            <Link to="#">{product?.name}</Link>
          </div>
        </div>
      </section>
      <section className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto pb-16">
        <div className="grid grid-cols-2 md-lg:grid-cols-1 gap-8">
          <div>
            <div className="p-5 border">
              <img
                className="h-[400px] w-full"
                src={product.thumb?.[0].fileName}
                alt={product.name}
                loading="lazy"
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
                        loading="lazy"
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
                <Rating value={averageRating} readOnly size="medium" />
              </div>
              <span className="text-green-500">
                ({product.reviews.length} reviews)
              </span>
            </div>

            <div className="text-2xl text-red-500 font-bold flex gap-3 lg:text-xl">
              {product.discount !== 0 ? (
                <>
                  Price:
                  <h2 className="line-through">
                    {formatOriginalPrice(product?.price)}
                  </h2>
                  <h2>
                    {formatSalePrice(product?.price, product?.discount)} (-
                    {product?.discount}%)
                  </h2>
                </>
              ) : (
                <h2>Price: {formatOriginalPrice(product.price)}</h2>
              )}
            </div>

            <div className="text-slate-600">
              <p>Code: {product.code}</p>
              <p className="pt-2 font-bold">
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
                  <div className="flex gap-2">
                    <button
                      onClick={handleAddToCart}
                      className="min-w-[120px] lg:min-w-[100px] px-3 cursor-pointer hover:shadow-lg hover:shadow-green-500/40 bg-[#059473] text-white"
                    >
                      Add To Cart
                    </button>
                    {product.quantity > 0 ? (
                      <button
                        onClick={handleBuyNow}
                        className="min-w-[120px] lg:min-w-[100px] px-3 cursor-pointer hover:shadow-lg hover:shadow-green-500/40 bg-[#247462] text-white"
                      >
                        Buy Now
                      </button>
                    ) : (
                      ""
                    )}
                    <div
                      onClick={handleAddWishList}
                      className="w-[50px] flex justify-center items-center cursor-pointer hover:shadow-lg hover:shadow-cyan-500/40 bg-cyan-500 text-white"
                    >
                      <FaHeart />
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>

            <div className="flex py-5 gap-5">
              <div className="w-[150px] text-black font-bold text-xl flex flex-col gap-5">
                <span>Availability</span>
                <span>Share On</span>
              </div>
              <div className="flex flex-col gap-5">
                <span className={`text-${product.stock ? "green" : "red"}-500`}>
                  {product.quantity > 0
                    ? `In Stock (${product.quantity})`
                    : "Out Of Stock"}
                </span>
                <ProductSocial />
              </div>
            </div>
          </div>
        </div>
      </section>
      <ProductContent product={product} />
      <ProductRelated relatedProducts={data.related} />
    </>
  );
});
ProductDetail.displayName = "ProductDetail";
ProductDetail.propTypes = {
  product: PropTypes.object,
};

export default ProductDetail;
