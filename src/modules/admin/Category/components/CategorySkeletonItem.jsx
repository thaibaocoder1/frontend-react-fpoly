import { Skeleton, TableRow } from "@mui/material";
import PropTypes from "prop-types";

const CategorySkeletonItem = ({ number }) => {
  return Array.from(new Array(number)).map((_, index) => (
    <TableRow key={index}>
      <Skeleton animation="wave" width={"50%"} height={50} />
      <Skeleton variant="rectangular" width={80} height={80} />
      <Skeleton animation="wave" width={"50%"} height={50} />
      <div className="flex justify-start items-center gap-2">
        <Skeleton animation="wave" width={"20%"} height={50} />
        <Skeleton animation="wave" width={"20%"} height={50} />
      </div>
    </TableRow>
  ));
};

CategorySkeletonItem.propTypes = {
  number: PropTypes.number,
};

export default CategorySkeletonItem;
