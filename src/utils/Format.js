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

export { formatSalePrice, formatOriginalPrice, formatSubtotalPrice };
