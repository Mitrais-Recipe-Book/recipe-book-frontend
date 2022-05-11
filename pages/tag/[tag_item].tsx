import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import RecipeCard from "../../components/RecipeCard";
import TagsPill from "../../components/TagsPill";

export default function TagItem() {
  const router = useRouter();
  const searchTag = String(router.query.tag_item).split("&");
  const [recipes, setRecipes] = useState([]);
  // const [tags, setTags] = useState<Tag[]>([]);
  const tags = useSelector((state: reduxStore) => state.tags.allTags);

  interface reduxStore {
    tags: {
      allTags: Tag[];
    };
  }
  interface Tag {
    id: number;
    name: string;
  }

  useEffect(() => {
    if (router.isReady) {
      // axios
      //   .get<Tag[]>("https://recipyb-dev.herokuapp.com/api/v1/tag")
      //   .then((res) => {
      //     //@ts-ignore
      //     console.log("Tags: ", res.data.payload);
      //     //@ts-ignore
      //     setTags(res.data.payload);
      //   });
      axios
        .get(
          `https://recipyb-dev.herokuapp.com/api/v1/recipe/search?title=&author=&tagId=${searchTag[0]}&page=0`
        )
        .then((res) => {
          //@ts-ignore
          console.log("resep=", res.data.payload.content);
          //@ts-ignore
          setRecipes(res.data.payload.content);
        });
    }
  }, [router.isReady, searchTag[0]]);

  return (
    <div>
      <Navbar />
      <main className="container mx-auto pt-2">
        <section>
          <h1 className="text-4xl text-center pb-3 font-bold">
            Searching Recipes Tag:{" "}
            <a className="text-orange-500">{searchTag[1]}</a>
          </h1>
        </section>
        <section className="my-5 py-3 rounded-md bg-white drop-shadow-lg">
          <h1 className="text-xl text-center mb-3 font-bold">
            Browse Other Tags:
          </h1>
          <div className="flex flex-wrap w-full md:w-3/4 mx-auto justify-center pb-3">
            {tags.map((tag) => {
              return <TagsPill tag={tag} />;
            })}
          </div>
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
              <h1 className="text-xl text-center">No Recipe With This Tag</h1>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
