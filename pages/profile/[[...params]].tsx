import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useState } from "react";
import RecipeCardLong from "../../components/RecipeCardLong";
import { CreatedRecipeTabs } from "../../components/ProfilePage/CreatedRecipeTabs";
import { FollowTabs } from "../../components/ProfilePage/FollowTabs";
import { DraftRecipeTabs } from "../../components/ProfilePage/DraftRecipeTabs";
import Custom404 from "@components/Custom404";
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
    const [recipesData, setRecipesData] = useState({
        recipesData: [],
        isLast : false,
        currentPage: 0
    })
    const [draftRecipesData, setDraftRecipesData] = useState({
        draftRecipesData : [],
        isLast : false,
        currentPage: 0
    })
    const [nextPage,setNextPage] = useState({
        createdRecipeData : 0,
        draftRecipeData:0,
    })
    const [incrementNum,setIncrementNum] = useState(0)
    const { data: session,status }:any = useSession();
    const [userData,setUserData]:any = useState({})
    const [userDataFound,SetUserDataFound]:any = useState(true)
    const [sessionProfile,setSessionProfile] = useState(false)
    const [isRendered,setIsRendered] = useState(false)
    const [userFollowers,setUserFollowers] = useState([])
    const [userFollowings,setUserFollowings] = useState([])

    const router = useRouter()
    let routeUserName: any = router.query

    async function getRecipes() {
        if (userData?.response?.username && recipesData.isLast !== true) {
            axios.get(
                apiUrl+`/user/${userData?.response?.username}/recipes?page=${nextPage.createdRecipeData}`
            )
            .then((res) => {
                //@ts-ignore
                const data = res.data.payload
                console.log("created",data)
                //@ts-ignore
                // if(data.data !== recipesData?.currentPage){
                    setRecipesData({
                        // @ts-ignore
                        // recipesData: recipesData?.recipesData?.concat(data.data),
                        recipesData: recipesData.recipesData.concat(data.data),
                        // @ts-ignore
                        isLast : data.islast,
                        currentPage : data.currentPage
                    })
                    //@ts-ignore
                    setNextPage((state) =>{ 
                        return  {draftRecipeData:state.draftRecipeData,createdRecipeData: state.createdRecipeData+1 }
                    })
                // }
            });
        }
    }
    async function getDraftRecipes(username:string){
        if(draftRecipesData.isLast !== true){
            axios.get(
                apiUrl+`/user/`+username+`/draft-recipes?page=${nextPage.draftRecipeData}`
            ).then((res)=>{
                const data = res.data.payload
                console.log("draft",data)
                setDraftRecipesData({
                    draftRecipesData:draftRecipesData.draftRecipesData.concat(data.data),
                    // @ts-ignore
                    currentPage: data.currentPage,
                    isLast:data.islast
                })
                //@ts-ignore
                setNextPage((state) =>{ 
                    return  {draftRecipeData:state.draftRecipeData+1,createdRecipeData: state.createdRecipeData }
                })
            })
        }
    }
    console.log("page", nextPage)

    function loadMoreRecipes(tabs:string) {
        if(tabs === "createdRecipe"){
            getRecipes()
        } else if (tabs === "draftRecipe") {
            getDraftRecipes(session.user.username)
        } else if ( tabs === "follower") {
            getUserFollowers()
        } else {
            getUserFollowing()
        }
    }

    function deleteRecipe(id?: number) {
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
                axios.delete(apiUrl + `/recipe/${id}`)
                    .then((res) => {
                        Swal.fire({
                            title: 'Deleted!',
                            html: 'Your recipe has been deleted.',
                            icon: 'success',
                            willClose: getRecipes
                        })
                    })
                    .catch(error => {
                        Swal.fire(
                            'Error',
                            'Something gone wrong!.',
                            'error'
                        )
                    })
            }
        })
    }

    function deleteDraftRecipe(id?: number) {
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
                axios.delete(apiUrl + `/recipe/${id}`)
                    .then((res) => {
                        Swal.fire({
                            title: 'Deleted!',
                            html: 'Your recipe has been deleted.',
                            icon: 'success',
                            // willClose: getDraftRecipes
                        })
                    })
                    .catch(error => {
                        Swal.fire(
                            'Error',
                            'Something gone wrong!.',
                            'error'
                        )
                    })
            }
        })
    }

    function getUserFollowers(id?:number){
        if(id){
            axios.get(
                apiUrl+`/user/${id}/followers`
            ).then(res=>{
                const data = res.data.payload
                setUserFollowers(data)
            })
        }
    }

    function getUserFollowing(id?:number){
        if(id){
            axios.get(
                apiUrl+`/user/${id}/follow-list`
            ).then(res=>{
                const data = res.data.payload
                setUserFollowings(data)
            })
        }
    }
    async function getDataProfile(username:any){
        if (username!==undefined) {
            axios.get(
                apiUrl + `/user/${username}`
            ).then((res: any) => {
                const response = res.data.payload
                // console.log(response)
                setUserData({ ...userData, response })
            }).catch((error: any) => {
                console.log(error)
                SetUserDataFound(false)
            })
        }
    }

    async function checkQueryParam() {
        setIsRendered(true)
        return routeUserName = router.query
    }

    useEffect(() => {
        if (session) {
            console.log("first")
            checkQueryParam().then(() => {
                if (routeUserName.params !== undefined && routeUserName.params.length > 0) {
                    console.log("qparam")
                    getDataProfile(routeUserName.params).then(() => {
                        getRecipes()
                    })
                } else {
                    getDataProfile(session.user.username).then(() => {
                        console.log("session")
                        getRecipes()
                        getDraftRecipes(session.user.username)
                    })
                }
            })
        } else {
            console.log("second")
            checkQueryParam().then(() => {
                getDataProfile(routeUserName.params).then(() => {
                    getRecipes()
                })
            })
        }
        getUserFollowing(userData?.response?.id)
        getUserFollowers(userData?.response?.id)
    },[routeUserName,userData?.response?.username])

    function classNames(...classes: any) {
        return classes.filter(Boolean).join(' ')
    }

    if(!userDataFound) return <Custom404 />

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
                            <Tab.Group selectedIndex={0}>
                                <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 ">
                                    {
                                        userData?.response?.roles.filter((item:any)=>(item.id==2)).length > 0 ? 
                                            (
                                            <>
                                                <Tab className={({ selected }) =>
                                                    classNames(
                                                    'w-full px-3 whitespace-nowrap rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                                                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                                    selected
                                                        ? 'bg-white shadow'
                                                        : 'bg-gray-300 text-white hover:bg-white/[0.12] hover:text-white'
                                                    )
                                                }>
                                                    
                                                    Created Recipe(s)
                                                </Tab>
                                                {
                                                    !routeUserName.params && (
                                                        <>
                                                            <Tab className={({ selected }) =>
                                                                classNames(
                                                                'w-full px-3 whitespace-nowrap rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                                                                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                                                selected
                                                                    ? 'bg-white shadow'
                                                                    : 'bg-gray-300 text-white hover:bg-white/[0.12] hover:text-white'
                                                                )
                                                            }>
                                                                
                                                                Draft Recipe(s)
                                                            </Tab>
                                                        </>
                                                    )
                                                }
                                                <Tab className={({ selected }) =>
                                                    classNames(
                                                    `w-full px-3 whitespace-nowrap rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700`,
                                                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                                    selected
                                                        ? 'bg-white shadow'
                                                        : 'bg-gray-300 text-white hover:bg-white/[0.12] hover:text-white'
                                                    )
                                                }>
                                                    
                                                    Follower
                                                </Tab>
                                                <Tab className={({ selected }) =>
                                                    classNames(
                                                    `${userData?.response?.roles.filter((item:any)=>(item.id!==2)).length > 0 ? "w-full" : ""} px-3 whitespace-nowrap rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700`,
                                                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                                    selected
                                                        ? 'bg-white shadow'
                                                        : 'bg-gray-300 text-white hover:bg-white/[0.12] hover:text-white'
                                                    )
                                                }>
                                                    
                                                    Following
                                                </Tab>
                                            </>) : (
                                                <Tab className={({ selected }) =>
                                                classNames(
                                                `${userData?.response?.roles.filter((item:any)=>(item.id!==2)).length > 0 ? "w-full" : ""} px-3 whitespace-nowrap rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700`,
                                                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                                selected
                                                    ? 'bg-white shadow'
                                                    : 'bg-gray-300 text-white hover:bg-white/[0.12] hover:text-white'
                                                )
                                            }>
                                                
                                                Following
                                            </Tab>
                                            )
                                        
                                    }
                                    
                                </Tab.List>
                                <Tab.Panels className="mt-2">
                                    {
                                        userData?.response?.roles.filter((item:any)=>(item.id==2)).length > 0 ? (
                                        <>
                                            <Tab.Panel className={
                                                `rounded-xl bg-white p-3
                                                ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400  `
                                            }>
                                                <CreatedRecipeTabs recipesData={recipesData} deleteRecipe={deleteRecipe} dataQueryParam={routeUserName.params} loadMoreRecipes={loadMoreRecipes} />
                                            </Tab.Panel>
                                            {
                                                !routeUserName.params && (
                                                    <Tab.Panel className={
                                                        `rounded-xl bg-white p-3
                                                        ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400  `
                                                    }>
                                                        <DraftRecipeTabs draftRecipeData = {draftRecipesData} deleteRecipe={deleteDraftRecipe} loadMoreRecipes={loadMoreRecipes}/>
                                                    </Tab.Panel>
                                                )
                                            }
                                            <Tab.Panel className={
                                                `rounded-xl bg-white p-3
                                                ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 `
                                            }>
                                                <FollowTabs key={Math.random()*Math.random()} followList={userFollowers}/>
                                            </Tab.Panel>
                                            <Tab.Panel className={
                                                `rounded-xl bg-white p-3
                                                ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 `
                                            }>
                                                <FollowTabs key={Math.random()*Math.random()} followList={userFollowings}/>
                                            </Tab.Panel>
                                        </>) : (
                                            <Tab.Panel className={
                                                `rounded-xl bg-white p-3
                                                ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 `
                                            }>
                                                <FollowTabs key={Math.random()*Math.random()} followList={userFollowings}/>
                                            </Tab.Panel>
                                        )
                                    }
                                    
                                </Tab.Panels>
                            </Tab.Group>
                        </div>
                        {/* Column profile card */}
                        <div className="p-4 col-span-4 md:col-span-1 order-1 md:order-2 my-3 md:my-0">
                            <ProfileInfo userData={userData} dataQueryParam={routeUserName.params} session={session} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
