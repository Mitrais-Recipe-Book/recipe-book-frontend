import Router from "next/router";
import React from "react";
import { FiSearch } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import {
  setQueryRecipeName,
  sendQuery,
} from "../../redux/reducers/queryReducer";

export default function SearchByName() {
  const dispatch = useDispatch();
  const searchItem = useSelector((state: any) => state.query.queryRecipeName);
  return (
    <main className="py-4 w-3/4 bg-yellow-500">
      <div className="container flex place-content-center content-center m-1 sm:px-10 ">
        <input
          className="w-full px-5 h-10 border-2 border-zinc-800 rounded"
          placeholder="Search Recipe..."
          value={searchItem}
          onChange={(event) => {
            dispatch(setQueryRecipeName(event.currentTarget.value));
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              //@ts-ignore
              dispatch(sendQuery());
            }
          }}
        />
        <FiSearch
          className="invisible sm:cursor-pointer sm:visible sm:text-4xl sm:text-zinc-800 sm:mx-3"
          //@ts-ignore
          onClick={() => dispatch(sendQuery())}
        />
      </div>
    </main>
  );
}
