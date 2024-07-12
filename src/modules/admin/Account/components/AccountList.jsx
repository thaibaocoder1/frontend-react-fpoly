import useAccount from "@hooks/useAccount";
import { useState } from "react";
import AccountItem from "./AccountItem";
import { Pagination } from "@mui/material";
import SearchItem from "@components/SearchItem/SearchItem";

const AccountList = () => {
  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 6,
    _search: "",
  });
  const { data } = useAccount(filters);
  const handleClick = () => {
    console.log(123);
  };
  const handlePageChange = (_, page) => {
    setFilters((prev) => ({ ...prev, _page: page }));
  };
  const handleSearchChange = (value) => {
    setFilters((prev) => ({ ...prev, _search: value }));
  };

  return (
    <div className="w-full">
      <div className="w-full p-4 bg-white rounded-md">
        <div className="flex justify-between items-center">
          <h3 className="text-slate-600 bg-slate-300 p-2 rounded-md">Search</h3>
          <SearchItem onChange={handleSearchChange} />
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-sm text-black uppercase border-b border-slate-700">
              <tr>
                <th scope="col" className="py-3 px-4">
                  No
                </th>
                <th scope="col" className="py-3 px-4">
                  Image
                </th>
                <th scope="col" className="py-3 px-4">
                  Fullname
                </th>
                <th scope="col" className="py-3 px-4">
                  Username
                </th>
                <th scope="col" className="py-3 px-4">
                  Email
                </th>
                <th scope="col" className="py-3 px-4">
                  Phone
                </th>
                <th scope="col" className="py-3 px-4">
                  Role
                </th>
                <th scope="col" className="py-3 px-4">
                  Status
                </th>
                <th scope="col" className="py-3 px-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data.users.length > 0 &&
                data.users.map((user) => (
                  <AccountItem
                    key={user._id}
                    user={user}
                    onClick={handleClick}
                  />
                ))}
            </tbody>
          </table>
        </div>

        <div className="w-full inline-flex justify-end mt-4 bottom-4 right-4">
          <Pagination
            count={data.pagination.totalPages || 4}
            page={data.pagination.page || 1}
            variant="outlined"
            shape="rounded"
            color="primary"
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default AccountList;
