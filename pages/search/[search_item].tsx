import { useRouter } from "next/router";
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
  const router = useRouter();
  const searchItem = router.query.search_item;
  const recipes = useSelector((state: any) => state.query.queryRecipes);

  return (
    <div>
      <Navbar />
      <main className="flex flex-col container mx-auto pt-2 justify-center">
        <section className="flex place-content-center rounded">
          <SearchByName />
        </section>
        <section className="sm:flex sm:justify-center">
          <section className="grid grid-cols-1 sm:grid-cols-4 sm:w-3/4 my-2">
            <section className="flex gap-y-2 flex-col-reverse place-content-start my-3">
              <div className="sm:hidden flex place-content-center">
                <button
                  className="bg-yellow-500 rounded w-3/4 h-8 text-black px-2 py-1 font-extrabold"
                  //@ts-ignore
                  onClick={() => dispatch(sendQuery())}
                >
                  Search
                </button>
              </div>
              <div className="flex place-content-center">
                <SearchByTags />
              </div>
              <div className="flex place-content-center ">
                <SearchByCreator />
              </div>
            </section>

            <section className="col-span-3 flex flex-wrap justify-center">
              {recipes.length ? (
                recipes.map((recipe: any) => <RecipeCard recipe={recipe} />)
              ) : (
                <h1 className="text-2xl place-self-center text-center">
                  No Recipe Found
                </h1>
              )}
            </section>
          </section>
        </section>
      </main>
      <Footer />
    </div>
  );
}
