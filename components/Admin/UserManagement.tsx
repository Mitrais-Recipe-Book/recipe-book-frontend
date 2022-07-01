import React, { useState } from "react";
import DataTable from "react-data-table-component";

interface User {
  id: number;
  username: string;
  fullname: string;
  roles: string[];
}

export default function UserManagement() {
  const [users, setUsers] = useState();
  const columns = [
    {
      name: "Username",
      sortFunction: (a: any, b: any) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      },
      selector: (row: { id: any; name: string; temp: string }) => (
        <div>username</div>
      ),
    },
    {
      name: "Roles",
      sortable: false,
      maxWidth: "100px",
      selector: (row: { id: any; name: string; temp: string }) => {
        return <div>roles</div>;
      },
    },
  ];
  return (
    <DataTable
      name="Users"
      //@ts-ignore
      columns={columns}
      // data={"test"}
      progressPending={false}
      pagination
      paginationPerPage={5}
      paginationRowsPerPageOptions={[5, 10, 20]}
    />
  );
}
