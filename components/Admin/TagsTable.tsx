import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

export default function TagsTable() {
  const URL = "https://recipyb-dev.herokuapp.com/api/v1/tag";
  const [tags, setTags] = useState([
    {
      id: 1,
      name: "Tag 1",
    },
    {
      id: 2,
      name: "Tag 2",
    },
    {
      id: 3,
      name: "Tag 3",
    },
  ]);

  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    axios.get(URL).then((res) => {
      setTags(res.data.payload);
      console.log("payload= ",res.data.payload);
    });
  }, []);

  const columns = [
    {
      name: "Tags",
      sortable: true,
      selector: (row: { id: any, name: string }) => (
        <input
          disabled={true}
          name={"input" + row.id}
          className="text-base p-1 rounded-full w-full"
          type="text"
          value={row.name}
          onChange={(e) => {
            setTags(
              tags.map((tag) => {
                if (tag.name === row.name) {
                  tag.name = e.target.value;
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
      selector: (row: { id: any, name: string }) => {
        return (
          <div>
            <button
              name={"edit" + row.id}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
              onClick={() => {
                var inputText = document.querySelector(
                  `input[name='input${row.id}']`
                ) as HTMLInputElement;
                inputText.disabled = !inputText.disabled;
                inputText.disabled
                  ? ((inputText.className =
                      "w-full border-0 p-1 rounded-full text-base"),
                    axios.put(URL, {
                      tagId: row.id,
                      tagReplace: row.name}),
                    ((
                      document.querySelector(
                        `button[name='edit${row.id}']`
                      ) as HTMLButtonElement
                    ).innerHTML = "Edit"))
                  : ((inputText.className =
                      "w-full border-2 border-gray-400 p-1 rounded-full text-base"),
                    ((
                      document.querySelector(
                        `button[name='edit${row.id}']`
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
            console.log("send tag:",newTag);
            axios.post(URL, newTag, {headers:{
              "Content-Type": "application/xwww-form-urlencoded",
            }}).then((res) => {
              console.log("uploaded tag: ",res.data.payload);
              setTags([
                ...tags,
                { id: res.data.payload.id, name: res.data.payload.name }
              ]);
            });
            setNewTag("");
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}
