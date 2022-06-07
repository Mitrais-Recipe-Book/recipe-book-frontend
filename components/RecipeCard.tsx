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
export default function RecipeCard(props) {
  const router = useRouter();

  function pushToRecipe() {
    router.push(`/recipe/${props.recipe.id}`);
  }
  return (
    <div
      className={`${
        props.recipe.author
          ? "grid grid-flow-row grid-flow-row-col grid-rows-3 grid-cols-1"
          : "flex-wrap"
      } mx-2 my-3 sm:w-40 xl:w-50 box-border border-1 pb-2 rounded shadow transition-all hover:bg-orange-200 hover:scale-110`}
    >
      <section>
        <BannerImage
          id={props.recipe.id}
          alt={`banner-recipe-${props.recipe.recipeName}`}
          href={true}
        />
      </section>
      <section
        className={`mx-2 my-1 ${
          props.recipe.author ? "row-span-1" : "row-span-2"
        }`}
      >
        <div
          className="font-bold text-lg cursor-pointer break-words line-clamp-2"
          onClick={pushToRecipe}
          title={props.recipe.recipeName}
        >
          {props.recipe.recipeName}
        </div>
        <div
          className="text-gray-600 break-words line-clamp-3"
          title={props.recipe.description}
        >
          {props.recipe.description}
        </div>
      </section>

      {props.recipe.author ? (
        <section className="object-bottom">
          <div className="grid grid-cols-4 my-4">
            <div className="w-3/4 m-auto">
              <ProfileImage
                src={props.recipe.author.username}
                alt={`${props.recipe.author.username}-pp`}
              />
            </div>
            <div className="col-span-3">
              <div className="font-semibold text-sm cursor-pointer">
                {props.recipe.author.fullName}
              </div>
              <div className="text-xs pl-1 text-gray-600 cursor-pointer">
                {props.recipe.author.authorFollowers}
              </div>
            </div>
          </div>
          <div className="text-center pt-1">
            <div className="text-sm text-gray-600">
              {" "}
              {props.recipe.recipeViews}{" "}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
