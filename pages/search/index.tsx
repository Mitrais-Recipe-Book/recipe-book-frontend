import React, { useEffect } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useDispatch } from "react-redux";
import { clearQuery } from "../../redux/reducers/queryReducer";
import SearchByName from "../../components/Search/SearchByName";
import SearchByCreator from "../../components/Search/SearchByCreator";
import SearchByTags from "../../components/Search/SearchByTags";
import { sendQuery } from "../../redux/reducers/queryReducer";

export default function index() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearQuery());
  });
  return (
    <div>
      <Navbar />
      <main className="flex flex-col container mx-auto pt-2 justify-center">
        <section className="flex place-content-center rounded">
          <SearchByName />
        </section>
        <section className="sm:flex sm:justify-center">
          <section className="grid grid-cols-1 sm:grid-cols-4 sm:w-3/4 my-2">
            <section className="flex gap-y-2 flex-col-reverse place-content-center my-3">
              <div className="sm:hidden flex place-content-center">
                <button
                  className="bg-yellow-500 rounded w-3/4 h-8 text-black px-2 py-1 font-extrabold"
                  //@ts-ignore
                  onClick={() => dispatch(sendQuery())}
                >
                  Search
                </button>
              </div>
              <div className="flex place-content-center">
                <SearchByTags />
              </div>
              <div className="flex place-content-center ">
                <SearchByCreator />
              </div>
            </section>

            <section className="col-span-3 flex flex-wrap place-content-center">
              <h1 className="text-2xl">Explore Your Recipes Today</h1>
            </section>
          </section>
        </section>
      </main>
      <Footer />
    </div>
  );
}
