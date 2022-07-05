import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

interface User {
  id: number;
  username: string;
  fullName: string;
  email: string;
  roles: string[];
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>();
  const columns = [
    {
      name: "Username",
      sortable: true,
      selector: (row: User) => row.username,
    },
    {
      name: "Fullname",
      sortable: true,
      selector: (row: User) => row.fullName,
    },
    {
      name: "Email",
      sortable: true,
      selector: (row: User) => row.email,
    },
    {
      name: "Roles",
      sortable: false,
      maxWidth: "100px",
      selector: (row: User) => {
        return row.roles.map((role) => {
          return <div>{role}</div>;
        });
      },
    },
  ];

  useEffect(() => {
    axios.get(`${process.env.API_URL}user?page=0`).then((res) => {
      setUsers(res.data.payload.data);
    });
  }, []);

  return (
    <DataTable
      name="Users"
      //@ts-ignore
      columns={columns}
      data={users!}
      progressPending={false}
      pagination
      paginationPerPage={5}
      paginationRowsPerPageOptions={[5, 10, 20]}
    />
  );
}
