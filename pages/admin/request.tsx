import RequestTable from "@components/Admin/RequestTable";
import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface User {
  id: number;
  username: string;
}

export default function request() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <div className="container mx-auto mt-10 w-3/4">
        <h1 className="text-center text-2xl mb-4">Reuqest Table</h1>
        <div className="flex flex-col justify-items-center ">
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
