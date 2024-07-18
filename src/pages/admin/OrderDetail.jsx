import useOrderDetail from "@hooks/useOrderDetail";
import useSingleOrderUser from "@hooks/useSingleOrderUser";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const OrderDetailAdmin = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { current } = useSingleOrderUser(id);
  const { details } = useOrderDetail(id);
  console.log("🚀 ~ OrderDetailAdmin ~ details:", details);
  const totalPrice = useMemo(() => {
    return (
      details &&
      details.reduce((sum, item) => sum + item.quantity * item.price, 0)
    );
  }, [details]);
  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-white rounded-md">
        <div className="flex justify-between items-center pb-4">
          <h2 className="text-xl text-black">Order Details</h2>
        </div>

        <div className="md:flex-wrap flex">
          <div className="w-[40%]">
            <div>
              <div className="flex gap-2 text-lg text-[#d0d2d6]">
                <h2>#1234567890</h2>
                <span>2024-07-03</span>
              </div>
              <div className="pr-3 text-[#d0d2d6] text-lg">
                <div className="flex flex-col gap-1">
                  <h2 className="pb-2 font-semibold">
                    Deliver To: FPT Polytechnic College, Ho Chi Minh City,
                    Vietnam
                  </h2>
                </div>
                <div className="flex justify-start items-center gap-3">
                  <h2>Payment Status:</h2>
                  <span className="text-base">Paid</span>
                </div>
                <span>Price: $200.00</span>
              </div>
            </div>
          </div>
          <div className="ml-auto w-full max-w-lg">
            <div className="flex flex-col gap-4 bg-[#8288ed] p-4 rounded-md text-[#d0d2d6] shadow-lg">
              <div className="flex items-center gap-3">
                <img
                  className="w-[50px] h-[50px] rounded-md object-cover"
                  src="https://via.placeholder.com/50"
                  alt="Product Image"
                />
                <div>
                  <h2 className="text-lg font-semibold">Product Name</h2>
                  <p className="flex flex-col">
                    <span>Code: BAODEV01</span>
                    <span className="text-lg">Quantity: 1</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-4 bg-[#8288ed] p-4 rounded-md text-[#d0d2d6] shadow-lg">
              <div className="flex items-center gap-3">
                <img
                  className="w-[50px] h-[50px] rounded-md object-cover"
                  src="https://via.placeholder.com/50"
                  alt="Product Image"
                />
                <div>
                  <h2 className="text-lg font-semibold">Another Product</h2>
                  <p className="flex flex-col">
                    <span>Code: BAODEV02</span>
                    <span className="text-lg">Quantity: 2</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailAdmin;
