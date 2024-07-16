const CheckoutSkeleton = () => {
  return (
    <section className="bg-[#eeeeee]">
      <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16">
        <div className="w-full flex lg:flex-col">
          <div className="w-[60%] lg:w-full skeleton-shipping">
            <div className="bg-gray-300 animate-pulse h-12 w-full rounded mb-4"></div>
            <div className="bg-gray-300 animate-pulse h-52 w-full rounded"></div>
          </div>

          <div className="w-[35%] md-lg:w-full pl-3 md-lg:pl-0 lg:mt-3 skeleton-cart-summary">
            <div className="bg-gray-300 animate-pulse h-24 w-full rounded mb-4"></div>
            <div className="bg-gray-300 animate-pulse h-24 w-full rounded mb-4"></div>
            <div className="bg-gray-300 animate-pulse h-24 w-full rounded"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutSkeleton;
