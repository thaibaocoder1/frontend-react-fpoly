import { useEffect, useState } from "react";
import CheckoutFormShip from "./CheckoutFormShip";
import axios from "axios";

const CheckoutShipping = () => {
  const [provinceList, setProvinceList] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getProvinceList = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("https://vapi.vnappmob.com/api/province");
        res.data && setProvinceList(res.data.results);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    getProvinceList();
  }, []);
  const handleSubmitData = async (data) => {
    console.log("🚀 ~ handleSubmitData ~ data:", data);
  };
  return (
    <div className="bg-white p-6 shadow-sm rounded-md">
      <h2 className="text-slate-600 text-xl font-bold pb-3">
        Shipping Information
      </h2>
      {!isLoading && (
        <CheckoutFormShip
          provinceList={provinceList}
          onSubmit={handleSubmitData}
        />
      )}
    </div>
  );
};

export default CheckoutShipping;
