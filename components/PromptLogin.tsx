import { useRouter } from "next/router";
import React from "react";

export default function PromptLogin() {
  const router = useRouter();
  return (
    <div>
      <h1 className="text-center text-3xl mt-8 mb-4">You are not logged in!</h1>
      <p className="text-center text-2xl mb-4">Please login to continue</p>
      <div className="my-8 flex gap-4 place-content-center">
        <button
          className="bg-red-500 text-white rounded py-2 px-3"
          onClick={() => {
            router.push("/sign-in");
          }}
        >
          Login
        </button>
        <button
          className="bg-blue-500 text-white rounded py-2 px-5"
          onClick={() => {
            router.push("/sign-up");
          }}
        >
          Sign up
        </button>
      </div>
    </div>
  );
}
