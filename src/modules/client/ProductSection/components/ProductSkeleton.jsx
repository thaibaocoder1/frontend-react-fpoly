import PropTypes from "prop-types";

const ProductSkeleton = ({ length }) => {
  return Array.from(new Array(length)).map((_, index) => (
    <div key={index} className="shadow rounded-md max-w-sm w-full mx-auto">
      <div className="animate-pulse flex flex-col">
        <div className="rounded-t-md bg-slate-300 h-48 w-full"></div>
        <div className="flex-1 space-y-6 p-4">
          <div className="h-2 bg-slate-300 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-300 rounded col-span-2"></div>
              <div className="h-2 bg-slate-300 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-slate-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  ));
};

ProductSkeleton.propTypes = {
  length: PropTypes.number.isRequired,
};

export default ProductSkeleton;
