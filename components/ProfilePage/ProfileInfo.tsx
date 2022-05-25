import React from 'react'
import Image from "next/image";
import { useState,useEffect } from 'react';


export const ProfileInfo = (props:any) => {
    // console.log("info",props.userData)
 
    return (
        <>
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
                        <h1 className="my-3 font-bold text-2xl">{props?.userData?.response?.fullName}</h1>
                        <div className="my-3 flex font-medium text-md flex-wrap content-center justify-around">
                            <h3>{props?.userData?.response?.totalRecipes} recipes</h3>
                            <h3>{props?.userData?.response?.recipeLikes} likes</h3>
                            <h3>{props?.userData?.response?.followers} followers</h3>
                        </div>
                        {/* <p className="my-4 w-3/4 mx-auto four-lines-ellipsis">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi placeat harum quis vitae soluta quibusdam laboriosam ad minus fugiat ex suscipit quam illum facilis velit, dolorum obcaecati recusandae, hic aut.
                        </p> */}
                        {   
                            props?.dataQueryParam !== undefined && <button className="uppercase transition  bg-gray-800 text-sm text-white hover:bg-gray-600 px-4 py-2 rounded-md ">Follow </button>
                        } 
                        {
                            props?.dataQueryParam == undefined && <button className="uppercase transition  bg-gray-800 text-sm text-white hover:bg-gray-600 px-4 py-2 rounded-md ">Edit Profile </button>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
