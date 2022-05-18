import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RecipeCard from "../components/RecipeCard";
import RecipeCardFull from "../components/RecipeCardFull";
import TagsPill from "../components/TagsPill";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import SwiperCore, { Autoplay } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getTags, clearQuery } from "../redux/reducers/queryReducer";
import session from "redux-persist/lib/storage/session";

const Home: NextPage = () => {
  // const auth = useSelector((state) =>
  // @ts-ignore
  //   state.auth.value ? state.auth.value : []
  // );
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [popularRecipes, setPopularRecipes] = useState<Recipe[]>([]);
  // const [tags, setTags] = useState<Tag[]>([]);
  //@ts-ignore
  const tags: Tag[] = useSelector((state) => state.query.allTags? state.query.allTags : []);
  const dispatch = useDispatch();
  //@ts-ignore
  // console.log("query tags: ", useSelector((state) => state.tags.queryTags));

  interface Recipe {
    recipeName: string;
    description: string;
    recipeImage: string;
    recipeViews: number;
    author: string;
    authorImage: string;
    authorFollower: number;
  }

  interface Tag {
    id: number;
    name: string;
  }

  function fetchData() {
    axios
      .get<Recipe[]>(
        "https://recipyb-dev.herokuapp.com/api/v1/recipe/discover?limit=10"
      )
      .then((res) => {
        //@ts-ignore
        // console.log(res.data.payload);
        //@ts-ignore
        setRecipes(res.data.payload);
      });
    axios
      .get<Recipe[]>(
        "https://recipyb-dev.herokuapp.com/api/v1/recipe/popular?limit=5"
      )
      .then((res) => {
        //@ts-ignore
        // console.log("Popular: ", res.data.payload);
        //@ts-ignore
        setPopularRecipes(res.data.payload);
      });
    //@ts-ignore
    dispatch(getTags());
    dispatch(clearQuery());
    
  }

  useEffect(() => {
    fetchData();
    console.log("tags:",tags)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  SwiperCore.use([Autoplay]);
  return (
    <div>
      <Head>
        <title>Recipy - Create and Share Recipes</title>
        <meta
          name="description"
          content="
        Recipy is a web application that allows you to create and share recipes.
        "
        />
        <link rel="icon" href="/images/bibimbap192x192.png" />
      </Head>

      <style>
        {`
          .swiper-button-prev,
          .swiper-button-next {
              background-color: #fff;
              color: rgb(39 39 42);
              width: 48px;
              height: 48px;
              border-radius: 50%;
              box-shadow: 0px 1px 24px rgba(0, 0, 0, 0.1);
              transition: 0.2s ease-in-out;
          }
          
          .swiper-button-prev:hover,
          .swiper-button-next:hover {
              background-color: rgb(39 39 42);
              color: #fff;
              transition: 0.2s ease-in-out;
          }
          
          .swiper-button-next:after,
          .swiper-button-prev:after {
              font-size: 16px;
              font-weight: 600;
          }          
        `}
      </style>

      <Navbar />
      {/* @ts-ignore */}
      <h1>{session.user ? session.user.name : ""}</h1>
      {/* @ts-ignore */}
      <h1>{session.user ? session.user.roles[0] : ""}</h1>
      <main className="container mx-auto pt-1">
        <div className="container md:px-[50px] lg:px-[100px] xl:px-[150px]">
          {/* Carousel */}
          <section className="my-5 ">
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              spaceBetween={50}
              slidesPerView={1}
              navigation={true}
              pagination={{ clickable: true }}
            >
              <SwiperSlide>
                {/* <Image
                  layout="responsive"
                  className="w-full rounded-md cursor-pointer"
                  src="/images/bibimbap-image.webp"
                  alt="RecipyBook"
                  width={100}
                  height={35}
                  objectFit="cover"
                /> */}
                <div
                  className="w-full h-[18rem] sm:h-[20rem] xl:h-[24rem] flex rounded-lg bg-gradient-to-r  from-blue-500 to-transparent"
                  style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(117, 19, 93, 0.73)), url('/images/bibimbap-image.webp')`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                >
                  <div className="m-auto">
                    <h1 className="text-2xl md:text-5xl font-bold text-white ">
                      Bibimbap
                    </h1>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div
                  className="w-full h-[18rem] sm:h-[20rem] xl:h-[24rem] flex rounded-lg bg-gradient-to-r  from-blue-500 to-transparent"
                  style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(117, 19, 93, 0.73)), url('/images/bibimbap-image.webp')`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                >
                  <div className="m-auto">
                    <h1 className="text-2xl md:text-5xl font-bold text-white ">
                      Bibimbap 2
                    </h1>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div
                  className="w-full h-[18rem] sm:h-[20rem] xl:h-[24rem] flex rounded-lg bg-gradient-to-r  from-blue-500 to-transparent"
                  style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(117, 19, 93, 0.73)), url('/images/bibimbap-image.webp')`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                >
                  <div className="m-auto">
                    <h1 className="text-2xl md:text-5xl font-bold text-white ">
                      Bibimbap 3
                    </h1>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div
                  className="w-full h-[18rem] sm:h-[20rem] xl:h-[24rem] flex rounded-lg bg-gradient-to-r  from-blue-500 to-transparent"
                  style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(117, 19, 93, 0.73)), url('/images/bibimbap-image.webp')`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                >
                  <div className="m-auto">
                    <h1 className="text-2xl md:text-5xl font-bold text-white ">
                      Bibimbap 4
                    </h1>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </section>

          {/* Recipes of the day */}
          <section className="my-5">
            <h1 className="text-4xl text-center mb-3 font-bold">
              Recipes of the day
            </h1>
            <Swiper
              modules={[Navigation, A11y]}
              spaceBetween={30}
              navigation={true}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
            >
              {popularRecipes.map((recipe) => {
                return (
                  <SwiperSlide>
                    <RecipeCardFull recipe={recipe} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </section>

          {/* Tags */}
          <section className="my-5 py-3 rounded-md bg-white drop-shadow-lg">
            <h1 className="text-4xl text-center mb-3 font-bold">Tags</h1>
            <div className="flex flex-wrap w-full md:w-3/4 mx-auto justify-center pb-3">
              {tags.map((tag) => {
                return (
                  <TagsPill tag={tag} />
                );
              })}
              
            </div>
          </section>

          {/* Discover recipes */}
          <section className="w-full my-2">
            <h1 className="text-4xl text-center mb-3 font-bold">Discover</h1>
            <div
              className="
                flex
                flex-wrap
                justify-center
              "
            >
              {recipes.map((recipe) => (
                <RecipeCard recipe={recipe} />
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
