import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";

interface Tag {
  id: number;
  name: string;
  temp: string;
  views: number;
  totalRecipe: number;
}

export default function TagsTable() {
  const URL = `${process.env.API_URL}tag/all`;
  const [loading, setLoading] = useState(true);
  // const [sortable, setSortable] = useState(true)
  const [notif, setNotif] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [tags, setTags] = useState([
    {
      id: 1,
      name: "",
      temp: "",
      views: 0,
    },
  ]);

  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    axios.get(URL).then((res) => {
      setTags(
        res.data.payload.map((tag: any) => ({
          id: tag.id,
          name: tag.name,
          temp: tag.name,
          views: tag.views,
          totalRecipe: tag.totalRecipe,
        }))
      );
      setLoading(false);
    });
  }, []);

  const columns = [
    {
      name: "Tags",
      sortFunction: (a: any, b: any) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      },
      selector: (row: Tag) => (
        <input
          disabled={true}
          name={"input" + row.id}
          className="text-base p-1 rounded-full w-full"
          type="text"
          value={row.temp}
          onChange={(e) => {
            setTags(
              tags.map((tag) => {
                if (tag.id === row.id) {
                  if (tag.temp.length <= 21) {
                    tag.temp = e.target.value.toLowerCase();
                    if (tag.temp.length === 21) {
                      tag.temp = tag.temp.slice(0, 20);
                    }
                  }
                }
                return tag;
              })
            );
          }}
        />
      ),
    },
    {
      name: "Total Recipes",
      sortable: true,
      selector: (row: Tag) => {
        return <div>{row.totalRecipe}</div>;
      },
    },
    {
      name: "Total Clicks",
      sortable: true,
      selector: (row: Tag) => {
        return row.views;
      },
    },
    {
      name: "Actions",
      sortable: false,
      maxWidth: "100px",
      selector: (row: Tag) => {
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
                    axios
                      .put(URL, {
                        tagId: row.id,
                        tagReplace: row.temp,
                      })
                      .then((res) => {
                        setNotif(false);
                        setTags(
                          tags.map((tag) => {
                            if (tag.id === row.id) {
                              tag.name = tag.temp;
                            }
                            return tag;
                          })
                        );
                      })
                      .catch((err) => {
                        setTags(
                          tags.map((tag) => {
                            if (tag.id === row.id) {
                              tag.temp = tag.name;
                            }
                            return tag;
                          })
                        );
                        setErrorMessage(
                          `Failed to edit tag ${err.response.data.payload.toBeEdited} to ${err.response.data.payload.input}. ${err.response.data.message}`
                        );

                        setNotif(true);
                      }),
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
      {notif ? (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Failed!</strong>
          <br />
          <span className="block sm:inline">{errorMessage}</span>
          <span
            className="absolute top-0 bottom-0 right-0 px-4 py-3 "
            onClick={() => setNotif(false)}
          >
            <svg
              className="fill-current h-6 w-6 text-black-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      ) : (
        ""
      )}
      <DataTable
        name="Tags"
        //@ts-ignore
        columns={columns}
        data={tags}
        progressPending={loading}
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
            if (e.target.value.length <= 21) {
              setNewTag(e.target.value.toLowerCase());
              if (e.target.value.length === 21) {
                setNewTag(newTag.slice(0, 20));
              }
            }
          }}
        />
        <span className="px-2"></span>
        <button
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-4 rounded"
          onClick={() => {
            axios
              .post(URL, newTag, {
                headers: {
                  "Content-Type": "application/xwww-form-urlencoded",
                },
              })
              .then((res) => {
                setNotif(false);
                setTags([
                  ...tags,
                  {
                    id: res.data.payload.id,
                    name: res.data.payload.name,
                    temp: res.data.payload.name,
                    views: 0,
                  },
                ]);
              })
              .catch((err) => {
                setErrorMessage(
                  `Failed to create tag.\n${err.response.data.message}`
                );
                setNotif(true);
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
