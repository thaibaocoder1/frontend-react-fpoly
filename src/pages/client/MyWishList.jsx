import WishlistTable from "@modules/client/Wishlist/components/WishlistTable";

const MyWishList = () => {
  return (
    <div className="bg-white p-4 rounded-md">
      <h2 className="text-xl font-semibold text-slate-600">My Wishlist</h2>
      <WishlistTable />
    </div>
  );
};

export default MyWishList;
