import axiosClient from "@api/AxiosClient";
import { loadStripe } from "@stripe/stripe-js";
import toastObj from "./Toast";

export const makePayment = async (cart) => {
  const stripe = await loadStripe(import.meta.env.STRIPE_KEY);
  const session = await axiosClient.post(`/orders/create-checkout-session`, {
    cart,
  });
  const result = await stripe.redirectToCheckout({
    sessionId: session.id,
  });
  if (result.error) {
    toastObj.error(result.error);
    return false;
  }
  return true;
};
