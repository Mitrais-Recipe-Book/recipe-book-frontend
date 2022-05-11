import React from 'react'
import { useSelector } from 'react-redux'
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import TagsPill from '../../components/TagsPill';

export default function index() {
    interface reduxStore {
        tags: {
            allTags: Tag[];
        }
    }
    interface Tag {
        id: number;
        name: string;
    }
    const tags = useSelector((state: reduxStore) => state.tags.allTags)
  return (
    <div>
      <Navbar />
      <main className="container mx-auto pt-2">
        <section className="my-5 py-3 rounded-md bg-white drop-shadow-lg">
          <h1 className="text-xl text-center mb-3 font-bold">
            Browse Tags:
          </h1>
          <div className="flex flex-wrap w-full md:w-3/4 mx-auto justify-center pb-3">
            {tags.map((tag) => {
              return <TagsPill tag={tag} />;
            })}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
