import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useState,useEffect } from 'react'

export const ProfileCard = (props:any) => {
    const [img, setImg] = useState("")
    const defaultImg = "/images/No_image_available.png";
    useEffect(() => {
        setImg(`${process.env.API_URL}user/${props.user?.username}/photo`);
    }, [props.user.username]);
    return (
        <Link href={`/profile/${props.user.username}`}>
            <div className='flex shadow-md rounded-md p-3 hover:cursor-pointer' >
                <div className="flex-none w-14 h-14 mr-3">
                    <Image
                        className="rounded-full"
                        src={img ? img : defaultImg}
                        alt="RecipyBook"
                        width={40}
                        height={40}
                        objectFit="cover"
                        layout="responsive"
                        onErrorCapture={(e) => {
                            setImg(defaultImg);
                        }}
                    />
                </div>
                <div className="flex-1">
                    <div className="text-ellipsis overflow-hidden">
                        <p className='text-xl mb-1'>{props.user.fullName}</p>
                        <p className='text-base'>@{props.user.username}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}
