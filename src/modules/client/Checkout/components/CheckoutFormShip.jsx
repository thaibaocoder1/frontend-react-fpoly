import { yupResolver } from "@hookform/resolvers/yup";
import useFetchData from "@hooks/useFetchData";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import CheckoutInputField from "./CheckoutFormControl/CheckoutInputField";
import CheckoutSelectField from "./CheckoutFormControl/CheckoutSelectField";
import CheckoutSelectFieldDistrict from "./CheckoutFormControl/CheckoutSelectFieldDistrict";
import CheckoutSelectFieldPayment from "./CheckoutFormControl/CheckoutSelectFieldPayment";
import CheckoutSelectFieldWard from "./CheckoutFormControl/CheckoutSelectFieldWard";
import { useSelector } from "react-redux";

const schema = yup.object({
  fullname: yup.string().required("Please enter fullname"),
  email: yup
    .string()
    .required("Please enter email")
    .email("Please enter a valid email"),
  phone: yup
    .string()
    .required("Please enter phone")
    .test("match-regex", "Phone not match with pattern", (value) =>
      /(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(value)
    ),
  note: yup.string(),
  address: yup.string().required("Please enter address"),
  province: yup.string().required("Please enter province"),
  district: yup.string().required("Please enter district"),
  ward: yup.string().required("Please enter ward"),
  payment: yup.string().required("Please choose one payment"),
});
const CheckoutFormShip = ({ onSubmit }) => {
  const userLoggined = useSelector((state) => state.auth.user);
  const infoOrder =
    localStorage && JSON.parse(localStorage.getItem("info_order"));
  const form = useForm({
    defaultValues: {
      fullname: userLoggined ? userLoggined.fullname : "",
      email: userLoggined ? userLoggined.email : "",
      phone: userLoggined ? userLoggined.phone : "",
      note: "",
      address: "",
      province: "",
      district: "",
      payment: "",
    },
    resolver: yupResolver(schema),
  });
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const { data: provinceList } = useFetchData(
    "https://vapi.vnappmob.com/api/province"
  );
  const { data: districts } = useFetchData(
    selectedProvince
      ? `https://vapi.vnappmob.com/api/province/district/${selectedProvince}`
      : null,
    !!selectedProvince,
    [selectedProvince]
  );
  const { data: wards } = useFetchData(
    selectedDistrict
      ? `https://vapi.vnappmob.com/api/province/ward/${selectedDistrict}`
      : null,
    !!selectedDistrict,
    [selectedDistrict]
  );
  const [isSubmit, setIsSubmit] = useState({
    submitted: false,
    data: [],
  });
  useEffect(() => {
    if (!selectedProvince) {
      setSelectedDistrict("");
    }
  }, [selectedProvince]);
  const info = isSubmit.submitted && infoOrder ? isSubmit.data : infoOrder;
  const onSubmitData = async (data) => {
    setIsSubmit({
      submitted: true,
      data,
    });
    localStorage && localStorage.setItem("info_order", JSON.stringify(data));
    onSubmit && (await onSubmit(data));
  };
  return (
    <>
      {!isSubmit.submitted && !infoOrder ? (
        <form onSubmit={form.handleSubmit(onSubmitData)}>
          <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
            <CheckoutInputField
              form={form}
              name="fullname"
              placeholder="Fullname"
            />
            <CheckoutInputField form={form} name="email" placeholder="Email" />
          </div>
          <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600 mb-1">
            <CheckoutSelectField
              form={form}
              name="province"
              data={provinceList}
              selectedProvince={setSelectedProvince}
            />
            <CheckoutSelectFieldDistrict
              form={form}
              name="district"
              data={districts}
              selectedDistrict={setSelectedDistrict}
            />
            <CheckoutSelectFieldWard form={form} name="ward" data={wards} />
          </div>
          <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
            <CheckoutInputField
              form={form}
              name="address"
              placeholder="Address"
            />
            <CheckoutInputField form={form} name="phone" placeholder="Phone" />
          </div>
          <CheckoutInputField form={form} name="note" placeholder="Note" />
          <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
            <CheckoutSelectFieldPayment form={form} name="payment" />
            <div className="flex flex-col gap-1 mt-7 mb-2 w-full">
              <button className="px-3 py-[6px] rounded-sm hover:shadow-green-500/50 hover:shadow-lg bg-green-500 text-white">
                Save Change
              </button>
            </div>
          </div>
        </form>
      ) : (
        ""
      )}
      {info ? (
        <div className="flex flex-col gap-1">
          <h2 className="text-slate-600 font-semibold pb-2">
            Deliver To {info.fullname}
          </h2>
          <p>
            <span className="bg-blue-200 text-blue-800 text-sm font-medium mr-2 px-2 py-1 rounded">
              Home
            </span>
            <span>
              {info.phone} - {info.province}, {info.district}, {info.ward},{" "}
              {info.address}
            </span>
            <button
              onClick={() => {
                localStorage.removeItem("info_order");
                setIsSubmit((prev) => ({ ...prev, submitted: false }));
              }}
              className="text-indigo-500 cursor-pointer ml-2"
            >
              Change
            </button>
          </p>

          <p className="text-slate-600 text-sm mt-1">Email To {info.email}</p>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

CheckoutFormShip.propTypes = {
  onSubmit: PropTypes.func,
};

export default CheckoutFormShip;
