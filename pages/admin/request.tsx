import RequestTable from "@components/Admin/RequestTable";
import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function request() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchUser(page: number) {
    setLoading(true);
    const response = await axios.get(
      `${process.env.API_URL}user/role-request/`
    );
    setData(response.data.payload);
    setLoading(false);
  }

  useEffect(() => {
    fetchUser(0);
  }, []);
  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-10 w-3/4">
        <h1 className="text-center text-2xl mb-4">Reuqest Table</h1>
        <div className="flex flex-col justify-items-center ">
          <RequestTable data={data} loading={loading} />
        </div>
      </div>
      <Footer />
    </>
  );
}
