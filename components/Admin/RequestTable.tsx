import React from "react";
import DataTable from "react-data-table-component";

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
}

export default function RequestTable(props: Props) {
  const columns = [
    {
      name: "Username",
      sortable: true,
      style: { marginLeft: "20%" },
      selector: (row: { username: string }) => <div>{row.username}</div>,
    },
    {
      name: "Request",
      sortable: false,
      style: { marginLeft: "10%" },
      selector: (row: { username: string }) => {
        return (
          <div className="flex gap-4">
            <button className="bg-green-600 text-white px-2 py-1 rounded">
              Accept
            </button>
            <button className="bg-red-600 text-white px-2 py-1 rounded">
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
