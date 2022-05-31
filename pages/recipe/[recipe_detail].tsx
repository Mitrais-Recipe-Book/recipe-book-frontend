import Navbar from "@components/Navbar";
import { useRouter } from "next/router";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import TagsPill from "@components/TagsPill";
import Footer from "@components/Footer";
import RecipeCard from "@components/RecipeCard";
import { FiEye, FiHeart, FiThumbsUp } from "react-icons/fi";
import { FaRegBookmark, FaRegSurprise } from "react-icons/fa";
import { BsBookmarkCheck, BsFillBookmarkCheckFill } from "react-icons/bs";
import axios from "axios";
import YouTube from "react-youtube";
import { FollowBtn } from "@components/ProfilePage/FollowBtn";
import { useSession } from "next-auth/react";

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
  interface UserInfo {
    id: number;
    username: string;
    fullName: string;
    totalRecipes: number;
    recipeLikes: number;
    followers: number;
  }
  const router = useRouter();
  const recipeId = router.query.recipe_detail;
  const { data: session }: any = useSession();
  const [isRender, setIsRender] = useState(false);
  const [isExist, setIsExist] = useState(false);
  const [recipe, setRecipe] = useState<Recipe | undefined>();
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [ingredients, setIngredients] = useState<Ingredients[] | undefined>();
  const [recipeImg, setRecipeImg] = useState("");

  useEffect(() => {
    if (recipeId) {
      axios
        .get(process.env.API_URL + `recipe/+${recipeId}`)
        .then((res) => {
          setIsRender(true);
          setIsExist(true);
          setRecipe(res.data.payload);
          try {
            setIngredients(JSON.parse(res.data.payload.ingredients));
          } catch (err) {
            setIngredients([{ name: res.data.payload.ingredients, qty: "" }]);
          }
        })
        .catch((err) => {
          console.log(err.message);
          setIsRender(true);
          setIsExist(false);
        });
      axios
        .get(process.env.API_URL + `recipe/${recipeId}/photo`)
        .then((res) => {
          setRecipeImg(process.env.API_URL + `recipe/${recipeId}/photo`);
        })
        .catch((err) => {
          setRecipeImg("");
        });
    }
  }, [recipeId]);

  useEffect(() => {
    if (recipe) {
      // get youtube video id after ?v= and before&
      const vidLink = "https://www.youtube.com/watch?v=FqaRCz2IMJY";
      // const videoId = recipe?.videoUrl?.split("?v=")[1].split("&")[0];
      const videoId = vidLink.split("?v=")[1].split("&")[0];

      setRecipe({
        ...recipe,
        videoUrl: videoId,
      });
    }
  }, [recipe]);
  return (
    <div>
      <Navbar />
      <main className="container mx-auto">
        {isRender && isExist && (
          <div className="px-10 py-5">
            <div className="grid md:grid-cols-3 gap-4">
              <section className="md:col-span-2  mx-4">
                <div className="flex my-2">
                  <p className="flex gap-x-2">
                    <FiEye className="self-center" /> {recipe?.views}
                  </p>
                  <a className="ml-auto">
                    <BsFillBookmarkCheckFill
                      id="bookmark"
                      className="fill-slate-400"
                      onClick={() => {
                        document
                          .getElementById("bookmark")
                          ?.classList.toggle("fill-red-600");
                      }}
                    />
                  </a>
                </div>
                <Image
                  className="object-cover rounded-t"
                  src={recipeImg ? recipeImg : "/images/bibimbap-image.webp"}
                  alt="RecipyBook"
                  width={180}
                  height={100}
                  layout="responsive"
                  objectFit="cover"
                />
                <div className="mx-2 my-2 flex gap-2">
                  <a
                    onClick={() => {
                      document
                        .getElementById("fav-button")
                        ?.classList.toggle("fill-red-700");
                    }}
                  >
                    <FiHeart id="fav-button" />
                  </a>
                  <a
                    onClick={() => {
                      document
                        .getElementById("like-button")
                        ?.classList.toggle("fill-blue-200");
                    }}
                  >
                    <FiThumbsUp id="like-button" />
                  </a>
                  <a
                    onClick={() => {
                      document
                        .getElementById("surprise-button")
                        ?.classList.toggle("fill-yellow-700");
                    }}
                  >
                    <FaRegSurprise id="surprise-button" />
                  </a>
                </div>
                <h1 className="text-center text-4xl font-bold my-4 break-words">
                  {recipe?.title}
                </h1>
                <div className="flex flex-wrap gap-x-2 justify-center mx-8">
                  {recipe?.tags.map((tag) => (
                    <TagsPill key={tag.id} tag={tag} />
                  ))}
                </div>
                <div
                  className="
                    w-8/12
                    mx-auto
                    h-80
                "
                >
                  <YouTube
                    className="w-full
                    h-full
                    "
                    videoId={recipe?.videoUrl ? recipe?.videoUrl : ""}
                    opts={{
                      height: "100%",
                      width: "100%",
                      playerVars: {
                        autoplay: 0,
                      },
                    }}
                  />
                </div>
                <h3 className="mx-4 my-2 break-words">{recipe?.overview}</h3>
                <div className="flex flex-col mx-8 my-2">
                  <h3 className="ml-8 mb-2 text-lg font-semibold">
                    Ingredients:
                  </h3>
                  <p>
                    {
                      //@ts-ignore
                      ingredients?.map((ingredient) => (
                        <div id={ingredient.name} className="flex gap-x-1">
                          <input
                            className="self-center"
                            type="checkbox"
                            onChange={(e) => {
                              e.target.checked
                                ? document
                                    .getElementById(ingredient.name)
                                    ?.classList.add("line-through")
                                : document
                                    .getElementById(ingredient.name)
                                    ?.classList.remove("line-through");
                            }}
                          />
                          <p className="break-words">{ingredient.qty}</p>
                          <p className="break-all">{ingredient.name}</p>
                        </div>
                      ))
                    }
                  </p>
                </div>
                <hr className="border-2 border-red-600" />
                <div className="mx-8 my-2">
                  <h3 className="ml-8 mb-2 text-lg font-semibold">Steps:</h3>
                  <div
                    className="stepsStyle break-words"
                    dangerouslySetInnerHTML={{
                      __html: recipe?.content ? recipe?.content : "",
                    }}
                  ></div>
                </div>
                <hr className="border-2 border-gray-400" />
                <div className="flex flex-col mx-4 my-2">
                  <h2 className="text-2xl">Comment</h2>
                </div>
              </section>
              <section className="col-span-1">
                <div className="flex flex-col justify-center box-border border-2 shadow-lg w-9/10 mx-auto py-10 px-5 my-5">
                  <h2 className="text-center mb-10  text-2xl">
                    Content Creator
                  </h2>
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
                    repudiandae ea necessitatibus ab, qui, facilis autem illo
                    cum dolor consequuntur neque. Non fugit asperiores commodi
                    quo accusantium! Quidem, unde tempora.
                  </p>
                  <FollowBtn session={session} creatorId={recipe?.author?.id} />
                </div>
                <div className="flex flex-col items-center mt-20">
                  <h2>More from creator</h2>
                  <RecipeCard
                    recipe={{
                      id: 1,
                      recipeName: "Test",
                      description: "Test",
                    }}
                  />
                  <RecipeCard
                    recipe={{
                      id: 1,
                      recipeName: "Test",
                      description: "Test",
                    }}
                  />
                  <RecipeCard
                    recipe={{
                      id: 1,
                      recipeName: "Test",
                      description: "Test",
                    }}
                  />
                </div>
              </section>
            </div>
          </div>
        )}
        {isRender && !isExist && (
          <div className="flex justify-center my-10">No Recipe Found</div>
        )}
        {!isRender && (
          <div className="flex justify-center my-10">Fetching data..</div>
        )}
      </main>
      <Footer />
      <style>
        {`
          .stepsStyle * {
            font-size: revert !important;
          }
          .public-DraftStyleDefault-ol {
            list-style-type: decimal !important;
            margin-left: 20px !important;
          }
          .public-DraftStyleDefault-ul {
            list-style: inherit !important;
            margin-left: 20px !important;
          }
        `}
      </style>
    </div>
  );
}
