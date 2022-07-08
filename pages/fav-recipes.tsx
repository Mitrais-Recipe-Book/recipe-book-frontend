import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
import RecipeCardLong from "@components/RecipeCardLong";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

interface Recipe {
  id: number;
  title: string;
  overview: string;
  authorName: string;
  viewCount: number;
  dateCreated: string;
  tags: Tag[];
}
interface Tag {
  id: number;
  name: string;
}

export default function favrecipes() {
  const { data: session }: any = useSession();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLastPage, setIsLastPage] = useState<boolean>();
  const [page, setPage] = useState<number>(0);
  useEffect(() => {
    loadMore();
  }, [session]);

  function loadMore() {
    if (session) {
      axios
        .get(
          process.env.API_URL +
            `user/${session?.user.username}/favorite-recipe?isPaginated=true&page=${page}&size=10`
        )
        .then((res) => {
          setRecipes([...recipes, ...res.data.payload.data]);
          setIsLastPage(res.data.payload.islast);
          setPage(page + 1);
        });
    }
  }
  return (
    <div>
      <Navbar />
      <main className="container mx-auto pt-1">
        <h1 className="text-5xl my-5 text-center">Your Favorite Recipes</h1>
        <div className="container w-3/4 mx-auto pt-1">
          {recipes?.map((recipe) => (
            <RecipeCardLong
              recipe={recipe}
              dataQueryParam={true}
              isFavorite={true}
            />
          ))}
          <div className="flex place-content-center">
            <button
              className="bg-red-600 hover:bg-red-700 disabled:bg-gray-500 text-white font-bold py-2 px-4 rounded"
              disabled={isLastPage}
              onClick={() => {
                loadMore();
              }}
            >
              {isLastPage ? "No more recipe" : "Load more"}
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
