import  Router  from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTagsToQuery, getRecipesByTags, removeTagsFromQuery } from "../redux/reducers/tagReducer";


const TagsPill = ({tag}:any) => {
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(false);
  
  return (
    <div className="rounded py-1 px-4 mx-1 my-1 border-solid border-2 border-black transition-all cursor-pointer hover:scale-110 hover:bg-orange-300 "
    onClick={() => {
      if(!isActive){
      dispatch(addTagsToQuery(tag.id));
      //@ts-ignore
      dispatch(getRecipesByTags());
      setIsActive(true);
      } else{
        dispatch(removeTagsFromQuery(tag.id));
        //@ts-ignore
        dispatch(getRecipesByTags());
        setIsActive(false);
        console.log("removed");
      }
    }
    }
    >
      <h1 className="whitespace-nowrap">{tag.name}</h1>
    </div>
  );
};

export default TagsPill;
