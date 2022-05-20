import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useState } from "react";
import RecipeCardLong from "../../components/RecipeCardLong";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { ProfileInfo } from "../../components/ProfilePage/ProfileInfo";
import axios from "axios";
import Swal from 'sweetalert2'
import { Tab } from '@headlessui/react'
import { getSession, useSession } from "next-auth/react";
import { route } from "next/dist/server/router";


export default function ProfilePage() {
    const apiUrl = "https://recipyb-dev.herokuapp.com/api/v1"
    const [recipesData,setRecipesData] = useState()
    const [currentPage,setCurrentPage] = useState(0)
    const [incrementNum,setIncrementNum] = useState(0)
    const { data: session } = useSession();
    const [userData,setUserData] = useState({
        
    })

    const router = useRouter()
    const routeUserName = router.query.params

    async function getRecipes(){
        if(userData?.username){
            axios.get(
                apiUrl+`/user/${userData?.username}/recipes?page=${currentPage}`
              )
              .then((res) => {
                //@ts-ignore
                const response = res.data.payload
                //@ts-ignore
                // console.log(response);
                //@ts-ignore
                setRecipesData(response)
              });
        }
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

    function getDataProfile(username:any){
        if (username!==undefined) {
            axios.get(
                apiUrl+`/user/${username}`
            ).then((res:any)=>{
                const response = res.data.payload
                setUserData({...userData,response})
            }).catch((error:any)=>{
                console.log(error)
            })
        }
    }

    useEffect(()=>{
        if(routeUserName!==undefined){
            getDataProfile(routeUserName)
            console.log("second")
        } else {
            // @ts-ignore
            getDataProfile(session?.user?.username)
            console.log("first")
            setUserData({
                ...userData,
                //@ts-ignore
                role:session?.user?.roles[0]
            })
            console.log("userdata",userData)
        }
        getRecipes()
        console.log(session)
    },[session,routeUserName])

    interface Recipe {
        recipeName: string;
        description: string;
        recipeImage: string;
        recipeViews: number;
        author: string;
        authorImage: string;
        authorFollower: number;
    }

    function classNames(...classes:any) {
        return classes.filter(Boolean).join(' ')
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
                            {/* <Tab.Group>
                                <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 ">
                                    <Tab className={({ selected }) =>
                                        classNames(
                                        'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                                        'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                        selected
                                            ? 'bg-white shadow'
                                            : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                                        )
                                    }>
                                        
                                        Tab 1
                                    </Tab>
                                    <Tab className={({ selected }) =>
                                        classNames(
                                        'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                                        'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:ring-2',
                                        selected
                                            ? 'bg-white shadow'
                                            : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                                        )
                                    }>
                                        
                                        Tab 2
                                    </Tab>
                                </Tab.List>
                                <Tab.Panels className="mt-2">
                                    <Tab.Panel className={
                                        `rounded-xl bg-white p-3
                                        ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2`
                                    }>
                                        Content 1
                                    </Tab.Panel>
                                    <Tab.Panel className={
                                        `rounded-xl bg-white p-3
                                        ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2`
                                    }>
                                        Content 1
                                    </Tab.Panel>
                                </Tab.Panels>
                            </Tab.Group> */}
                            {/* {
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
                            } */}
                            
                        </div>
                        {/* Column profile card */}
                        <div className="p-4 col-span-4 md:col-span-1 order-1 md:order-2 my-3 md:my-0">
                            <ProfileInfo userData={userData} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
