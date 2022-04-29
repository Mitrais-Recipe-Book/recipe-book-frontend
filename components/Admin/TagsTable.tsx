import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

export default function TagsTable() {
    const [tags, setTags] = useState([{
        tag: "Tag 1",
      },
      {
        tag: "Tag 2",
      },
      {
        tag: "Tag 3",
      },])

  const columns = [
    {
      name: "Tag",
      sortable: true,
      selector: (row: { tag: any }) => (
        <input
          disabled={true}
          name={"input" + row.tag}
          className="text-center"
          type="text"
          value={row.tag}
          onChange={(e) => {
              setTags(tags.map(tag => {
                    if (tag.tag === row.tag) {
                        tag.tag = e.target.value
                    }
                    return tag
                }))
            }}
        />
      ),
      
    },
    {
      name: "Actions",
      sortable: false,
      selector: (row: { tag: any }) => {
        return (
          <div>
            <button
              name={"edit" + row.tag}
              onClick={() => {
                var inputText = document.querySelector(
                  `input[name="input${row.tag}"]`
                ) as HTMLInputElement;
                inputText.disabled = !inputText.disabled;
                inputText.disabled
                  ? (inputText.className =
                      "border-0 border-gray-400 p-1 rounded-full text-center",
                      (document.querySelector(
                        `button[name="edit${row.tag}"]`
                      ) as HTMLButtonElement).innerHTML = "Edit")
                  : (inputText.className =
                      "border-2 border-gray-400 p-1 rounded-full text-center",
                      (document.querySelector(
                        `button[name="edit${row.tag}"]`
                      ) as HTMLButtonElement).innerHTML = "Save");

              }}
            >
              Edit
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <DataTable
        title="Tags"
        //@ts-ignore
        columns={columns}
        data={tags}
        pagination
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5, 10, 20]}
      />
    </div>
  );
}
