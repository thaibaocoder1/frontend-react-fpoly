import { cancelOrder } from "@app/slice/OrderSlice";
import { updateFieldProduct } from "@app/slice/ProductSlice";
import ModalConfirmCancel from "@components/Modal/ModalConfirmCancel";
import useOrderDetail from "@hooks/useOrderDetail";
import useSingleOrderUser from "@hooks/useSingleOrderUser";
import { formatOriginalPrice } from "@utils/Format";
import toastObj from "@utils/Toast";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import OrderDetailInfo from "../components/OrderDetailInfo";
import OrderDetailInfoSkeleton from "../components/OrderDetailInfoSkeleton";
dayjs.extend(customParseFormat);

const OrderDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { current } = useSingleOrderUser(id);
  const { details } = useOrderDetail(id);
  const totalPrice = useMemo(() => {
    return (
      details &&
      details.reduce((sum, item) => sum + item.quantity * item.price, 0)
    );
  }, [details]);
  const [open, setOpen] = useState(false);

  const handleConfirmCancel = async () => {
    const updateProductQuantity = details.map((item) => ({
      productID: item.productID._id,
      quantity: item.productID.quantity + item.quantity,
    }));
    const payload = {
      id,
      status: 5,
    };
    try {
      const results = await Promise.all([
        dispatch(cancelOrder(payload)),
        dispatch(updateFieldProduct(updateProductQuantity)),
      ]);
      if (results && results.length > 0) {
        toastObj.success("Cancel success");
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (!current || !details) return <OrderDetailInfoSkeleton />;

  return (
    <div className="bg-white p-5 rounded-md">
      <h2 className="text-slate-600 font-semibold">
        <span>#{current._id}</span>
        <span className="pl-1 text-slate-500 text-sm">
          {dayjs(current.createdAt).format("DD/MM/YYYY HH:mm:ss")}
        </span>
      </h2>
      <OrderDetailInfo current={current} />
      <div className="mt-4">
        <div className="flex item-centers justify-between mb-2">
          <h2 className="text-slate-600 text-lg pb-2 font-sans font-bold">
            Order Products
          </h2>
          <button
            onClick={() => setOpen(true)}
            hidden={current.status !== 1}
            className={`transition-all duration-300 text-white px-3 py-1 rounded-md ${
              current.status === 1
                ? "bg-red-500 hover:bg-red-600"
                : "bg-slate-500 cursor-not-allowed"
            }`}
          >
            Cancel
          </button>
        </div>
        <div className="flex gap-5 flex-col overflow-x-auto rounded-md">
          <table className="min-w-full text-left">
            <thead className="text-gray-700 bg-gray-200">
              <tr>
                <th scope="col" className="py-3 px-4">
                  No
                </th>
                <th scope="col" className="py-3 px-4">
                  Image
                </th>
                <th scope="col" className="py-3 px-4">
                  Name
                </th>
                <th scope="col" className="py-3 px-4">
                  Quantity
                </th>
                <th scope="col" className="py-3 px-4">
                  Price
                </th>
                <th scope="col" className="py-3 px-4">
                  Subtotal
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {details.map((product) => (
                <tr key={product._id}>
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    {product.productID._id}
                  </td>
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    <img
                      loading="lazy"
                      className="w-[60px] h-[60px] object-cover"
                      src={product.productID.thumb[0].fileName}
                      alt={product.productID.name}
                    />
                  </td>
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    {product.productID.name}
                  </td>
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    {product.quantity}
                  </td>
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    {formatOriginalPrice(product.price)}
                  </td>
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    {formatOriginalPrice(product.price * product.quantity)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td
                  colSpan={5}
                  className="py-2 px-4 border-t-2 border-gray-200 text-left text-base font-semibold "
                >
                  Total
                </td>
                <td className="py-2 px-4 border-t-2 border-gray-200 text-left text-sm font-semibold ">
                  {formatOriginalPrice(totalPrice)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <ModalConfirmCancel
        open={open}
        handleClose={() => setOpen(false)}
        onConfirm={handleConfirmCancel}
      />
    </div>
  );
};

export default OrderDetail;
