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
    <main className="py-4 w-3/4 sm:w-full rounded sm:rounded-none bg-white shadow">
      
      <p className="container text-base font-medium mb-1 flex px-2 ">Search by tags</p>
      <div className="container flex place-content-center content-center px-2 ">
        <input
          className="w-full px-3 h-8 border-2 border-gray-200 focus:outline-none focus:border-orange-600 rounded"
          placeholder="Tag name"
          value={filteredTags}
          onChange={(event) => {
            setFilteredTags(event.currentTarget.value);
          }}
        />
      </div>
      <div className="flex flex-wrap justify-center gap-x-1 px-2 py-2">
        {tagsList.map((tag: any) => {
          if (tag.query) {
            return (
              <button
                title={tag.name}
                className=" bg-orange-600 px-2 py-1 border-zinc-800 border-2 rounded break-all hover:scale-110 hover:bg-orange-300"
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
      <div className="flex flex-wrap justify-center gap-x-1 gap-y-1 px-2 py-2">
        {tagsList.map((tag: any) => {
          if (tag.query === false && tag.name.includes(filteredTags)) {
            return (
              <button
                title={tag.name}
                className="bg-white px-2 py-1 border-gray-200 hover:border-slate-800 border-2 rounded break-all hover:scale-110 hover:bg-orange-300"
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
