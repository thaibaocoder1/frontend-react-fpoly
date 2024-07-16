import { IoIosArrowForward } from "react-icons/io";

const ProductDetailSkeleton = () => {
  return (
    <>
      <section>
        <div className="bg-slate-100 py-5 mb-5">
          <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
            <div className="flex justify-start items-center text-md text-slate-600 w-full gap-1">
              <div className="skeleton w-20 h-6 bg-slate-200 rounded"></div>
              <span className="pt-1">
                <IoIosArrowForward className="skeleton w-6 h-6 bg-slate-200 rounded" />
              </span>
              <div className="skeleton w-24 h-6 bg-slate-200 rounded"></div>
              <span className="pt-1">
                <IoIosArrowForward className="skeleton w-6 h-6 bg-slate-200 rounded" />
              </span>
              <div className="skeleton w-32 h-6 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto pb-16">
          <div className="grid grid-cols-2 md-lg:grid-cols-1 gap-8">
            <div>
              <div className="p-5 border">
                <div className="skeleton h-[400px] w-full bg-slate-200 rounded"></div>
              </div>
              <div className="py-3">
                <div className="flex gap-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="skeleton h-[100px] w-[100px] bg-slate-200 rounded"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="skeleton h-10 w-48 bg-slate-200 rounded"></div>
              <div className="flex justify-start items-center gap-4">
                <div className="skeleton h-8 w-24 bg-slate-200 rounded"></div>
                <div className="skeleton h-6 w-20 bg-slate-200 rounded"></div>
              </div>

              <div className="text-2xl text-red-500 font-bold flex gap-3">
                <div className="skeleton h-6 w-24 bg-slate-200 rounded"></div>
                <div className="skeleton h-6 w-16 bg-slate-200 rounded"></div>
              </div>

              <div className="text-slate-600">
                <div className="skeleton h-6 w-32 bg-slate-200 rounded"></div>
                <div className="skeleton h-6 w-48 bg-slate-200 rounded mt-2"></div>
              </div>

              <div className="flex gap-2 pb-10 border-b">
                <div className="skeleton h-[50px] w-32 bg-slate-200 rounded"></div>
                <div className="skeleton h-[50px] w-32 bg-slate-200 rounded"></div>
                <div className="skeleton h-[50px] w-12 bg-slate-200 rounded"></div>
              </div>

              <div className="flex py-5 gap-5">
                <div className="skeleton w-[150px] h-6 bg-slate-200 rounded"></div>
                <div className="flex flex-col gap-5">
                  <div className="skeleton h-6 w-24 bg-slate-200 rounded"></div>
                  <div className="flex justify-start items-center gap-3">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="skeleton w-[38px] h-[38px] bg-slate-200 rounded-full"
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetailSkeleton;
