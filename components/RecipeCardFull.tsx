import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const BannerImage = dynamic(
  () => import("@components/RecipeDetail/BannerImage"),
  {
    loading: () => (
      <div className="flex self-center">Loading Banner Image...</div>
    ),
  }
);
const ProfileImage = dynamic(
  () => import("@components/RecipeDetail/ProfileImage"),
  {
    loading: () => <div>Loading Profile Image...</div>,
  }
);

// @ts-ignore
export default function RecipeCardFull(props) {
  const router = useRouter();

  function pushToRecipe() {
    router.push(`/recipe/${props.recipe.id}`);
  }

  return (
    <div className="mx-2 my-3 sm:w-full xl:w-50 box-border border-1 pb-2 rounded shadow transition-all hover:bg-orange-200 hover:scale-110">
      <BannerImage
        id={props.recipe.id}
        alt={`banner-recipe-${props.recipe.recipeName}`}
        href={true}
      />
      <div className="px-2 py-1">
        <div
          className="font-bold text-lg cursor-pointer break-words line-clamp-2"
          onClick={pushToRecipe}
        >
          {props.recipe.recipeName}
        </div>
        <div className="text-gray-600 break-words line-clamp-3">
          {props.recipe.description}
        </div>
        <div className="grid grid-cols-4 py-2">
          <div className="py-2 cursor-pointer ml-1 mr-2">
            <div className="w-3/4 m-auto">
              <ProfileImage
                src={props.recipe.author.username}
                alt={`${props.recipe.author.username}-pp`}
              />
            </div>
          </div>
          <div>
            <div className="col-span-3 font-semibold text-sm cursor-pointer">
              {props.recipe.author.fullName}
            </div>
            <div className="text-xs pl-1 text-gray-600 cursor-pointer">
              {props.recipe.authorFollowers}
            </div>
          </div>
        </div>
      </div>
      <div className="text-center pt-1">
        <div className="text-sm text-gray-600">
          {" "}
          {props.recipe.recipeViews}{" "}
        </div>
      </div>
    </div>
  );
}
