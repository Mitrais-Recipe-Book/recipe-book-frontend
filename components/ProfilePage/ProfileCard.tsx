import React from 'react'
import Image from 'next/image'

export const ProfileCard = () => {
    return (
        <div className='flex shadow-md rounded-md p-3'>
            <div className="flex-none w-14 h-14 mr-3">
                <Image
                    className="rounded-full"
                    src="/images/user-profile.png"
                    alt="RecipyBook"
                    width={40}
                    height={40}
                    objectFit="cover"
                    layout="responsive"
                />
            </div>
            <div className="flex-1">
                <div className="text-ellipsis overflow-hidden">
                    <p className='text-xl mb-1'>John Doe</p>
                    <p className='text-base'>@johndoe</p>
                </div>
            </div>
        </div>
    )
}
