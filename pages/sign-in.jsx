import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState, SyntheticEvent } from "react";
import { useDispatch } from "react-redux";
import {
  signIn,
  useSession,
  getProviders,
  signOut,
  ClientSafeProvider,
  LiteralUnion,
  getSession,
  getCsrfToken,
} from "next-auth/react";
import { GetServerSideProps } from "next";
import jsCookie from "js-cookie";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";

export default function LogIn({ csrfToken, providers }) {
  const session = useSession();

  const dispatch = useDispatch();
  const router = useRouter();
  const [userData, setUserData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [notif, setNotif] = useState(false);
  const [errMessage, setErrMessage] = useState(false);

  const [passwordType, setPasswordType] = useState("password");
  const [showPassword, setShowPassword] = useState(true);

  const [usernameFilled, setUsernameFilled] = useState(true);
  const [passwordFilled, setPasswordFilled] = useState(true);

  const [allFilled, setAllFilled] = useState(false);

  useEffect(() => {
    if (
      usernameFilled &&
      userData.username.length > 0 &&
      passwordFilled &&
      userData.password.length > 0
    ) {
      setAllFilled(true);
    }
  });

  const togglePassword = () => {
    if (showPassword) {
      setShowPassword(false);
      setPasswordType("text");
    } else {
      setShowPassword(true);
      setPasswordType("password");
    }
  };

  const usernameBlank = () => {
    //Swal alert for username
    Swal.fire({
      title: "Username is required",
      text: "Please enter your username",
      icon: "warning",
      confirmButtonText: "OK",
    });
  };

  const passwordBlank = () => {
    //Swal alert for username
    Swal.fire({
      title: "Password is required",
      text: "Please enter your username",
      icon: "warning",
      confirmButtonText: "OK",
    });
  };

  useEffect(() => {
    if (jsCookie.get("next-auth.csrf-token")) {
      router.push("/");
    }
    if (router.query.create) {
      setMessage(router.query.create), setNotif(true);
    }
    if (router.query.error) {
      Swal.fire("Sign-in Error", "check your username or password!", "error");
    }
    setTimeout(() => {
      setNotif(false);
    }, 5000);
    setTimeout(() => {
      setErrMessage(false);
    }, 5000);
  }, []);

  const login = async (event) => {
    event.preventDefault();

    const username = userData.username;
    const password = userData.password;
    Swal.fire({
      title: "Loading...",
      didOpen: () => {
        Swal.showLoading();
      },
    });
    signIn("credentials", { username, password });
  };

  return (
    <div className="min-h-screen flex items-stretch text-white">
      <div
        className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center 
      bg-[url('https://images.unsplash.com/photo-1608266400306-3e699423dc53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')]"
      >
        <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
        <div className="w-full px-24 z-10 flex flex-col">
          <div className="flex flex-row">
            <Image
              src="/images/bibimbap192x192.png"
              alt="RecipyBook"
              width={50}
              height={50}
              objectFit="cover"
            />
            <h1 className="text-5xl ml-4 font-bold text-left tracking-wide font-logo">
              Recipy Book
            </h1>
          </div>
          <p className="text-3xl my-4 font-logo pl-20">Cook with us!</p>
        </div>
        <div className="bottom-0 absolute p-4 text-center right-0 left-0 flex justify-center space-x-4"></div>
      </div>
      <div className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0 bg-gray-900">
        <div
          className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center 
        bg-[url('https://images.unsplash.com/photo-1608266400306-3e699423dc53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')]"
        >
          <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
        </div>
        <div className="w-full py-6 z-20">
          <div className="lg:hidden flex flex-row text-center justify-center">
            <Image
              src="/images/bibimbap192x192.png"
              alt="RecipyBook"
              width={50}
              height={50}
              objectFit="cover"
            />
            <h1 className="text-5xl font-bold text-left tracking-wide font-logo">
              Recipy Book
            </h1>
          </div>
          {notif ? (
            <div
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Success!</strong>
              <br />
              <span className="block sm:inline">
                Successfully created new account please Sign In!
              </span>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg
                  className="fill-current h-6 w-6 text-red-500"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <title>Close</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
              </span>
            </div>
          ) : (
            ""
          )}
          {errMessage ? (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Sign-in Failed!</strong>
              <br />
              <span className="block sm:inline">
                Check your username and password!
              </span>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg
                  className="fill-current h-6 w-6 text-red-500"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <title>Close</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
              </span>
            </div>
          ) : (
            ""
          )}
          <h1 className="my-6 text-3xl font-bold">Sign In</h1>
          <form
            onSubmit={login}
            method="post"
            className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto"
          >
            <input name="csrfToken" type="hidden" />
            <div className="pb-2 pt-4">
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                onChange={(e) => {
                  setUserData({ ...userData, [e.target.name]: e.target.value });
                  setUsernameFilled(true);
                  if (e.target.value.length == 0) {
                    setUsernameFilled(false);
                  }
                }}
                className="block w-full p-4 text-gray-900 leading-tight focus:outline-orange-400 text-lg rounded-sm bg-slate"
              />
            </div>
            {usernameFilled == false && (
              <div className="text-red-600">
                <small>Username can't be blank</small>
              </div>
            )}
            <div className="pb-2 pt-4 flex">
              <input
                className="block w-full p-4 text-lg text-gray-900 leading-tight focus:outline-orange-400 rounded-l-sm bg-slate"
                type={passwordType}
                name="password"
                id="password"
                onChange={(e) => {
                  setUserData({ ...userData, [e.target.name]: e.target.value });
                  setPasswordFilled(true);
                  if (e.target.value.length == 0) {
                    setPasswordFilled(false);
                  }
                }}
                placeholder="Password"
              />
              <span
                className="bg-slate-100 text-gray-900 cursor-pointer min-w-fit p-3 flex items-center justify-center"
                onClick={togglePassword}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            {passwordFilled == false && (
              <div className="text-red-600">
                <small>Password can't be blank</small>
              </div>
            )}
            <div className="text-right text-gray-400 hover:underline hover:text-gray-100">
              <a href="/sign-up">Sign up here</a>
            </div>
            <div className="px-4 pb-2 pt-4">
              {allFilled ? (
                <button
                  type="submit"
                  className="uppercase block w-full p-4 text-lg rounded-full bg-orange-400 hover:bg-orange-500 focus:outline-none"
                >
                  sign in
                </button>
              ) : (
                <button
                  disabled={true}
                  className="uppercase block w-full p-4 text-lg rounded-full bg-slate-400"
                >
                  sign in
                </button>
              )}
            </div>

            <div className="p-4 text-center right-0 left-0 flex justify-center space-x-4 mt-16 lg:hidden ">
              <a href="#">
                <svg
                  fill="#fff"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a href="#">
                <svg
                  fill="#fff"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              <a href="#">
                <svg
                  fill="#fff"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  // if logged in, redirect to home page
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      csrfToken: await getCsrfToken(context),
      providers: await getProviders(),
    },
  };
}
