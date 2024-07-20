import { updateFieldAccount } from "@app/slice/AuthSlice";
import { cancelOrder } from "@app/slice/OrderSlice";
import { updateFieldProduct } from "@app/slice/ProductSlice";
import ModalConfirmOrderAdmin from "@components/Modal/ModalConfirmOrderAdmin";
import useOrderDetail from "@hooks/useOrderDetail";
import useSingleOrderUser from "@hooks/useSingleOrderUser";
import OrderDetailInfo from "@modules/client/Dashboard/components/OrderDetailInfo";
import OrderDetailInfoSkeleton from "@modules/client/Dashboard/components/OrderDetailInfoSkeleton";
import { formatOriginalPrice } from "@utils/Format";
import toastObj from "@utils/Toast";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import OrderTableItem from "./OrderDetailInfo";
dayjs.extend(customParseFormat);

const buttonList = [
  {
    id: 1,
    label: "Cancel",
    isActive: (status) => (status === 1 ? true : false),
    isShow: (status) => (status === 1 ? false : true),
    color: "red",
  },
  {
    id: 2,
    label: "Confirm",
    isActive: (status) => (status === 1 ? true : false),
    isShow: (status) => (status === 1 ? false : true),
    color: "sky",
  },
  {
    id: 3,
    label: "Shipping",
    isActive: (status) => (status === 2 || status === 3 ? true : false),
    isShow: (status) => (status === 2 ? false : true),
    color: "green",
  },
  {
    id: 4,
    label: "Complete",
    isActive: (status) => (status === 4 || status === 3 ? true : false),
    isShow: (status) => (status === 3 ? false : true),
    color: "blue",
  },
  {
    id: 5,
    label: "Reject",
    isActive: (status) => (status === 3 || status === 4 ? true : false),
    isShow: (status) => (status === 3 ? false : true),
    color: "cyan",
  },
];
const OrderDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { current } = useSingleOrderUser(id);
  const { details } = useOrderDetail(id);
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState("");

  const handleConfirm = async (label) => {
    let updateProductQuantity;
    let updateCancelCount;
    let payload;
    switch (label) {
      case "cancel":
        updateProductQuantity = details.map((item) => ({
          productID: item.productID._id,
          quantity: item.productID.quantity + item.quantity,
        }));
        updateCancelCount = {
          userId: current.userId._id,
          cancelCount: 1,
        };
        payload = {
          id,
          status: 5,
        };
        break;
      case "confirm":
        payload = {
          id,
          status: 2,
        };
        break;
      case "shipping":
        payload = {
          id,
          status: 3,
        };
        break;
      case "complete":
        payload = {
          id,
          status: 4,
        };
        break;
      case "reject":
        updateProductQuantity = details.map((item) => ({
          productID: item.productID._id,
          quantity: item.productID.quantity + item.quantity,
        }));
        updateCancelCount = {
          userId: current.userId._id,
          cancelCount: 1,
        };
        payload = {
          id,
          status: 6,
        };
        break;
      default:
        break;
    }
    try {
      const results = await Promise.all([
        dispatch(cancelOrder(payload)),
        updateProductQuantity
          ? dispatch(updateFieldProduct(updateProductQuantity))
          : Promise.resolve(),
        updateCancelCount
          ? dispatch(updateFieldAccount(updateCancelCount))
          : Promise.resolve(),
      ]);
      if (results && results.length > 0) {
        toastObj.success("Handle success");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const totalPrice = useMemo(() => {
    return (
      details &&
      details.reduce((sum, item) => sum + item.quantity * item.price, 0)
    );
  }, [details]);
  const handleClickButton = (label) => {
    setOpen(true);
    setLabel(label.slice(0, 1).toLowerCase() + label.slice(1));
  };
  if (!current || !details) return <OrderDetailInfoSkeleton />;
  return (
    <>
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
          <div className="flex gap-x-2">
            {buttonList.map((button) => (
              <button
                key={button.id}
                onClick={() => handleClickButton(button.label)}
                hidden={button.isShow(current.status)}
                className={`transition-all duration-300 text-white px-3 py-1 rounded-md ${
                  button.isActive(current.status)
                    ? `bg-${button.color}-500 hover:bg-${button.color}-600`
                    : "bg-slate-500 cursor-not-allowed"
                }`}
              >
                {button.label}
              </button>
            ))}
          </div>
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
              {details &&
                details.map((order) => (
                  <OrderTableItem key={order._id} order={order} />
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
      <ModalConfirmOrderAdmin
        open={open}
        handleClose={() => setOpen(false)}
        onConfirm={handleConfirm}
        label={label}
      />
    </>
  );
};

export default OrderDetail;
