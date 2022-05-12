import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import RecipeCard from "../../components/RecipeCard";
import TagsPill from "../../components/TagsPill";

export default function TagItem() {
  const recipes = useSelector((state: reduxStore) => state.tags.queryRecipes);
  const tags = useSelector((state: reduxStore) => state.tags.allTags);
  const activeTags = useSelector((state: reduxStore) => state.tags.queryTags);

  interface reduxStore {
    tags: {
      allTags: Tag[];
      queryTags: Set<number>;
      queryRecipes: [];
    };
  }
  interface Tag {
    id: number;
    name: string;
  }


  return (
    <div>
      <Navbar />
      <main className="container mx-auto pt-2">
        <section>
          <h1 className="text-4xl text-center pb-3 font-bold">
            Searching Recipes By Tag:{" "}
          </h1>
        </section>
        <section className="my-5 py-3 rounded-md bg-white drop-shadow-lg">
          <div className="flex flex-wrap w-full md:w-3/4 mx-auto justify-center pb-3">
            {tags.map((tag) => {
              return <TagsPill tag={tag} />;
            })}
          </div>
        </section>
        <section className="w-full my-2">
          <div
            className="
                flex
                flex-wrap
                justify-center
              "
          >
            {recipes.length > 0 ? (
              recipes.map((recipe) => <RecipeCard recipe={recipe} />)
            ) : (
              <h1 className="text-xl text-center">No Recipe With This Tag</h1>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
