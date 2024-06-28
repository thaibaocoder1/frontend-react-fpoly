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

export { formatSalePrice, formatOriginalPrice };
