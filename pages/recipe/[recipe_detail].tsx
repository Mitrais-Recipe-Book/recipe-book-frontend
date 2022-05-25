import Navbar from "@components/Navbar";
import { useRouter } from "next/router";
import Image from "next/image";
import React from "react";
import TagsPill from "@components/TagsPill";
import Footer from "@components/Footer";
import RecipeCard from "@components/RecipeCard";
import { FiEye, FiHeart, FiThumbsUp } from "react-icons/fi";
import { FaRegBookmark, FaRegSurprise } from "react-icons/fa";

export default function RecipeDetail() {
  const router = useRouter();
  const recipe = router.query.recipe_detail;
  return (
    <div>
      <Navbar />
      <main className="container mx-auto">
        <div className="px-10 py-5">
          <div className="grid md:grid-cols-3 gap-4">
            <section className="md:col-span-2  mx-4">
              <div className="flex my-2">
                <p className="flex gap-x-2"><FiEye /> 100 </p>
                <a className="ml-auto"><FaRegBookmark /></a>
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
                <a><FiHeart /> </a>
                <a><FiThumbsUp /></a>
                <a><FaRegSurprise /></a>
              </div>
              <h1 className="text-center text-4xl font-bold my-4">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam nemo ad dolorum adipisci nihil, aspernatur dicta asperiores temporibus eos amet deleniti rem ratione officia nesciunt, distinctio sed optio esse minus.</h1>
              <div className="flex flex-wrap gap-x-2 justify-center mx-8">
                <TagsPill tag={{ name: "tags" }} />
                <TagsPill tag={{ name: "tags" }} />
                <TagsPill tag={{ name: "tags" }} />
                <TagsPill tag={{ name: "tags" }} />
                <TagsPill tag={{ name: "tags" }} />
                <TagsPill tag={{ name: "tags" }} />
                <TagsPill tag={{ name: "tags" }} />
                <TagsPill tag={{ name: "tags" }} />
                <TagsPill tag={{ name: "tags" }} />
              </div>
              <h3 className="mx-4 my-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
                hic, ratione asperiores quos voluptatibus ea commodi a velit
                fugit ad numquam sit delectus repellat nostrum rerum architecto
                et perferendis! Consequatur.
              </h3>
              <div className="flex flex-col mx-8 my-2">
                <h3>Ingridients</h3>
                <p>list</p>
              </div>
              <hr className="border-2 border-red-600" />
              <div className="mx-8 my-2">
                <h3>Steps</h3>
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
                <h3 className="text-center my-4  text-3xl">Lorem ipsum dolor sit.</h3>
                <div className="flex gap-x-2 mx-auto">
                  <p>recipes</p>
                  <p>like</p>
                  <p>followers</p>
                </div>
                <p className="text-center my-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut repudiandae ea necessitatibus ab, qui, facilis autem illo cum dolor consequuntur neque. Non fugit asperiores commodi quo accusantium! Quidem, unde tempora.</p>
                <button className="bg-red-400 hover:bg-red-600 w-20 py-2 rounded-xl mx-auto text-white">Follow</button>
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
