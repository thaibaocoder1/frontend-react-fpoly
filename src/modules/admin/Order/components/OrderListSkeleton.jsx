const OrderListSkeleton = () => {
  const skeletonRows = Array.from({ length: 3 }, (_, index) => (
    <tr key={index}>
      <td className="py-3 px-4">
        <div className="h-4 bg-slate-200 rounded"></div>
      </td>
      <td className="py-3 px-4">
        <div className="h-4 bg-slate-200 rounded"></div>
      </td>
      <td className="py-3 px-4">
        <div className="h-4 bg-slate-200 rounded"></div>
      </td>
      <td className="py-3 px-4">
        <div className="h-4 bg-slate-200 rounded"></div>
      </td>
      <td className="py-3 px-4">
        <div className="h-4 bg-slate-200 rounded"></div>
      </td>
      <td className="py-3 px-4">
        <div className="h-4 bg-slate-200 rounded"></div>
      </td>
      <td className="py-3 px-4">
        <div className="h-4 bg-slate-200 rounded"></div>
      </td>
    </tr>
  ));

  return <tbody className="animate-pulse">{skeletonRows}</tbody>;
};

export default OrderListSkeleton;
