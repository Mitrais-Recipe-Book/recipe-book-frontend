import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Fragment } from "react";
import { CgMenu } from "react-icons/cg";
import { Menu, Transition } from "@headlessui/react";
import TagsPill from "./TagsPill";
import Link from "next/link";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

//@ts-ignore
export default function RecipeCardLong(prop) {
  const [img, setImg] = useState("")
  const defaultImg = "/images/bibimbap512x512.png";
  
  useEffect(() => {
    setImg(`${process.env.API_URL}recipe/${prop.recipe?.id}/photo`);
  }, [prop.recipe.id]);
  return (
    <>
      <div className="w-full border shadow-md p-4 my-2">
        <div className="flex">
          <div className=" grow">
            <h4>{prop.recipe.dateCreated}</h4>
          </div>
          {
            prop?.dataQueryParam == undefined && 
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                <CgMenu size={20} />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="z-10 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Link href={`/creator/create-recipe?id=${prop.recipe.id}`}>
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Edit
                          </a>
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          onClick={(e)=>{
                            e.preventDefault()
                            prop.deleteAction(prop.recipe.id)
                          }}
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Delete
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          }
        </div>
        {
          prop.isDraft? (
            <h1 className="text-2xl text-center md:text-left my-3 font-semibold text-ellipsis overflow-hidden">
            {
              //@ts-ignore
              prop.recipe.title
            }
          </h1>
          ) : (
            <Link href={`/recipe/${prop.recipe.id}`}>
              <h1 className="text-2xl text-center md:text-left my-3 font-semibold text-ellipsis overflow-hidden hover:cursor-pointer">
                {
                  //@ts-ignore
                  prop.recipe.title
                }
              </h1>
            </Link>
          )
        }
        <div className="grid grid-cols-4 my-3">
          <div className="order-2 md:order-1 col-span-4 md:col-span-3">
            <p className="text-justify md:text-left four-lines-ellipsis">
              {
                //@ts-ignore
                prop.recipe.overview
              }
            </p>
            <div className="flex flex-wrap gap-1 md:gap-3 my-3">
              {
                prop.recipe?.tags.length > 0 ? (
                  prop.recipe.tags.map((tag:any) => (
                    <TagsPill key={Math.random()*Math.random()} tag={{id: tag.id, name: tag.name}} />
                  ))
                ) : (
                  <div className=""></div>
                )
              }
            </div>
          </div>
          <div className="order-1 md:order-2 px-5 my-3 mx-2 col-span-4 md:col-span-1">
            <Image
              className="rounded mx-auto w--40 md:w-full"
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
      </div>
    </>
  );
}
