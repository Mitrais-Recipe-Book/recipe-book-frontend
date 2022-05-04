import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import RecipeCard from "../../components/RecipeCard";

export default function SearchItem() {
  const router = useRouter();
  const searchItem = router.query.search_item;
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios
      .get(
        //TODO : Ganti API ke search by item
        "https://recipyb-dev.herokuapp.com/api/v1/recipe/list?size=1&page=0&author="
      )
      .then((res) => {
        //@ts-ignore
        console.log(res.data.payload.content);
        //@ts-ignore
        setRecipes(res.data.payload.content);
      });
    }, []);
  
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
            {recipes.map((recipe) => (
                <RecipeCard recipe={recipe} />
              ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
