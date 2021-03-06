import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Head from "next/head";
import Navbar from "@components/Navbar";
import Footer from "../components/Footer";
import RecipeCard from "../components/RecipeCard";
import RecipeCardFull from "../components/RecipeCardFull";
import TagsPill from "../components/TagsPill";
import { useSession } from "next-auth/react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Autoplay } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getTags, clearQuery } from "../redux/reducers/queryReducer";
import RecentView from "@components/RecentView";
import RecipeCarousel  from "@components/RecipeCarousel";

const Home: NextPage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [popularRecipes, setPopularRecipes] = useState<Recipe[]>([]);
  const [recentView, setRecentView] = useState<Recipe[] | undefined>();
  const [recentViewLoading, setRecentViewLoading] = useState(true);
  const [user, setUser] = useState("");
  //@ts-ignore
  const tags: Tag[] = useSelector((state: State) =>
    state.query.allTags ? state.query.allTags : []
  );
  const dispatch = useDispatch();

  const { data: session }: any = useSession();

  interface State {
    query: {
      allTags: Tag[];
    };
  }
  interface Recipe {
    id: number;
    recipeName: string;
    description: string;
    recipeImage: string;
    recipeViews: number;
    author: {
      username: string;
      fullName: string;
      authorFollowers: number;
    };
  }

  interface Tag {
    id: number;
    name: string;
  }

  function fetchData() {
    axios.get(`${process.env.API_URL}recipe/discover?limit=10`).then((res) => {
      setRecipes(res.data.payload);
    });
    axios.get(`${process.env.API_URL}recipe/popular?limit=5`).then((res) => {
      setPopularRecipes(res.data.payload);
    });
    //@ts-ignore
    dispatch(getTags());
    dispatch(clearQuery());
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (session) {
      fetchRecentView();
      setUser(session.user.username);
    }
  }, [session]);

  function fetchRecentView() {
    axios
      .get(
        `${process.env.API_URL}recipe/viewed?username=${session?.user?.username}&isPaginated=false&page=0&size=10`
      )
      .then((res) => {
        setRecentView(res.data.payload.data);
        setRecentViewLoading(false);
      });
  }

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
      <main className="container mx-auto pt-1">
        <div className="container md:px-[50px] lg:px-[100px] xl:px-[150px]">
          {/* Carousel */}
          <section className="my-5 pb-4">
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              loop={true}
              spaceBetween={50}
              slidesPerView={1}
              navigation={true}
              pagination={{ clickable: true }}
            >
            {
              popularRecipes.map((recipe) => {
                return (
                  <SwiperSlide>
                    <RecipeCarousel key={Math.random()*Math.random()} recipeData={recipe}/>
                  </SwiperSlide>
                );
              })
            }
            </Swiper>
          </section>

          {/* Recipes of the day */}
          {
            recentView !== undefined && recentView?.length > 0 ? (
              <section className="my-5">
                <h1 className="text-3xl text-center mb-3 font-bold">
                  Your last Recent view recipes
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
                  {recentView.map((recipe) => {
                    return (
                      <SwiperSlide>
                        <RecipeCardFull recipe={recipe} />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </section>
            ) : (
              <div className=""></div>
            )
          }
          {/* Recent View */}
          {/* <section className="my-5 py-3">
            <h1 className="text-4xl text-center mb-3 font-bold">Recent View</h1>
            <div className="flex flex-wrap w-full md:w-3/4 mx-auto justify-center pb-3">
              <RecentView
                username={user}
                loading={recentViewLoading}
                recipes={recentView}
              />
            </div>
          </section> */}

          {/* Tags */}
          <section className="my-5 py-3">
            <h1 className="text-4xl text-center mb-3 font-bold">What do you want to eat?</h1>
            <div className="flex flex-wrap w-full md:w-3/4 mx-auto justify-center pb-3">
              {tags.map((tag) => {
                return <TagsPill tag={tag} />;
              })}
            </div>
          </section>

          {/* Discover recipes */}
          <section className="w-full my-2">
            <h1 className="text-4xl text-center mb-3 font-bold">Discover more recipes</h1>
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
