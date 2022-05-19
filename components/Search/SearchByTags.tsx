import Router from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTagsToQuery,
  removeTagsFromQuery,
  sendQuery,
} from "../../redux/reducers/queryReducer";

export default function SearchByTags() {
  const dispatch = useDispatch();
  const tagsList = useSelector((state: any) => state.query.allTags);
  const queryTags = useSelector((state: any) => state.query.queryTags);
  const [filteredTags, setFilteredTags] = useState("");
  return (
    <main className="py-4 w-3/4 sm:w-full bg-yellow-500">
      <div className="container flex place-content-center content-center px-2 ">
        <input
          className="w-full px-5 h-8 border-2 border-zinc-800 rounded"
          placeholder="Search By Tags..."
          value={filteredTags}
          onChange={(event) => {
            setFilteredTags(event.currentTarget.value);
          }}
        />
      </div>
      <div className="flex gap-x-1 px-2 py-2">
        {tagsList.map((tag: any) => {
          if (tag.query) {
            return (
              <button
                className="bg-orange-600 px-2 py-1 border-zinc-800 border-2 rounded"
                key={tag.name}
                onClick={() => {
                  dispatch(removeTagsFromQuery(tag));
                  //@ts-ignore
                  dispatch(sendQuery());
                }}
              >
                {tag.name}
              </button>
            );
          }
        })}
      </div>
      <div className="flex gap-x-1 px-2 py-2">
        {tagsList.map((tag: any) => {
          if (tag.query === false && tag.name.includes(filteredTags)) {
            return (
              <button
                className="bg-white px-2 py-1 border-zinc-800 border-2 rounded"
                onClick={() => {
                  dispatch(addTagsToQuery(tag));
                  //@ts-ignore
                  dispatch(sendQuery());
                }}
              >
                {tag.name}
              </button>
            );
          }
        })}
      </div>
    </main>
  );
}
