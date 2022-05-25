import React from "react";
import Image from "next/image";
import { SiCodechef } from "react-icons/si";

// @ts-ignore
export default function RecipeCard(props) {
  // console.log(props);
  return (
    <div className="mx-2 my-3 sm:w-40 xl:w-50 box-border border-1 pb-2 rounded shadow transition-all hover:bg-orange-200 hover:scale-110">
      <Image
        className="w-full rounded-t cursor-pointer"
        src={props.recipe.recipeImage ? props.recipe.recipeImage : "/images/bibimbap-image.webp"}
        alt="RecipyBook"
        width={200}
        height={130}
        objectFit="cover"
      />
      <div className="px-2 py-1">
        <div className="font-bold text-lg cursor-pointer break-words">
          {props.recipe.recipeName}
        </div>
        <div className="text-gray-600 md:text-ellipsis">
          {props.recipe.description}
        </div>
        {props.recipe.author? (<div className="flex py-2">
          <div className="py-2 cursor-pointer ml-1 mr-2">
            {props.recipe.authorImage ? <Image src={props.recipe.authorImage} className="rounded-full" width={24} height={24} objectFit="cover" alt="author profile" /> : <SiCodechef className="rounded-full" size={24} />}
          </div>
          <div>
            <div className="font-semibold text-sm cursor-pointer">
              {props.recipe.author}
            </div>
            <div className="text-xs pl-1 text-gray-600 cursor-pointer">
              {props.recipe.authorFollower}
            </div>
          </div>
        </div>): null}
        
      </div>
      <div className="text-center pt-1">
        <div className="text-sm text-gray-600"> {props.recipe.recipeViews} </div>
      </div>
    </div>
  );
}
