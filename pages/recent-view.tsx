import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
import RecipeCard from "@components/RecipeCard";
import React from "react";

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

export default function recentview() {
  const recipeDummy = {
    id: 1,
    recipeName: "Es Teh Anget (edit)",
    description: "Enak diminum untuk buka puasa",
    recipeViews: 108,
    author: {
      username: "user1",
      fullName: "rick",
      authorFollowers: 10,
    },
  };
  return (
    <>
      <Navbar />
      <main className="container mx-auto pt-1">
        <div>
          <RecipeCard recipe={recipeDummy} />
        </div>
      </main>
      <Footer />
    </>
  );
}
