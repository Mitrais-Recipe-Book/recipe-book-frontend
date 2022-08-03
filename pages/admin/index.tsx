import RequestManagement from "@components/Admin/RequestManagement";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import TagsTable from "../../components/Admin/TagsTable";
import UserManagement from "../../components/Admin/UserManagement";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

interface User {
  id: number;
  username: string;
  fullName: string;
  email: string;
  roles: string[];
}
interface Tag {
  id: number;
  name: string;
  temp: string;
  views: number;
  totalRecipe: number;
}

export default function Admin() {
  const [showTagsManagement, setShowTagsManagement] = useState(true);
  const [showUserManagement, setShowUserManagement] = useState(false);
  const [showRequesteManagement, setShowRequestManagement] = useState(false);
  const [users, setUsers] = useState<User[]>();
  const [loadingUser, setLoadingUser] = useState(true);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loadingTag, setLoadingTag] = useState(true);
  const [requestUsers, setRequestUsers] = useState<User[]>([]);
  const [loadingRequest, setLoadingRequest] = useState(true);
  const router = useRouter();

  function fetchUser(page: number) {
    axios.get(`${process.env.API_URL}user?page=${page}`).then((res) => {
      setUsers(res.data.payload.data);
      setLoadingUser(false);
    });
  }
  function fetchTags() {
    axios.get(`${process.env.API_URL}tag/all`).then((res) => {
      setTags(
        res.data.payload.map((tag: any) => ({
          id: tag.id,
          name: tag.name,
          temp: tag.name,
          views: tag.views,
          totalRecipe: tag.totalRecipe,
        }))
      );
      setLoadingTag(false);
    });
  }

  function fetchRequest() {
    axios.get(`${process.env.API_URL}user/role-request/`).then((res) => {
      setRequestUsers(res.data.payload);
      setLoadingRequest(false);
    });
  }

  useEffect(() => {
    fetchUser(0);
    fetchTags();
    fetchRequest();
  }, []);

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
                  setShowRequestManagement(false);
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
                  setShowRequestManagement(false);
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
                  setShowTagsManagement(false);
                  setShowUserManagement(false);
                  setShowRequestManagement(true);
                }}
              >
                Request Management
              </button>
            </div>
          </section>
          <section className="my-2 py-3 rounded-md bg-white drop-shadow-lg">
            {showTagsManagement && (
              <TagsTable tags={tags!} setTags={setTags!} loading={loadingTag} />
            )}
            {showUserManagement && (
              <UserManagement
                users={users!}
                setUsers={setUsers}
                isLoading={loadingUser}
              />
            )}
            {showRequesteManagement && (
              <RequestManagement
                data={requestUsers!}
                setData={setRequestUsers}
                loading={loadingRequest}
              />
            )}
          </section>
        </div>
        <Footer />
      </main>
    </div>
  );
}
