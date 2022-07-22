import { useRouter } from "next/router";
import React, { useState } from "react";
import TagsTable from "../../components/Admin/TagsTable";
import UserManagement from "../../components/Admin/UserManagement";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

export default function Admin() {
  const [showTagsManagement, setShowTagsManagement] = useState(true);
  const [showUserManagement, setShowUserManagement] = useState(false);
  const router = useRouter();
  return (
    <div>
      <Navbar />
      <main className="container mx-auto pt-1">
        <div className="container w-3/4 mx-auto pt-1">
          <section className="my-2 py-3 rounded-md bg-white drop-shadow-lg">
            <h1 className="text-4xl text-center mb-3 font-bold">
              Admin Dashboard
            </h1>
            <div className="flex flex-wrap justify-center">
              <button
                onClick={() => {
                  setShowTagsManagement(true);
                  setShowUserManagement(false);
                }}
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
              >
                Tags Management
              </button>
              <span className="px-2" />
              <button
                onClick={() => {
                  setShowTagsManagement(false);
                  setShowUserManagement(true);
                }}
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
              >
                User Management
              </button>
              <span className="px-2" />
              <button
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  router.push("/admin/request");
                }}
              >
                Request Page
              </button>
            </div>
          </section>
          <section className="my-2 py-3 rounded-md bg-white drop-shadow-lg">
            {showTagsManagement && <TagsTable />}
            {showUserManagement && <UserManagement />}
          </section>
        </div>
        <Footer />
      </main>
    </div>
  );
}
