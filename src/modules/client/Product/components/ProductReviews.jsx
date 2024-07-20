import { addReview } from "@app/slice/ProductSlice";
import Rating from "@mui/material/Rating";
import toastObj from "@utils/Toast";
import PropTypes from "prop-types";
import { useDeferredValue, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductRatingColumn from "./ProductRatingColumn";
import ProductReviewItem from "./ProductReviewItem";

const ProductReviews = ({ product }) => {
  const dispatch = useDispatch();
  const userLoggined = useSelector((state) => state.auth.user);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const commentDefer = useDeferredValue(comment);
  const ratingObj = useMemo(() => {
    return {
      avgRating:
        product.reviews.reduce((total, item) => total + item.rating, 0) /
        product.reviews.length,
      ratingCounts: product.reviews.reduce((acc, review) => {
        const rating = review.rating;
        if (acc[rating]) {
          acc[rating]++;
        } else {
          acc[rating] = 1;
        }
        return acc;
      }, {}),
    };
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
                <span className="text-6xl font-semibold">
                  {ratingObj.avgRating || 0}
                </span>
                <span className="text-3xl font-semibold text-slate-600">
                  /5
                </span>
              </div>
              <div className="flex text-3xl">
                <Rating
                  value={ratingObj.avgRating}
                  readOnly
                  size="large"
                  precision={0.5}
                />
              </div>
              <p className="text-sm text-slate-600">
                ({product.reviews.length} Reviews)
              </p>
            </div>
            <ProductRatingColumn ratingCounts={ratingObj.ratingCounts} />
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
