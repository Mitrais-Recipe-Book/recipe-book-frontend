import Navbar from "@components/Navbar";
import { useRouter } from "next/router";
import Image from "next/image";
import React from "react";
import TagsPill from "@components/TagsPill";
import Footer from "@components/Footer";
import RecipeCard from "@components/RecipeCard";

export default function RecipeDetail() {
  const router = useRouter();
  const recipe = router.query.recipe_detail;
  return (
    <div>
      <Navbar />
      <main className="container mx-auto">
        <div className="px-10 py-5">
          <div className="grid grid-cols-3 gap-4">
            <section className="col-span-2  mx-4">
              <div className="flex">
                <p>Views</p>
                <p className="ml-auto">Bookmark</p>
              </div>
              <Image
                className="object-cover h-38 w-96 rounded-t"
                src={"/images/bibimbap-image.webp"}
                alt="RecipyBook"
                width={200}
                height={100}
                layout="responsive"
                objectFit="cover"
              />
              <div className="mx-2 flex gap-2">
                <p>fav</p>
                <p>like</p>
                <p>reaction</p>
              </div>
              <h1 className="text-center text-4xl my-4">Title</h1>
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
                <h2>Comment</h2>
              </div>
            </section>
            <section className="col-span-1">
              <div className="flex flex-col justify-center">
                <h2 className="text-center my-4">ContentCreator</h2>
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
                <h3 className="text-center">Creator name</h3>
                <div className="flex gap-x-2 mx-auto">
                  <p>recipes</p>
                  <p>like</p>
                  <p>followers</p>
                </div>
                <p className="text-center my-4">BIO</p>
                <button>Follow</button>
              </div>
              <div className="flex flex-col ">
                <h2>More from crator</h2>
                <RecipeCard recipe={{ 
                  recipeImage: "", 
                  recipeName: "Test",
                  description: "Test",
                  }} />
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
