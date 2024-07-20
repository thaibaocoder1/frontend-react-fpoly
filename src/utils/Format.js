const formatSalePrice = (original, sale) => {
  const discount = ((100 - sale) / 100) * original;
  return discount.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });
};
const formatOriginalPrice = (original) => {
  return original.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });
};
const formatSubtotalPrice = (product) => {
  const discount = ((100 - product.discount) / 100) * product.price;
  const subtotal = product.quantity * discount;
  return subtotal.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });
};
const formatOrderStatus = (status) => {
  switch (status) {
    case 1:
      return "Pending";
    case 2:
      return "Confirmed";
    case 3:
      return "Shipping";
    case 4:
      return "Completed";
    case 5:
      return "Cancelled";
    default:
      return "Rejected";
  }
};
const formatOrderPayment = (payment, status) => {
  let text = "";
  switch (payment) {
    case "COD": {
      if (status === 1) {
        text = "Waiting";
      } else if (status === 4) {
        text = "Paid";
      } else if (status === 5 || status === 6) {
        text = "Cancelled";
      } else {
        text = "Waiting";
      }
      break;
    }
    case "ONLINE": {
      text = "Paid";
      break;
    }
    default:
      break;
  }
  return text;
};

export {
  formatSalePrice,
  formatOriginalPrice,
  formatSubtotalPrice,
  formatOrderStatus,
  formatOrderPayment,
};
