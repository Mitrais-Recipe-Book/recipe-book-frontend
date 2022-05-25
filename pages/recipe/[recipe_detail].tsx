import Navbar from "@components/Navbar";
import { useRouter } from "next/router";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import TagsPill from "@components/TagsPill";
import Footer from "@components/Footer";
import RecipeCard from "@components/RecipeCard";
import { FiEye, FiHeart, FiThumbsUp } from "react-icons/fi";
import { FaRegBookmark, FaRegSurprise } from "react-icons/fa";
import axios from "axios";

export default function RecipeDetail() {
  interface Recipe {
    id: number;
    title: string;
    overview: string;
    dateCreated: string;
    ingredients: string;
    content: string;
    videoUrl: string;
    views: number;
    author: {
      id: number;
      name: string;
      username: string;
    };
    tags: { id: number; name: string }[];
  }
  interface Ingredients {
    name: string;
    qty: string;
  }
  const router = useRouter();
  const recipeId = router.query.recipe_detail;
  const [recipe, setRecipe] = useState<Recipe | undefined>();
  const [ingredients, setIngredients] = useState<Ingredients | undefined>();

  useEffect(() => {
    axios.get(process.env.API_URL + `recipe/${recipeId}`).then((res) => {
      setRecipe(res.data.payload);
      setIngredients((JSON.parse(res.data.payload.ingredients)));
    });
  }, [recipeId]);
  return (
    <div>
      <Navbar />
      <main className="container mx-auto">
        <div className="px-10 py-5">
          <div className="grid md:grid-cols-3 gap-4">
            <section className="md:col-span-2  mx-4">
              <div className="flex my-2">
                <p className="flex gap-x-2">
                  <FiEye className="self-center" /> {recipe?.views}
                </p>
                <a className="ml-auto">
                  <FaRegBookmark />
                </a>
              </div>
              <Image
                className="object-cover rounded-t"
                src={"/images/bibimbap-image.webp"}
                alt="RecipyBook"
                width={180}
                height={100}
                layout="responsive"
                objectFit="cover"
              />
              <div className="mx-2 my-2 flex gap-2">
                <a>
                  <FiHeart />{" "}
                </a>
                <a>
                  <FiThumbsUp />
                </a>
                <a>
                  <FaRegSurprise />
                </a>
              </div>
              <h1 className="text-center text-4xl font-bold my-4">
                {recipe?.title}
              </h1>
              <div className="flex flex-wrap gap-x-2 justify-center mx-8">
                {recipe?.tags.map((tag) => (
                  <TagsPill key={tag.id} tag={tag} />
                ))}
              </div>
              <h3 className="mx-4 my-2">
                {recipe?.overview}
              </h3>
              <div className="flex flex-col mx-8 my-2">
                <h3 className="ml-8 mb-2 text-lg font-semibold">Ingridients:</h3>
                <p>{
                  //@ts-ignore
                  ingredients?.map((ingredient) => (
                    <div className="flex gap-x-1">
                      <input className="self-center" type="checkbox" name="" id="" />
                      <p>{ingredient.qty}</p>
                      <p>{ingredient.name}</p>
                    </div>
                  ))
                }</p>
              </div>
              <hr className="border-2 border-red-600" />
              <div className="mx-8 my-2">
              <h3 className="ml-8 mb-2 text-lg font-semibold">Steps:</h3>
                <p>{recipe?.content}</p>
              </div>
              <hr className="border-2 border-gray-400" />
              <div className="flex flex-col mx-4 my-2">
                <h2 className="text-2xl">Comment</h2>
              </div>
            </section>
            <section className="col-span-1">
              <div className="flex flex-col justify-center box-border border-2 shadow-lg w-9/10 mx-auto py-10 px-5 my-5">
                <h2 className="text-center mb-10  text-2xl">Content Creator</h2>
                <div className="w-1/2 mx-auto">
                  <Image
                    className="rounded-full"
                    src={"/images/bibimbap-image.webp"}
                    alt="RecipyBook"
                    width={50}
                    height={50}
                    layout="responsive"
                    objectFit="cover"
                  />
                </div>
                <h3 className="text-center my-4  text-3xl">
                  {recipe?.author.name}
                </h3>
                <div className="flex gap-x-2 mx-auto">
                  <p>recipes</p>
                  <p>like</p>
                  <p>followers</p>
                </div>
                <p className="text-center my-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                  repudiandae ea necessitatibus ab, qui, facilis autem illo cum
                  dolor consequuntur neque. Non fugit asperiores commodi quo
                  accusantium! Quidem, unde tempora.
                </p>
                <button className="bg-red-400 hover:bg-red-600 w-20 py-2 rounded-xl mx-auto text-white">
                  Follow
                </button>
              </div>
              <div className="flex flex-col items-center mt-20">
                <h2>More from creator</h2>
                <RecipeCard
                  recipe={{
                    recipeImage: "",
                    recipeName: "Test",
                    description: "Test",
                  }}
                />
                <RecipeCard
                  recipe={{
                    recipeImage: "",
                    recipeName: "Test",
                    description: "Test",
                  }}
                />
                <RecipeCard
                  recipe={{
                    recipeImage: "",
                    recipeName: "Test",
                    description: "Test",
                  }}
                />
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
