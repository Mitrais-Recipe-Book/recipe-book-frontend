import React from 'react'
import Image from "next/image";
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2'
import { useRouter } from 'next/router';
import axios from 'axios';
import { FollowBtn } from './FollowBtn';
import EditProfileBtn from './EditProfileBtn';


export const ProfileInfo = (props: any) => {
    const [img, setImg] = useState("")
    const defaultImg = "/images/No_image_available.png";
    console.log(props)
    useEffect(() => {
        setImg(`${process.env.API_URL}user/${props.userData?.response?.username}/photo`);
    }, [props?.userData?.response?.username]);
    return (
        <>
            <div className="shadow-md md:shadow-xl rounded-lg pb-6">
                <h1 className="text-3xl text-center font-bold my-3 ">Profile</h1>
                <div className="grid grid-cols-4">
                    <div className="col-span-4 ">
                        <div className="w-1/2 mx-auto">
                            <Image
                                className="rounded-full"
                                src={img ? img : defaultImg}
                                alt="RecipyBook"
                                width={100}
                                height={100}
                                objectFit="cover"
                                layout="responsive"
                                onErrorCapture={(e) => {
                                    setImg(defaultImg);
                                }}
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

                        {props.dataQueryParam ? <FollowBtn session={props?.session} creatorId={props?.userData?.response?.id} /> : <EditProfileBtn />}

                    </div>
                </div>
            </div>
        </>
    )
}
