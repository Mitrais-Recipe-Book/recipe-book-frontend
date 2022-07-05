import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable, { TableColumn, TableProps } from "react-data-table-component";

interface User {
  id: number;
  username: string;
  fullName: string;
  email: string;
  roles: string[];
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>();
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalRows, setTotalRows] = useState<number>(0);
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

  function fetchUser(page: number) {
    axios.get(`${process.env.API_URL}user?page=${page}`).then((res) => {
      setUsers(res.data.payload.data);
      setTotalPages(res.data.payload.totalPages);
      setTotalRows(res.data.payload.totalItem);
    });
  }

  useEffect(() => {
    fetchUser(0);
  }, []);

  return (
    <DataTable
      name="Users"
      //@ts-ignore
      columns={columns}
      data={users!}
      pagination
      paginationServer
      paginationTotalRows={totalRows}
      paginationTotalPages={totalPages}
      paginationResetDefaultPage={true}
      onChangePage={(page) => {
        fetchUser(page - 1);
      }}
      paginationPerPage={10}
      paginationRowsPerPageOptions={[10]}
    />
  );
}
