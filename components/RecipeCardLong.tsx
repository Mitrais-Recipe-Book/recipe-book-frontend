import React from 'react'
import Image from 'next/image'
import Dropdown from "@material-tailwind/react/Dropdown"
import DropdownItem from "@material-tailwind/react/DropdownItem"
import DropdownLink from "@material-tailwind/react/DropdownLink"

export default function RecipeCardLong() {
  return (
    <>
        <div className="w-full border shadow-md p-4">
            <div className="flex">
                <div className=" grow">
                    <h4>4 May 2022</h4>
                </div>
                <div className="">
                <Dropdown
                    color="lightBlue"
                    placement="bottom-start"
                    buttonText="Dropdown"
                    buttonType="filled"
                    size="regular"
                    rounded={false}
                    block={false}
                    ripple="light"
                >
                    <DropdownItem color="lightBlue" ripple="light">
                        Action
                    </DropdownItem>
                    <DropdownLink
                        href="#"
                        color='white'
                        ripple="light"
                    >
                        Another Action
                    </DropdownLink>
                    <DropdownItem color="lightBlue" ripple="light">
                        Something else
                    </DropdownItem>
                </Dropdown>
                </div>
            </div>
            <h1 className='text-2xl my-3 font-semibold'>Spaghett</h1>
            <div className="grid grid-cols-4 my-3">
                <div className="col-span-3">
                    <p className=''>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        A amet impedit, modi similique molestiae, ad praesentium doloremque hic, maxime minima magni pariatur deserunt. 
                        Amet placeat magnam sapiente tempora, vitae incidunt?
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Veniam voluptas maiores est odio quis dolorum ad optio quasi magni error 
                        animi ducimus officia perferendis et placeat nobis, suscipit dolore doloribus!
                    </p>
                </div>
                <div className="px-3">
                    <Image
                        className="rounded"
                        src="/images/bibimbap512x512.png"
                        alt="RecipyBook"
                        width={100}
                        height={100}
                        objectFit="cover"
                        layout="responsive"
                    />
                </div>
            </div>
        </div>
    </>
  )
}
