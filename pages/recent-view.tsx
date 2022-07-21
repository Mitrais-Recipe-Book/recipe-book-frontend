import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
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
      return recipes!.map((recipe: Recipe) => {
        return <RecipeCard recipe={recipe} />;
      });
    } else {
      return <div>No Recipes</div>;
    }
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto pt-1">
        <div>{loading ? <div>Loading...</div> : mapData(recipes)}</div>
      </main>
      <Footer />
    </>
  );
}
