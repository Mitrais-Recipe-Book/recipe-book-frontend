import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { addTagsToQuery, sendQuery } from "../redux/reducers/queryReducer";

const TagsPill = ({ tag }: any) => {
  const dispatch = useDispatch();

  return (
    <div
      id="tag"
      className="rounded py-1 px-4 mx-1 my-1 border-solid border-2 border-black transition-all cursor-pointer hover:scale-110 hover:bg-orange-300 "
      onClick={(event) => {
        dispatch(addTagsToQuery(tag));
        axios.put(`${process.env.API_URL}tag/addview?tagId=${tag.id}`);
        //@ts-ignore
        dispatch(sendQuery());
      }}
    >
      <h1 className="whitespace-nowrap">{tag.name}</h1>
    </div>
  );
};

export default TagsPill;
