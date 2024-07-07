const ProductReviews = () => {
  return (
    <div className="mt-4">
      <div className="flex gap-10 md:gap-6 md-lg:flex-col">
        <div className="flex flex-col gap-2 justify-start items-start py-4">
          <div>
            <span className="text-6xl font-semibold">4.5</span>
            <span className="text-3xl font-semibold text-slate-600">/5</span>
          </div>
          <div className="flex text-3xl">
            <span className="text-yellow-400">
              <i className="fas fa-star"></i>
            </span>
            <span className="text-yellow-400">
              <i className="fas fa-star"></i>
            </span>
            <span className="text-yellow-400">
              <i className="fas fa-star"></i>
            </span>
            <span className="text-yellow-400">
              <i className="fas fa-star"></i>
            </span>
            <span className="text-yellow-400">
              <i className="fas fa-star-half-alt"></i>
            </span>
          </div>
          <p className="text-sm text-slate-600">(24 Reviews)</p>
        </div>

        <div className="flex gap-2 flex-col py-4">
          <div className="flex justify-start items-center gap-5">
            <div className="text-md flex gap-1 w-[93px]">
              <span className="text-yellow-400">
                <i className="fas fa-star"></i>
              </span>
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div className="h-full w-[60%] bg-[#Edbb0E]"></div>
            </div>
            <p className="text-sm text-slate-600">14</p>
          </div>

          <div className="flex justify-start items-center gap-5">
            <div className="text-md flex gap-1 w-[93px]">
              <span className="text-yellow-400">
                <i className="fas fa-star"></i>
              </span>
              <span className="text-yellow-400">
                <i className="fas fa-star"></i>
              </span>
              <span className="text-yellow-400">
                <i className="fas fa-star"></i>
              </span>
              <span className="text-yellow-400">
                <i className="fas fa-star"></i>
              </span>
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div className="w-[70%] h-full bg-[#Edbb0E]"></div>
            </div>
            <p className="text-sm text-slate-600">7</p>
          </div>

          <div className="flex justify-start items-center gap-5">
            <div className="text-md flex gap-1 w-[93px]">
              <span className="text-yellow-400">
                <i className="fas fa-star"></i>
              </span>
              <span className="text-yellow-400">
                <i className="fas fa-star"></i>
              </span>
              <span className="text-yellow-400">
                <i className="fas fa-star"></i>
              </span>
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div className="w-[40%] h-full bg-[#Edbb0E]"></div>
            </div>
            <p className="text-sm text-slate-600">2</p>
          </div>

          <div className="flex justify-start items-center gap-5">
            <div className="text-md flex gap-1 w-[93px]">
              <span className="text-yellow-400">
                <i className="fas fa-star"></i>
              </span>
              <span className="text-yellow-400">
                <i className="fas fa-star"></i>
              </span>
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div className="h-full w-[30%s] bg-[#Edbb0E]"></div>
            </div>
            <p className="text-sm text-slate-600">1</p>
          </div>

          <div className="flex justify-start items-center gap-5">
            <div className="text-md flex gap-1 w-[93px]">
              <span className="text-yellow-400">
                <i className="fas fa-star"></i>
              </span>
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div className="h-full w-[10%] bg-[#Edbb0E]"></div>
            </div>
            <p className="text-sm text-slate-600">0</p>
          </div>

          <div className="flex justify-start items-center gap-5">
            <div className="text-md flex gap-1 w-[93px]">
              <span className="text-yellow-400">
                <i className="fas fa-star"></i>
              </span>
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative">
              <div className="h-full bg-[#Edbb0E]"></div>
            </div>
            <p className="text-sm text-slate-600">0</p>
          </div>
        </div>
      </div>

      <h2 className="text-slate-600 text-xl font-bold pb-5">
        Product Review (24)
      </h2>

      <div className="flex flex-col gap-8 pb-10">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <div className="flex gap-1 text-xl">
              <span className="text-yellow-400">
                <i className="fas fa-star"></i>
              </span>
              <span className="text-yellow-400">
                <i className="fas fa-star"></i>
              </span>
              <span className="text-yellow-400">
                <i className="fas fa-star"></i>
              </span>
              <span className="text-yellow-400">
                <i className="fas fa-star"></i>
              </span>
              <span className="text-yellow-400">
                <i className="fas fa-star-half-alt"></i>
              </span>
            </div>
            <span className="text-slate-600">2024-07-02</span>
          </div>
          <span className="text-slate-600 text-md">Thai Bao</span>
          <p className="text-slate-600 text-sm">
            Great product! Highly recommend.
          </p>
        </div>
      </div>

      <div>
        <div className="flex flex-col gap-3">
          <div className="flex gap-1">
            <span className="text-slate-600 text-4xl">
              <i className="far fa-star"></i>
            </span>
            <span className="text-[#Edbb0E] text-4xl">
              <i className="fas fa-star"></i>
            </span>
          </div>
          <form>
            <textarea
              className="border outline-0 p-3 w-full"
              required
              placeholder="Write comment here"
            ></textarea>
            <div className="mt-2">
              <button className="py-1 px-5 bg-indigo-500 text-white rounded-sm">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;
