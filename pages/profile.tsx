import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import RecipeCardLong from "../components/RecipeCardLong";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ProfilePage() {
    return (
        <div>
            <Head>
                <title>Profile - John Doe</title>
                <meta
                name="description"
                content="
                    Profile - John Doe.
                "
                />
                <link rel="icon" href="/images/bibimbap192x192.png" />
            </Head>
            <Navbar />
            <main className="lg:container mx-auto pt-1">
                <div className="lg:container xl:px-[4rem] ">
                    <div className="grid grid-cols-4 gap-5">
                        {/* Column created recipe */}
                        <div className="col-span-4 md:col-span-3 p-4 order-2 md:order-1 shadow-xl rounded-lg">
                            <h1 className="text-3xl my-3 font-bold">Created Recipe(s)</h1>
                            <p className="p-4 text-center">
                                You don't have recipe(s) yet, <a href="#" className="transition  bg-gray-800 text-sm text-white hover:bg-gray-600 px-4 py-2 rounded-md ">Create one</a> now!
                            </p>
                            <RecipeCardLong />
                        </div>
                        {/* Column profile card */}
                        <div className="p-4 col-span-4 md:col-span-1 order-1 md:order-2 shadow-md md:shadow-xl rounded-lg my-3 md:my-0">
                            <h1 className="text-3xl text-center font-bold my-3">Your Profile</h1>
                            <div className="grid grid-cols-4">
                                <div className="col-span-4 ">
                                    <div className="w-1/2 mx-auto">
                                        <Image
                                            className="rounded-full"
                                            src="/images/user-profile.png"
                                            alt="RecipyBook"
                                            width={100}
                                            height={100}
                                            objectFit="cover"
                                            layout="responsive"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-4 text-center ">
                                    <h1 className="my-3 font-bold text-2xl">John Doe</h1>
                                    <div className="my-3 flex font-medium text-md flex-wrap content-center justify-around">
                                        <h3>7 recipes</h3>
                                        <h3>7 likes</h3>
                                        <h3>7 followers</h3>
                                    </div>
                                    <p className="my-4 w-3/4 mx-auto four-lines-ellipsis">
                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi placeat harum quis vitae soluta quibusdam laboriosam ad minus fugiat ex suscipit quam illum facilis velit, dolorum obcaecati recusandae, hic aut.
                                    </p>
                                    <button className="uppercase transition  bg-gray-800 text-sm text-white hover:bg-gray-600 px-4 py-2 rounded-md ">Edit Profile </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
