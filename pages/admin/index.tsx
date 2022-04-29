import React from "react";
import TagsTable from "../../components/Admin/TagsTable";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

export default function Index() {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto pt-1">
        <div className="container w-3/4 mx-auto pt-1">
          <section className="my-2 py-3 rounded-md bg-white drop-shadow-lg">
            <h1 className="text-4xl text-center mb-3 font-bold">
              Admin Dashboard
            </h1>
          </section>
          <section className="my-2 py-3 rounded-md bg-white drop-shadow-lg">
          <TagsTable />
            </section>
        </div>
        <Footer />
      </main>
    </div>
  );
}
