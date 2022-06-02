import { useRouter } from "next/router";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FiEye, FiHeart, FiThumbsUp } from "react-icons/fi";
import { FaRegSurprise } from "react-icons/fa";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import axios from "axios";
import YouTube from "react-youtube";
import { FollowBtn } from "@components/ProfilePage/FollowBtn";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@components/Navbar"));
const Footer = dynamic(() => import("@components/Footer"));
const TagsPill = dynamic(() => import("@components/TagsPill"), {
  loading: () => <div>Loading Tags...</div>,
});
const RecipeCard = dynamic(() => import("@components/RecipeCard"), {
  loading: () => <div>Loading Recipe...</div>,
});
export default function RecipeDetail() {
  interface Recipe {
    id: number;
    title: string;
    overview: string;
    dateCreated: string;
    ingredients: string;
    content: string;
    videoURL: string;
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
  const [otherRecipes, setOtherRecipes] = useState<Recipe[] | undefined>();
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [ingredients, setIngredients] = useState<Ingredients[] | undefined>();
  const [recipeImg, setRecipeImg] = useState("");

  useEffect(() => {
    if (recipeId) {
      axios
        .get(process.env.API_URL + `recipe/+${recipeId}`)
        .then((res) => {
          try {
            res.data.payload.videoURL = res.data.payload.videoURL
              .split("?v=")[1]
              .split("&")[0];
          } catch (error) {
            res.data.payload.videoURL = null;
          }
          setIsRender(true);
          setIsExist(true);
          setRecipe(res.data.payload);

          try {
            setIngredients(JSON.parse(res.data.payload.ingredients));
          } catch (err) {
            setIngredients([{ name: res.data.payload.ingredients, qty: "" }]);
          }
          let username = res.data.payload.author.username;
          axios.get(process.env.API_URL + `user/${username}`).then((res) => {
            setUserInfo(res.data.payload);
          });
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
    axios
      .get(process.env.API_URL + `user/${recipe?.author.username}/recipes`)
      .then((res) => {
        setOtherRecipes(res.data.payload.data);
      });
  }, [recipe]);

  return (
    <>
      <Navbar />
      <main className="container mx-auto">
        {isRender && isExist && (
          <div className="px-10 py-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <section className="col-span-1 md:col-span-2  mx-4">
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

                {recipe?.videoURL && (
                  <div className=" w-8/12 mx-auto h-80">
                    <YouTube
                      className="w-full h-full"
                      videoId={recipe?.videoURL ? recipe?.videoURL : ""}
                      opts={{
                        height: "100%",
                        width: "100%",
                        playerVars: {
                          autoplay: 0,
                        },
                      }}
                    />
                  </div>
                )}

                <h3 className="mx-4 my-2 break-words">{recipe?.overview}</h3>
                <div className="flex flex-col mx-8 my-2">
                  <h3 className="ml-8 mb-2 text-lg font-semibold">
                    Ingredients:
                  </h3>
                  <p>
                    {ingredients?.map((ingredient) => (
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
                    ))}
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
                      className="rounded-full cursor-pointer"
                      src={"/images/bibimbap-image.webp"}
                      alt="RecipyBook"
                      width={50}
                      height={50}
                      layout="responsive"
                      objectFit="cover"
                      onClick={() => {
                        router.push(`/profile/${userInfo?.username}`);
                      }}
                    />
                  </div>
                  <h3
                    className="text-center my-4 text-3xl cursor-pointer"
                    onClick={() => {
                      router.push(`/profile/${userInfo?.username}`);
                    }}
                  >
                    {userInfo?.fullName}
                  </h3>
                  <div className="flex gap-x-2 mx-auto">
                    <p className="text-center">
                      {userInfo?.totalRecipes} recipes
                    </p>
                    <p className="text-center">{userInfo?.recipeLikes} likes</p>
                    <p className="text-center">
                      {userInfo?.followers} followers
                    </p>
                  </div>
                  <p className="text-center my-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                    repudiandae ea necessitatibus ab, qui, facilis autem illo
                    cum dolor consequuntur neque. Non fugit asperiores commodi
                    quo accusantium! Quidem, unde tempora.
                  </p>
                  <FollowBtn session={session} creatorId={userInfo?.id} />
                </div>
                <div className="grid grid-cols-1 justify-center mt-20">
                  <h2 className="font-bold text-center text-2xl mb-4">
                    More from creator
                  </h2>
                  <div className="  flex flex-wrap justify-center">
                    {otherRecipes?.map((recipe) => {
                      const toRecipeCard = {
                        recipeName: recipe.title,
                        id: recipe.id,
                        description: recipe.overview,
                      };
                      return (
                        <div className="w-40 sm:w-auto">
                          <RecipeCard recipe={toRecipeCard} key={recipe.id} />
                        </div>
                      );
                    })}
                  </div>
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
    </>
  );
}
