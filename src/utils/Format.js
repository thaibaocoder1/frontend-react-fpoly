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
    default:
      return "Cancelled";
  }
};

export {
  formatSalePrice,
  formatOriginalPrice,
  formatSubtotalPrice,
  formatOrderStatus,
};
