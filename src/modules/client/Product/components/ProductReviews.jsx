import { addReview } from "@app/slice/ProductSlice";
import Rating from "@mui/material/Rating";
import toastObj from "@utils/Toast";
import PropTypes from "prop-types";
import { useDeferredValue, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductRatingTemp from "./ProductRatingTemp";
import ProductReviewItem from "./ProductReviewItem";

const ProductReviews = ({ product }) => {
  const dispatch = useDispatch();
  const userLoggined = useSelector((state) => state.auth.user);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const commentDefer = useDeferredValue(comment);
  const avgRating = useMemo(() => {
    return (
      product.reviews.reduce((total, item) => total + item.rating, 0) /
      product.reviews.length
    );
  }, [product]);
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      if (!userLoggined) {
        toastObj.error("Please login first");
        return;
      }
      if (commentDefer === "") {
        toastObj.error("Please fill value");
        return;
      }
      const reviewInfo = {
        productId: product._id,
        userId: userLoggined._id,
        fullname: userLoggined.fullname,
        content: commentDefer,
        rating,
      };
      const results = await dispatch(addReview(reviewInfo));
      if (results.type.includes("fulfilled")) {
        toastObj.success("Review success");
        setComment("");
        setRating(0);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mt-4">
      <div className="flex gap-10 md:gap-6 md-lg:flex-col">
        {product.reviews.length > 0 && (
          <>
            <div className="flex flex-col gap-2 justify-start items-start py-4">
              <div>
                <span className="text-6xl font-semibold">{avgRating || 0}</span>
                <span className="text-3xl font-semibold text-slate-600">
                  /5
                </span>
              </div>
              <div className="flex text-3xl">
                <Rating
                  value={avgRating}
                  readOnly
                  size="large"
                  precision={0.5}
                />
              </div>
              <p className="text-sm text-slate-600">
                ({product.reviews.length} Reviews)
              </p>
            </div>

            <div className="flex gap-2 flex-col py-4">
              <div className="flex justify-start items-center gap-5">
                <div className="text-md flex gap-1 w-[93px]">
                  <ProductRatingTemp rating={5} />
                </div>
                <div className="w-[200px] h-[14px] bg-slate-200 relative">
                  <div className="h-full w-[60%] bg-[#Edbb0E]"></div>
                </div>
                <p className="text-sm text-slate-600">14</p>
              </div>

              <div className="flex justify-start items-center gap-5">
                <div className="text-md flex gap-1 w-[93px]">
                  <ProductRatingTemp rating={4} />
                </div>
                <div className="w-[200px] h-[14px] bg-slate-200 relative">
                  <div className="w-[70%] h-full bg-[#Edbb0E]"></div>
                </div>
                <p className="text-sm text-slate-600">7</p>
              </div>

              <div className="flex justify-start items-center gap-5">
                <div className="text-md flex gap-1 w-[93px]">
                  <ProductRatingTemp rating={3} />
                </div>
                <div className="w-[200px] h-[14px] bg-slate-200 relative">
                  <div className="w-[40%] h-full bg-[#Edbb0E]"></div>
                </div>
                <p className="text-sm text-slate-600">2</p>
              </div>

              <div className="flex justify-start items-center gap-5">
                <div className="text-md flex gap-1 w-[93px]">
                  <ProductRatingTemp rating={2} />
                </div>
                <div className="w-[200px] h-[14px] bg-slate-200 relative">
                  <div className="h-full w-[30%s] bg-[#Edbb0E]"></div>
                </div>
                <p className="text-sm text-slate-600">1</p>
              </div>

              <div className="flex justify-start items-center gap-5">
                <div className="text-md flex gap-1 w-[93px]">
                  <ProductRatingTemp rating={1} />
                </div>
                <div className="w-[200px] h-[14px] bg-slate-200 relative">
                  <div className="h-full w-[10%] bg-[#Edbb0E]"></div>
                </div>
                <p className="text-sm text-slate-600">0</p>
              </div>

              <div className="flex justify-start items-center gap-5">
                <div className="text-md flex gap-1 w-[93px]">
                  <ProductRatingTemp rating={0} />
                </div>
                <div className="w-[200px] h-[14px] bg-slate-200 relative">
                  <div className="h-full bg-[#Edbb0E]"></div>
                </div>
                <p className="text-sm text-slate-600">0</p>
              </div>
            </div>
          </>
        )}
      </div>

      <h2 className="text-slate-600 text-xl font-bold pb-5">
        Product Review ({product.reviews.length})
      </h2>

      <div className="flex flex-col gap-8 pb-10">
        {product.reviews.length > 0 &&
          product.reviews.map((x) => (
            <ProductReviewItem key={x._id} item={x} />
          ))}
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex gap-1">
          <Rating
            name="size-large"
            size="large"
            onChange={(_, value) => setRating(value)}
            value={rating}
          />
        </div>
        <form onSubmit={handleSubmitForm}>
          <textarea
            className="border outline-0 p-3 w-full"
            placeholder="Write comment here"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          ></textarea>
          <div className="mt-2">
            <button className="py-1 px-5 bg-indigo-500 text-white rounded-sm">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
ProductReviews.propTypes = {
  product: PropTypes.object,
};

export default ProductReviews;
