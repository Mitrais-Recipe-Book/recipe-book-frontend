import RequestTable from "@components/Admin/RequestTable";
import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface User {
  id: number;
  username: string;
}

export default function request() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  async function fetchUser() {
    setLoading(true);
    const response = await axios.get(
      `${process.env.API_URL}user/role-request/`
    );
    setData(response.data.payload);
    setLoading(false);
  }

  function removeFromList(username: string) {
    setData(data.filter((user: User) => user.username !== username));
  }

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-10 flex flex-col w-3/4">
        <h1 className="text-4xl text-center mb-3 font-bold">Reuqest Table</h1>
        <button
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mb-3 mx-auto"
          onClick={() => {
            router.push("/admin");
          }}
        >
          Back to Admin Page
        </button>
        <div className="mx-auto w-1/2">
          <RequestTable
            data={data}
            loading={loading}
            removeUser={removeFromList}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
