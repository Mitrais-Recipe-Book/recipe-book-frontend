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
  const [recipes, setRecipes] = useState<Recipe[]>();
  const [isLastPage, setIsLastPage] = useState<Boolean>();
  const [page, setPage] = useState<Number>();
  useEffect(() => {
    if (session) {
      axios
        .get(
          process.env.API_URL +
            `user/${session?.user.username}/favorite-recipe?isPaginated=true&page=0&size=10`
        )
        .then((res) => {
          setRecipes(res.data.payload.data);
          setIsLastPage(res.data.payload.islast);
          setPage(res.data.payload.currentPage);
        });
    }
  }, [session]);
  return (
    <div>
      <Navbar />
      <main className="container mx-auto pt-1">
        <div className="container w-3/4 mx-auto pt-1">
          {recipes?.map((recipe) => (
            <RecipeCardLong
              recipe={recipe}
              dataQueryParam={true}
              isFavorite={true}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
