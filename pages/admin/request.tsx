import React from "react";
import DataTable from "react-data-table-component";

export default function request() {
  const dummyData = [
    {
      username: "John",
    },
  ];
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
      selector: (row: { username: string }) => <div>{row.username}</div>,
    },
    {
      name: "Request",
      sortable: false,
      selector: (row: { username: string }) => {
        return (
          <div>
            <button className="px-5">Accept</button>
            <button className="px-5">Reject</button>
          </div>
        );
      },
    },
  ];
  return (
    <DataTable
      name="Request"
      //@ts-ignore
      columns={columns}
      data={dummyData}
      progressPending={false}
      pagination
      paginationPerPage={5}
      paginationRowsPerPageOptions={[5, 10, 20]}
    />
  );
}
