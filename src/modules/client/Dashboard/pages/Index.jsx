import { RiShoppingCart2Fill } from "react-icons/ri";
import { useSelector } from "react-redux";

const Index = () => {
  const userInfo = useSelector((state) => state.auth.user);
  return (
    userInfo?._id && (
      <>
        <div className="grid grid-cols-3 md:grid-cols-1 gap-5">
          <div className="flex justify-center items-center p-5 bg-white rounded-md gap-5">
            <div className="bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl">
              <span className="text-xl text-green-800">
                <RiShoppingCart2Fill />
              </span>
            </div>
            <div className="flex flex-col justify-start items-start text-slate-600">
              <h2 className="text-3xl font-bold">{0}</h2>
              <span>Orders</span>
            </div>
          </div>

          <div className="flex justify-center items-center p-5 bg-white rounded-md gap-5">
            <div className="bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl">
              <span className="text-xl text-green-800">
                <RiShoppingCart2Fill />
              </span>
            </div>
            <div className="flex flex-col justify-start items-start text-slate-600">
              <h2 className="text-3xl font-bold">{0}</h2>
              <span>Pending Orders</span>
            </div>
          </div>

          <div className="flex justify-center items-center p-5 bg-white rounded-md gap-5">
            <div className="bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl">
              <span className="text-xl text-green-800">
                <RiShoppingCart2Fill />
              </span>
            </div>
            <div className="flex flex-col justify-start items-start text-slate-600">
              <h2 className="text-3xl font-bold">{0}</h2>
              <span>Cancelled Orders</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-5 mt-5 rounded-md">
          <h2>Info User</h2>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-4 bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="flex justify-center items-center p-4">
              <img
                className="w-48 h-48 rounded-full"
                src={userInfo.imageUrl.fileName}
                alt={userInfo.username}
              />
            </div>
            <div className="p-4">
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-gray-700">Username</label>
                    <input
                      type="text"
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                      value={userInfo.username}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Fullname</label>
                    <input
                      type="text"
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                      value={userInfo.fullname}
                      readOnly
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-gray-700">Email</label>
                    <input
                      type="email"
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                      value={userInfo.email}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Phone</label>
                    <input
                      type="text"
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                      value={userInfo.phone}
                      readOnly
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700">Role</label>
                  <input
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    value={userInfo.role}
                    readOnly
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default Index;
