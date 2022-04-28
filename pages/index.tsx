import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RecipeCard from "../components/RecipeCard";
import TagsPill from "../components/TagsPill";

const Home: NextPage = () => {
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
      <Navbar />
      <main className="container mx-auto pt-1">
        <div className="container md:px-[50px] lg:px-[150px]">
          {/* Carousel */}
          <section></section>
          {/* Tags */}
          <section className="my-2 py-3 rounded-md bg-white drop-shadow-lg">
            <h1 className="text-4xl text-center mb-3 font-bold">Tags</h1>
            <div className="flex flex-wrap w-full md:w-3/4 mx-auto justify-center pb-3">
              <TagsPill />
              <TagsPill />
              <TagsPill />
              <TagsPill />
              <TagsPill />
              <TagsPill />
              <TagsPill />
              <TagsPill />
              <TagsPill />
              <TagsPill />
              <TagsPill />
              <TagsPill />
              <TagsPill />
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
              <RecipeCard />
              <RecipeCard />
              <RecipeCard />
              <RecipeCard />
              <RecipeCard />
              <RecipeCard />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
