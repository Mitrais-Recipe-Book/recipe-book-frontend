import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import RecipeCard from "../../components/RecipeCard";

export default function index() {
  const router = useRouter();
  const searchItem = router.query.search_item;
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios
      .get(
        //TODO : Ganti API ke search by item
        `https://recipyb-dev.herokuapp.com/api/v1/recipe/search?title=${searchItem}&author=&tagId=&page=0`
      )
      .then((res: any) => {
        //@ts-ignore
        console.log("resep=", res.data.payload.content);
        //@ts-ignore
        setRecipes(res.data.payload.content);
      });
  }, [searchItem]);
  return (
    <div>
      <Navbar />
      <main className="container mx-auto pt-2">
        <section>
          <h1 className="text-4xl text-center pb-3 font-bold">
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
            {recipes.length ? (
              recipes.map((recipe) => <RecipeCard recipe={recipe} />)
            ) : (
              <h1 className="text-xl text-center">No Recipe Found</h1>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
