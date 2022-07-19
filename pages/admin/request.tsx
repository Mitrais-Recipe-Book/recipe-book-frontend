import RequestTable from "@components/Admin/RequestTable";
import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function request() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);

  async function fetchUser(page: number) {
    setLoading(true);
    const response = await axios.get(
      `${process.env.API_URL}user/role-request/{page}?page=0`
    );
    setData(response.data.payload.data);
    setTotalRows(response.data.payload.totalItem - 1);
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
          <RequestTable
            data={data}
            loading={loading}
            totalRows={totalRows}
            fetchUser={fetchUser}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
