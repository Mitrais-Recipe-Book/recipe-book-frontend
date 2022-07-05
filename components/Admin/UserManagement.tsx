import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";

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
      wrap: true,
      selector: (row: User) => row.email,
    },
    {
      name: "Roles",
      sortable: false,

      selector: (row: User) => {
        return row.roles.map((role) => {
          if (role === "User") {
            return <div className="cursor-not-allowed">{role}</div>;
          } else {
            return (
              <div
                className="cursor-pointer hover:text-red-700 mt-1"
                onClick={() => {
                  removeRole(row.username, role);
                }}
              >
                {role}
              </div>
            );
          }
        });
      },
    },
    {
      name: "Actions",
      sortable: false,
      allowOverflow: true,
      grow: 2,
      selector: (row: User) => {
        return (
          <div className="flex flex-row gap-4">
            <button
              className="bg-green-600 text-white px-2 py-1 rounded"
              onClick={() => {
                addRole(row.username);
              }}
            >
              +Role
            </button>
            <button className="bg-red-600 text-white px-2 py-1 rounded">
              Delete
            </button>
          </div>
        );
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

  async function addRole(username: string) {
    const { value: role } = await Swal.fire({
      title: "Add Role",
      input: "select",
      inputOptions: {
        Creator: "Content Creator",
        Admin: "Admin",
      },
      inputPlaceholder: "Please Select a Role",
      showCancelButton: true,
    });
    if (role) {
      if (role !== "Admin" && role !== "Creator") {
        Swal.fire({
          title: "Error",
          text: "Please enter a valid role",
          icon: "error",
        });
      } else {
        axios
          .post(`${process.env.API_URL}user/${username}/assign-${role}`)
          .then(() =>
            Swal.fire({
              title: "Success",
              text: "Role added successfully",
              icon: "success",
            })
          )
          .catch(() =>
            Swal.fire({
              title: "Error",
              text: "Something went wrong",
              icon: "error",
            })
          );
      }
    }
  }

  function removeRole(username: string, role: string): any {
    console.log(`Delete role ${role} for user ${username}`);
  }

  useEffect(() => {
    fetchUser(0);
  }, []);

  return (
    <div className="my-4 mx-8">
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
    </div>
  );
}
