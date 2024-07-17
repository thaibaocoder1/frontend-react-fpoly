export function handleOrderDetailList(order, cart) {
  const { payload } = order;
  const orderDetailList = cart.map((item) => ({
    productID: item._id,
    orderID: payload._id,
    quantity: item.quantity,
    price: ((100 - item.discount) / 100) * item.price,
  }));
  const changeQuantityProduct = cart.map((item) => ({
    productID: item._id,
    quantity: item.stock - item.quantity,
  }));
  return { orderDetailList, changeQuantityProduct };
}
