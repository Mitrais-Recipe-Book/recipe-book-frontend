import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import RecipeCardLong from "../components/RecipeCardLong";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import Swal from 'sweetalert2'

export default function ProfilePage() {
    const apiUrl = "https://recipyb-dev.herokuapp.com/api/v1"
    const [recipesData,setRecipesData] = useState()
    const [currentPage,setCurrentPage] = useState(0)
    const [incrementNum,setIncrementNum] = useState(0)
    const [userData,setUserData] = useState({
        username : 'faristest'
    })

    async function getRecipes(){
        axios.get<Recipe[]>(
            apiUrl+`/user/${userData.username}/recipes?page=${currentPage}`
          )
          .then((res) => {
            //@ts-ignore
            const response = res.data.payload
            //@ts-ignore
            console.log(response);
            //@ts-ignore
            setRecipesData(response)
          });
    }

    function loadMoreRecipes(){
        getRecipes().then(()=>{
            setCurrentPage(currentPage+1)
        })
    }

    function deleteRecipe(id?:number){
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Loading...',
                didOpen: () => {
                    Swal.showLoading()
                }
            })
            axios.delete(apiUrl+`/recipe/${id}`)
            .then((res) => {
                Swal.fire({
                    title:'Deleted!',
                    html:'Your recipe has been deleted.',
                    icon:'success',
                    willClose: getRecipes
                })
            })
            .catch(error=>{
                Swal.fire(
                    'Error',
                    'Something gone wrong!.',
                    'error'
                )
            })
        }
        })
    }

    useEffect(()=>{
        getRecipes()
    },[currentPage])

    interface Recipe {
        recipeName: string;
        description: string;
        recipeImage: string;
        recipeViews: number;
        author: string;
        authorImage: string;
        authorFollower: number;
    }

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
                <div className="lg:container xl:px-[4rem] mb-4rem">
                    <div className="grid grid-cols-4 gap-5">
                        {/* Column created recipe */}
                        <div className="col-span-4 md:col-span-3 p-4 order-2 md:order-1 shadow-xl rounded-lg">
                            <h1 className="text-3xl my-3 font-bold">Created Recipe(s)</h1>
                            
                            {
                                //@ts-ignore
                                recipesData?.data?.length > 0 ? (
                                    //@ts-ignore
                                    recipesData?.data.map((recipe)=> (
                                        //@ts-ignore
                                        <RecipeCardLong key={Math.random()*Math.random()} recipe={recipe} deleteAction={deleteRecipe} />
                                    ))
                                ) : (
                                    <p className="p-4 text-center">
                                        You don't have recipe(s) yet, <a href="#" className="transition  bg-gray-800 text-sm text-white hover:bg-gray-600 px-4 py-2 rounded-md ">Create one</a> now!
                                    </p>
                                )
                            }
                            {
                                //@ts-ignore
                                ((recipesData?.data?.length > 0) && (recipesData.totalPages - 1  !== currentPage)) ? (
                                    <div className="w-full flex items-center my-5">
                                        <button className="mx-auto transition bg-gray-600 hover:bg-gray-500 px-8 font-semibold py-2 rounded-lg text-white">
                                            Load more recipes
                                        </button>
                                    </div>
                                ) : (
                                    <div className="my-5"></div>
                                )
                            }
                            
                        </div>
                        {/* Column profile card */}
                        <div className="p-4 col-span-4 md:col-span-1 order-1 md:order-2 my-3 md:my-0">
                            <div className="shadow-md md:shadow-xl rounded-lg pb-6">
                                <h1 className="text-3xl text-center font-bold my-3 ">Your Profile</h1>
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
                </div>
            </main>
        </div>
    )
}
