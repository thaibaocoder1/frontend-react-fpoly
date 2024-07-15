import PropTypes from "prop-types";

const AccountItemDeleted = ({ user, onClick, onClickRecover }) => {
  const handleClickUser = (id) => {
    if (onClick) onClick(id);
  };
  const handleClickRecover = async (id) => {
    if (onClickRecover) await onClickRecover(id);
  };
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
          <span
            onClick={() => handleClickRecover(user._id)}
            className="text-white p-[6px] bg-sky-500 rounded hover:shadow-lg cursor-pointer hover:shadow-sky-500/50"
          >
            Recover
          </span>
          <span
            className="text-white p-[6px] bg-red-500 rounded hover:shadow-lg cursor-pointer hover:shadow-red-500/50"
            onClick={() => handleClickUser(user._id)}
          >
            Delete
          </span>
        </div>
      </td>
    </tr>
  );
};

AccountItemDeleted.propTypes = {
  user: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  onClickRecover: PropTypes.func,
};

export default AccountItemDeleted;
