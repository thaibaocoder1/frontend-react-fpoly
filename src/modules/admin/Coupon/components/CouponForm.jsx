import { addCoupon, toggleDialog, updateCoupon } from "@app/slice/CouponSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import toastObj from "@utils/Toast";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import InputField from "./FormControlCoupon/InputField";
dayjs.extend(customParseFormat);

const schema = yup.object({
  name: yup
    .string()
    .required("Please enter this field")
    .test("include-target-string", "Coupon must be start with SALE", (value) =>
      value.includes("SALE")
    ),
  value: yup.number().typeError("Please enter number this field"),
  expireIns: yup
    .date()
    .typeError("Please chosse one date")
    .required("Please enter this field"),
});
const CouponForm = () => {
  const dispatch = useDispatch();
  const current = useSelector((state) => state.coupon.current);
  const isShowDialog = useSelector((state) => state.coupon.show);
  const form = useForm({
    defaultValues: {
      name: "",
      value: "",
      expireIns: "",
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    const timestamp = Date.now(data.expireIns);
    data.expireIns = timestamp;
    try {
      if (current) {
        data.id = current._id;
        const results = await dispatch(updateCoupon(data));
        if (!results.type.includes("rejected")) {
          toastObj.success("Update success");
          form.reset({
            name: "",
            value: "",
            expireIns: "",
          });
          dispatch(toggleDialog());
        }
      } else {
        const results = await dispatch(addCoupon(data));
        if (!results.type.includes("rejected")) {
          toastObj.success("Add success");
          form.reset({
            name: "",
            value: "",
            expireIns: "",
          });
          dispatch(toggleDialog());
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fields = ["name", "value", "expireIns"];
    if (current) {
      fields.forEach((field) =>
        form.setValue(
          field,
          field === "expireIns"
            ? dayjs(current[field]).format("YYYY-MM-DD")
            : current[field]
        )
      );
    } else {
      fields.forEach((field) => form.setValue(field, ""));
    }
    if (!isShowDialog) form.clearErrors();
  }, [current, form, isShowDialog]);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <InputField form={form} name="name" label="Coupon name" />
      <InputField form={form} name="value" label="Coupon value" type="number" />
      <InputField
        form={form}
        name="expireIns"
        label="Coupon date"
        type="date"
      />
      <button className="bg-red-500 w-full hover:shadow-red-300/50 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3">
        Submit
      </button>
    </form>
  );
};

export default CouponForm;
