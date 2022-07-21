import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
import PromptLogin from "@components/PromptLogin";
import RecipeCard from "@components/RecipeCard";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

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

interface Session {
  expires: string;
  user: {
    id: number;
    username: string;
    fullName: string;
    email: string;
    roles: string[];
  };
}

export default function recentview() {
  const { data: session }: any = useSession();
  const [recipes, setRecipes] = useState<Recipe[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      fetchData();
    }
  }, [session]);

  function fetchData() {
    axios
      .get(
        `${process.env.API_URL}recipe/viewed?username=${session?.user.username}&isPaginated=false&page=0&size=10`
      )
      .then((res) => {
        setRecipes(res.data.payload.data);
        setLoading(false);
      });
  }

  function mapData(recipes: Recipe[] | undefined): JSX.Element[] | JSX.Element {
    if (recipes) {
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
    }
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <main className="w-3/4 mx-auto pt-1">
        <div>
          {session ? (
            loading ? (
              <div>Loading...</div>
            ) : (
              <div className="flex flex-row flex-wrap justify-center">
                {mapData(recipes)}
              </div>
            )
          ) : (
            <PromptLogin />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
