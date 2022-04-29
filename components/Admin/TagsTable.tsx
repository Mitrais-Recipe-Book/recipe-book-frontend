import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

export default function TagsTable() {
  const [tags, setTags] = useState([
    {
      tag: "Tag 1",
    },
    {
      tag: "Tag 2",
    },
    {
      tag: "Tag 3",
    },
  ]);

  const [newTag, setNewTag] = useState("");

  const columns = [
    {
      name: "Tags",
      sortable: true,
      selector: (row: { tag: any }) => (
        <input
          disabled={true}
          name={"input" + row.tag}
          className="text-base p-1 rounded-full w-full"
          type="text"
          value={row.tag}
          onChange={(e) => {
            setTags(
              tags.map((tag) => {
                if (tag.tag === row.tag) {
                  tag.tag = e.target.value;
                }
                return tag;
              })
            );
          }}
        />
      ),
    },
    {
      name: "Actions",
      sortable: false,
      maxWidth: "100px",
      selector: (row: { tag: any }) => {
        return (
          <div>
            <button
              name={"edit" + row.tag}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
              onClick={() => {
                var inputText = document.querySelector(
                  `input[name="input${row.tag}"]`
                ) as HTMLInputElement;
                inputText.disabled = !inputText.disabled;
                inputText.disabled
                  ? ((inputText.className =
                      "w-full border-0 p-1 rounded-full text-base"),
                    ((
                      document.querySelector(
                        `button[name="edit${row.tag}"]`
                      ) as HTMLButtonElement
                    ).innerHTML = "Edit"))
                  : ((inputText.className =
                      "w-full border-2 border-gray-400 p-1 rounded-full text-base"),
                    ((
                      document.querySelector(
                        `button[name="edit${row.tag}"]`
                      ) as HTMLButtonElement
                    ).innerHTML = "Save"));
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
    <div className="px-4 py-4 m-2">
        <DataTable
          name="Tags"
          //@ts-ignore
          columns={columns}
          data={tags}
          pagination
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 20]}
        />
      <div className="flex flex-wrap px-4">
        <input
          className="w-1/2 border-2 border-gray-400 p-1 rounded-full text-center"
          type="text"
          placeholder="New tag..."
          value={newTag}
          onChange={(e) => {
            setNewTag(e.target.value);
          }}
        />
        <span className="px-2"></span>
        <button
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-4 rounded"
          onClick={() => {
            setTags([...tags, { tag: newTag }]);
            setNewTag("");
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}
