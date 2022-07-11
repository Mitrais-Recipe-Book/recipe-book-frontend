import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
import React from "react";

export default function editprofile() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto pt-1">
        <div className="container w-3/4 mx-auto pt-1">
          <section className="my-2 py-3 rounded-md bg-white drop-shadow-lg">
            <h1 className="text-4xl text-center mb-3 font-bold">
              Edit Profile
            </h1>
            <div></div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
