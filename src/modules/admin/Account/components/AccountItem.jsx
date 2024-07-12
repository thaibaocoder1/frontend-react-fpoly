import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AccountItem = ({ user, onClick }) => {
  return (
    <tr>
      <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
        {user._id}
      </td>
      <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
        <img
          className="w-[80px] h-[80px] object-cover"
          src={user.imageUrl.fileName}
          alt={user.fullname}
        />
      </td>
      <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
        {user.fullname}
      </td>
      <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
        {user.username}
      </td>
      <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
        {user.email}
      </td>
      <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
        {user.phone}
      </td>
      <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
        {user.role}
      </td>
      <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
        {user.isActive ? "Active" : "Deactive"}
      </td>
      <td scope="row" className="py-1 px-4 font-medium whitespace-nowrap">
        <div className="flex justify-start items-center gap-2">
          <Link
            to={`edit/${user._id}`}
            className="text-white p-[6px] bg-sky-500 rounded hover:shadow-lg cursor-pointer hover:shadow-sky-500/50"
          >
            Edit
          </Link>
          <span
            className="text-white p-[6px] bg-red-500 rounded hover:shadow-lg cursor-pointer hover:shadow-red-500/50"
            onClick={() => onClick && onClick()}
          >
            Deactive
          </span>
        </div>
      </td>
    </tr>
  );
};

AccountItem.propTypes = {
  user: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default AccountItem;
