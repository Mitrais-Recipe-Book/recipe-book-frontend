import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
import RecipeCard from "@components/RecipeCard";
import SearchByCreator from "@components/Search/SearchByCreator";
import SearchByName from "@components/Search/SearchByName";
import SearchByTags from "@components/Search/SearchByTags";
import { sendQuery } from "@redux/reducers/queryReducer";

export default function SearchItem() {
  const dispatch = useDispatch();
  const recipes = useSelector((state: any) => state.query.queryRecipes);

  return (
    <div className="bg-slate-100">
      <Navbar />
      <main className="grid grid-cols-12 container mx-auto pt-2 justify-center ">
        <section className="col-span-3 hidden sm:block">
          <div className="bg-white mr-8 px-4 py-10 border-b-2 shadow">
            Advanced Search
          </div>
        </section>
        <section className="col-span-12 sm:col-span-9 sm:mb-4 flex place-content-center rounded">
          <SearchByName />
        </section>
        <section className="col-span-12 sm:col-span-3 sm:mr-8">
          <div className="flex place-content-center mb-2">
            <SearchByTags />
          </div>
          <div className="flex place-content-center">
            <SearchByCreator />
          </div>
          <div className="sm:hidden flex place-content-center">
            <button
              className="bg-white rounded hover:bg-orange-300 w-3/4 h-8 text-black px-2 py-1 font-extrabold shadow"
              //@ts-ignore
              onClick={() => dispatch(sendQuery())}
            >
              Search
            </button>
          </div>
        </section>
        <section className="col-span-9 sm:flex sm:flex-wrap grid grid-cols-2 place-content-center mx-auto">
          {recipes.length ? (
            recipes.map((recipe: any) => <RecipeCard recipe={recipe} />)
          ) : (
            <h1 className="text-2xl place-self-center text-center">
              No Recipe Found
            </h1>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
