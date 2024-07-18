const OrderDetailInfoSkeleton = () => {
  return (
    <div className="bg-white p-5 rounded-md">
      <h2 className="text-slate-600 font-semibold">
        <span className="inline-block w-8 h-5 bg-slate-200 rounded animate-pulse"></span>
        <span className="inline-block w-40 h-5 bg-slate-200 rounded animate-pulse ml-1"></span>
      </h2>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-200 rounded h-20 animate-pulse"></div>
        <div className="text-slate-600">
          <h2 className="h-5 w-24 bg-slate-200 rounded animate-pulse"></h2>
          <p className="flex items-center mt-2">
            <span className="inline-block w-24 h-5 bg-slate-200 rounded animate-pulse"></span>
            <span className="inline-block w-20 h-5 bg-slate-200 rounded animate-pulse ml-2"></span>
          </p>
          <p className="flex items-center mt-2">
            <span className="inline-block w-24 h-5 bg-slate-200 rounded animate-pulse"></span>
            <span className="inline-block w-20 h-5 bg-slate-200 rounded animate-pulse ml-2"></span>
          </p>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-slate-600 text-lg pb-2 font-sans font-bold">
          <span className="inline-block w-40 h-6 bg-slate-200 rounded animate-pulse"></span>
        </h2>
        <div className="flex gap-5 flex-col">
          <div className="bg-slate-200 rounded h-24 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailInfoSkeleton;
