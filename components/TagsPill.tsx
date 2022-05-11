import  Router  from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTagsToQuery, getRecipesByTags } from "../redux/reducers/tagReducer";


const TagsPill = ({tag}:any) => {
  const dispatch = useDispatch();
  const activeTags = useSelector((state:any) => state.tags.queryTags);
  
  return (
    <div className="rounded py-1 px-4 mx-1 my-1 border-solid border-2 border-black transition-all cursor-pointer hover:scale-110 hover:bg-orange-300 "
    onClick={() => {
      dispatch(addTagsToQuery(tag.id));
      //@ts-ignore
      console.log(dispatch(getRecipesByTags()));

      Router.push( `/tag/id=${Array.from(activeTags).join("&")}`);
    }
    }
    >
      <h1 className="whitespace-nowrap">{tag.name}</h1>
    </div>
  );
};

export default TagsPill;
