import useProductHome from "@hooks/useProductHome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import WishlistItem from "./WishlistItem";
import { addProductToCart } from "@app/slice/CartSlice";
import toastObj from "@utils/Toast";
import { removeProductWishList } from "@app/slice/WishlistSlice";

const WishlistTable = () => {
  const wishlistList = useSelector((state) => state.wishlist.data);
  const userLoggined = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const { data } = useProductHome();
  const productList = data.products;
  const [wishList, setWithList] = useState([]);
  useEffect(() => {
    const filteredProducts = productList.filter((product) =>
      wishlistList.includes(product._id)
    );
    setWithList(filteredProducts);
  }, [productList, wishlistList]);
  const handleDelete = (item) => {
    dispatch(removeProductWishList(item._id));
    toastObj.success("Delete success");
  };
  const handleAddCart = (item) => {
    dispatch(
      addProductToCart({
        userId: userLoggined._id,
        quantity: 1,
        productId: item._id,
      })
    );
    toastObj.success("Add to cart success");
  };
  if (!wishList || wishList.length === 0) return <p>Loading...</p>;
  return (
    <div className="pt-4">
      <div className="relative overflow-x-auto rounded-md">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {wishList.map((item) => (
              <WishlistItem
                key={item._id}
                item={item}
                onClickDelete={handleDelete}
                onClickCart={handleAddCart}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WishlistTable;
