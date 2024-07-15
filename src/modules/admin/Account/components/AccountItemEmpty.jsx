import { CiSquareInfo } from "react-icons/ci";

const AccountItemEmpty = () => {
  return (
    <tr className="text-center">
      <td colSpan={10}>
        <span className="inline-flex items-center gap-2 text-base">
          Data is empty!
          <CiSquareInfo />
        </span>
      </td>
    </tr>
  );
};

export default AccountItemEmpty;
