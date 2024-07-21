import axiosClient from "@api/AxiosClient";
import { loadStripe } from "@stripe/stripe-js";

export const makePayment = async (cart) => {
  const stripe = await loadStripe(
    "pk_test_51PdnC0BJ5MAfNCnPQ7fuEdvyFqjddU96O4RfkBAgk9NZbdJUXOLxeeWGqYmfeNjJs9o1nDfWMB0BpSzMq1tuOhfX00zTAmaSnr"
  );
  const session = await axiosClient.post(`/orders/create-checkout-session`, {
    cart,
  });
  const result = await stripe.redirectToCheckout({
    sessionId: session.id,
  });
  if (result.error) {
    console.log(result.error);
    return false;
  }
  return true;
};
