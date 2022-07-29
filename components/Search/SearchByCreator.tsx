import Router from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQueryCreator, sendQuery } from "../../redux/reducers/queryReducer";

export default function SearchByCreator() {
  const dispatch = useDispatch();
  const searchItem = useSelector((state: any) => state.query.queryCreator);
  return (
    <main className="py-4 w-3/4 sm:w-full bg-white shadow md:grid">
      <div className="container md:flex px-2 md:place-self-center">
        <input
          className="w-full px-5 h-8 border-2 border-gray-200 focus:outline-none focus:border-orange-600 rounded "
          placeholder="Search By Creator..."
          value={searchItem}
          onChange={(event) => {
            dispatch(setQueryCreator(event.currentTarget.value));
            //@ts-ignore
            dispatch(sendQuery());
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              //@ts-ignore
              dispatch(sendQuery());
            }
          }}
        />
      </div>
    </main>
  );
}
