import { Rating } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import DOMPurify from "dompurify";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const ProductReviewItem = memo(({ item }) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <div className="flex gap-1 text-xl">
          <Rating value={item.rating} readOnly />
        </div>
        <span className="text-slate-600">
          {item.createdAt
            ? dayjs(item.createdAt).format("DD/MM/YYYY HH:mm:ss")
            : ""}
        </span>
      </div>
      <span className="text-slate-600 text-md">{item.fullname}</span>
      <p
        className="text-slate-600 text-sm"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.content) }}
      />
    </div>
  );
});
ProductReviewItem.displayName = "ProductReviewItem";
ProductReviewItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default ProductReviewItem;
