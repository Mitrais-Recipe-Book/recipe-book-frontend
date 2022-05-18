import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import RecipeCard from "../../components/RecipeCard";
import { useDispatch, useSelector } from "react-redux";
import { clearQuery } from "../../redux/reducers/queryReducer";
import SearchByName from "../../components/Search/SearchByName";
import SearchByCreator from "../../components/Search/SearchByCreator";
import SearchByTags from "../../components/Search/SearchByTags";

export default function index() {
  const router = useRouter();
  const searchItem = router.query.search_item;
  const [recipes, setRecipes] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearQuery());
  });
  return (
    <div>
      <Navbar />
      <main className="container mx-auto pt-2 sm:grid sm:grid-cols-1 sm:place-content-center">
        <section className="flex place-content-center rounded">
          <SearchByName />
        </section>
        <section className="flex gap-y-2 lg:gap-x-20 md:gap-x-12 sm:flex-row flex-col-reverse place-content-center my-3">
          <div className="flex place-content-center">
            <SearchByTags />
          </div>
          <div className="flex place-content-center ">
            <SearchByCreator />
          </div>
        </section>
        <section className="sm:hidden flex place-content-center">
          <button
            className="bg-yellow-500 rounded w-3/4 h-8 text-black px-2 py-1 font-extrabold"
          >Search</button>
        </section>
      </main>
      <Footer />
    </div>
  );
}
