import React from 'react'
import RecipeCardLong from '../RecipeCardLong'
import Link from 'next/link'

export const DraftRecipeTabs = (props:any) => {
    return (
        <>
            {
                //@ts-ignore
                props.draftRecipeData?.draftRecipesData?.length > 0 ? (
                    //@ts-ignore
                    props.draftRecipeData?.draftRecipesData.map((recipe)=> (
                        //@ts-ignore
                        <RecipeCardLong key={Math.random()*Math.random()} recipe={recipe} isDraft={true} deleteAction={props.deleteRecipe} dataQueryParam={props.dataQueryParam} />
                    ))
                ) : (
                    <p className="p-4 text-center no-recipe-text">
                        You don't have recipe(s) yet, <a href="#" className="transition  bg-gray-800 text-sm text-white hover:bg-gray-600 px-4 py-2 rounded-md ">Create one</a> now!
                    </p>
                )
            }
            {
                //@ts-ignore
                ((props.draftRecipeData?.draftRecipesData?.length > 0) &&  (props.draftRecipeData.isLast !== true)) ?  (
                    <div className="w-full flex items-center my-5">
                        <button onClick={()=> props.loadMoreRecipes("draftRecipe")}  className="mx-auto transition bg-gray-600 hover:bg-gray-500 px-8 font-semibold py-2 rounded-lg text-white">
                            Load more recipes
                        </button>
                    </div>
                ) : (
                    <div className="my-5"></div>
                )
            }
        </>
  )
}
