const OrderItemSkeleton = () => {
  return Array.from({ length: 3 }).map((_, index) => (
    <tr key={index} className="animate-pulse">
      <td className="px-6 py-3">
        <div className="h-4 bg-gray-200 rounded"></div>
      </td>
      <td className="px-6 py-3">
        <div className="h-4 bg-gray-200 rounded"></div>
      </td>
      <td className="px-6 py-3">
        <div className="h-4 bg-gray-200 rounded"></div>
      </td>
      <td className="px-6 py-3">
        <div className="h-4 bg-gray-200 rounded"></div>
      </td>
      <td className="px-6 py-3">
        <div className="h-4 bg-gray-200 rounded"></div>
      </td>
      <td className="px-6 py-3">
        <div className="h-4 bg-gray-200 rounded"></div>
      </td>
    </tr>
  ));
};

export default OrderItemSkeleton;
