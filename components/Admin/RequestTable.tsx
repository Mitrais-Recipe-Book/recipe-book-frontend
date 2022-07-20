import { removeUser } from "@redux/reducers/userReducer";
import axios from "axios";
import React from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";

interface User {
  id: number;
  email: string;
  username: string;
  fullName: string;
  roles: string[];
}
interface Props {
  data: User[];
  loading: boolean;
  removeUser(username: string): void;
}

export default function RequestTable(props: Props) {
  function acceptRequest(username: string): void {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to accept request of ${username}`,
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        axios
          .put(`${process.env.API_URL}user/${username}/approve-creator`)
          .then(() => {
            props.removeUser(username);
            Swal.fire({
              title: "Success",
              text: "Request has been approved",
              icon: "success",
              confirmButtonText: "OK",
            });
          });
      }
    });
  }

  function rejectRequest(username: string): void {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to reject request of ${username}`,
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        axios
          .delete(`${process.env.API_URL}user/${username}/remove-Request`)
          .then(() => {
            props.removeUser(username);
            Swal.fire({
              title: "Success",
              text: "Request has been rejected",
              icon: "success",
              confirmButtonText: "OK",
            });
          });
      }
    });
  }
  const columns = [
    {
      name: "Username",
      sortable: true,
      style: { marginLeft: "20%" },
      selector: (row: { username: string }) => row.username,
    },
    {
      name: "Request",
      sortable: false,
      style: { marginLeft: "10%" },
      selector: (row: { username: string }) => {
        return (
          <div className="flex gap-4">
            <button
              className="bg-green-600 text-white px-2 py-1 rounded"
              onClick={() => acceptRequest(row.username)}
            >
              Accept
            </button>
            <button
              className="bg-red-600 text-white px-2 py-1 rounded"
              onClick={() => rejectRequest(row.username)}
            >
              Reject
            </button>
          </div>
        );
      },
    },
  ];
  const customStyles = {
    headCells: {
      style: {
        marginLeft: "20%",
      },
    },
  };
  return (
    <DataTable
      name="Request"
      //@ts-ignore
      columns={columns}
      data={props.data}
      progressPending={props.loading}
      customStyles={customStyles}
      pagination
      paginationPerPage={10}
    />
  );
}
