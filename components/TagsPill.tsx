import  Router  from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTagsToQuery, getRecipesByTags, removeTagsFromQuery } from "../redux/reducers/tagReducer";


const TagsPill = ({tag}:any) => {
  const dispatch = useDispatch();
  const queryTags = useSelector((state:any) => state.tags.queryTags);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    console.log("query",queryTags);
    setIsActive(queryTags.has(tag.id));
  }, [queryTags]);
  
  return (
    <div id="tag" className="rounded py-1 px-4 mx-1 my-1 border-solid border-2 border-black transition-all cursor-pointer hover:scale-110 hover:bg-orange-300 "
    onClick={(event) => {
      console.log(queryTags.has(tag.id));
      setIsActive(queryTags.has(tag.id));
      if(!isActive){
      dispatch(addTagsToQuery(tag.id));
      //@ts-ignore
      dispatch(getRecipesByTags());
      event.currentTarget.className = "rounded bg-orange-600 py-1 px-4 mx-1 my-1 border-solid border-2 border-black transition-all cursor-pointer hover:scale-110 hover:bg-orange-300 ";
      // setIsActive(true);
      } else{
        dispatch(removeTagsFromQuery(tag.id));
        //@ts-ignore
        dispatch(getRecipesByTags());
        event.currentTarget.className = "rounded bg-white py-1 px-4 mx-1 my-1 border-solid border-2 border-black transition-all cursor-pointer hover:scale-110 hover:bg-orange-300";
        // setIsActive(false);
      }
    }
    }
    >
      <h1 className="whitespace-nowrap">{tag.name}</h1>
    </div>
  );
};

export default TagsPill;
