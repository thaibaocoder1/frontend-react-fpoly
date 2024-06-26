import { FaList } from "react-icons/fa";

const HeaderAdmin = () => {
  return (
    <div className="fixed top-0 left-0 w-full py-2 md:px-4 lg:px-2 z-40">
      <div className="ml-0 lg:ml-[260px] rounded-md h-[65px] flex justify-between items-center bg-[#b1addf] px-5 transition-all">
        <div className="w-[35px] flex lg:hidden h-[35px] rounded-sm bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 justify-center items-center cursor-pointer ">
          <span>
            <FaList />
          </span>
        </div>

        <div className="hidden md:block">
          <input
            className="px-3 py-2 outline-none border bg-transparent border-slate-700 rounded-md text-[#423d72] placeholder:text-white focus:border-indigo-300 overflow-hidden"
            type="text"
            name="search"
            placeholder="Search"
          />
        </div>

        <div className="flex justify-center items-center gap-8 relative">
          <div className="flex justify-center items-center">
            <div className="flex justify-center items-center gap-3">
              <div className="flex justify-center items-center flex-col text-end">
                <h2 className="text-md font-bold">{"abc"}</h2>
                <span className="text-[14px] w-full font-normal">
                  {"userInfo.role"}
                </span>
              </div>

              {/* {'userInfo.role' === "admin" ? (
                <img
                  className="w-[45px] h-[45px] rounded-full overflow-hidden"
                  src="http://localhost:3001/images/admin.jpg"
                  alt=""
                />
              ) : (
                <img
                  className="w-[45px] h-[45px] rounded-full overflow-hidden"
                  src={userInfo.image}
                  alt=""
                />
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderAdmin;
