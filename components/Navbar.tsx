import Image from "next/image";
import Router from "next/router";
import { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  clearQueryExceptName,
  sendQuery,
  setQueryRecipeName,
} from "../redux/reducers/queryReducer";
import { getSession, useSession } from "next-auth/react";
import { Fragment } from "react";
import { CgMenu } from "react-icons/cg";
import { Menu, Transition } from "@headlessui/react";
import { signOut } from "next-auth/react";
import axios from "axios";
import Swal from "sweetalert2";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  let searchItem = useSelector((state: any) => state.query.queryRecipeName);
  const dispatch = useDispatch();
  const { data: session }: any = useSession();

  function handleRequestCC(username: string) {
    Swal.fire({
      title: "Send request to be Content Creator?",
      text: "You will be able to post recipes after getting accepted",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, request it!",
    }).then((result) => {
      result.isConfirmed
        ? axios
            .post(process.env.API_URL + `user/${username}/request-creator`)
            .then((res) => {
              Swal.fire({
                title: "Request sent!",
                text: "Successfully sent request! You will be able to post recipes after getting accepted",
                icon: "success",
              });
            })
            .catch((err) => {
              Swal.fire({
                title: "Error",
                text: "Something went wrong! Please try again later",
                icon: "error",
              });
            })
        : null;
    });
  }

  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-800">
      <div className="container flex flex-wrap justify-around items-center mx-auto">
        <a href="/" className="flex items-center">
          <Image
            src="/images/bibimbap192x192.png"
            alt="RecipyBook"
            width={40}
            height={40}
            objectFit="cover"
          />
          <span className="pl-2 self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            RecipyBook
          </span>
        </a>
        <div className="flex md:order-2 mb-[-10px]">
          <div className="hidden relative mr-3 md:mr-0 md:block">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none pb-2">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="search-bar"
              className="block p-2 pl-10 w-full mb-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Recipe..."
              value={searchItem}
              onChange={(event) => {
                dispatch(setQueryRecipeName(event.target.value));
              }}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  dispatch(clearQueryExceptName());
                  //@ts-ignore
                  dispatch(sendQuery());
                }
              }}
            />
          </div>
          <div className="rounded-lg px-1 flex align-middle md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"></div>

          <button
            id="triggerEl"
            data-collapse-toggle="mobile-menu-3"
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu-3"
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <svg
              className="hidden w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div className="hidden md:block md:ml-4 md:mr-4 md:items-center md:w-auto">
            {session ? (
              <Menu as="div" className="relative inline-block text-left">
                <Menu.Button className="inline-flex justify-center w-full rounded-md  shadow-sm ">
                  <Image
                    className="w-8 h-8 rounded-full"
                    src="/images/user-profile.png"
                    alt="user-profile"
                    width={40}
                    height={40}
                    objectFit="cover"
                  />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="z-10 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        <h2 className="block px-4 py-2 font-bold">
                          Halo, {session.user.username}!
                        </h2>
                      </Menu.Item>
                      <Menu.Item>
                        <Link href={`/profile`}>
                          <a
                            href="#"
                            className={
                              "bg-white text-gray-900 hover:bg-gray-900 duration-150 hover:text-white  block px-4 py-2 text-sm cursor-pointer"
                            }
                          >
                            Profile
                          </a>
                        </Link>
                      </Menu.Item>
                      <Menu.Item>
                        <a
                          className={
                            "bg-white text-gray-900 hover:bg-gray-900 duration-150 hover:text-white  block px-4 py-2 text-sm cursor-pointer"
                          }
                        >
                          Edit Profile
                        </a>
                      </Menu.Item>
                      {!session.user.roles.includes("Creator") ? (
                        <Menu.Item>
                          <a
                            onClick={(e) => {
                              e.preventDefault();
                              //TODO: API to request goes here
                              handleRequestCC(session.user.username);
                            }}
                            className={
                              "bg-white text-gray-900 hover:bg-gray-900 duration-150 hover:text-white  block px-4 py-2 text-sm cursor-pointer"
                            }
                          >
                            Request to be Content Creator
                          </a>
                        </Menu.Item>
                      ) : null}

                      <Menu.Item>
                        <a
                          onClick={(e) => {
                            e.preventDefault();
                            signOut();
                          }}
                          className={
                            "bg-white text-gray-900 hover:bg-gray-900 duration-150 hover:text-white  block px-4 py-2 text-sm cursor-pointer"
                          }
                        >
                          Logout
                        </a>
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <Link href="/sign-in">
                <button className="border-2 hover:border-gray-200 hover:bg-gray-800  hover:text-white duration-150 rounded py-1 px-3 bg-gray-200 border-gray-700  text-gray-800 font-semibold  text-md ">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
        <div
          className={`
          ${isOpen ? "block" : "hidden"}
          justify-between items-center w-full md:flex md:w-auto md:order-1 `}
          id="mobile-menu-3"
        >
          <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <li>
              <a
                href="/"
                className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/creator/create-recipe"
                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Create Recipe
              </a>
            </li>
            <li>
              <a
                href="/admin"
                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Admin Page
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
