import { useRouter } from "next/router";
import React from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import RecipeCard from "../../components/RecipeCard";

export default function SearchItem() {
  const router = useRouter();
  const searchItem = router.query.search_item;
  return (
    <div>
      <Navbar />
      <main className="container mx-auto pt-1">
        <section>
          <h1 className="text-4xl text-center mb-3 font-bold">
            Searching Recipes: <a className="text-orange-500">{searchItem}</a>
          </h1>
        </section>
        <section className="w-full my-2">
          <div
            className="
                flex
                flex-wrap
                justify-center
              "
          >
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
