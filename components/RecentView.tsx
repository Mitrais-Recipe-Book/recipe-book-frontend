import PromptLogin from "@components/PromptLogin";
import RecipeCard from "@components/RecipeCard";
import React from "react";

interface Recipe {
  id: number;
  recipeName: string;
  description: string;
  recipeViews: number;
  author: {
    username: string;
    fullName: string;
    authorFollowers: number;
  };
}

interface Props {
  loading: boolean;
  recipes: Recipe[] | undefined;
  username: string;
}

export default function RecentView(props: Props) {
  function mapData(recipes: Recipe[] | undefined): JSX.Element[] | JSX.Element {
    if (!props.loading && recipes) {
      if (recipes!.length > 0) {
        return recipes!.map((recipe: Recipe) => {
          return (
            <div className="my-2">
              <RecipeCard recipe={recipe} />
            </div>
          );
        });
      } else {
        return <div>No Recipe</div>;
      }
    } else {
      return <div>Loading...</div>;
    }
  }

  return (
    <>
      <div>
        {props.username.length > 0 ? (
          props.loading ? (
            <div>Loading...</div>
          ) : (
            <div className="flex flex-row flex-wrap justify-center">
              {mapData(props.recipes)}
            </div>
          )
        ) : (
          <PromptLogin />
        )}
      </div>
    </>
  );
}
