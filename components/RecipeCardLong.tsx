import React from "react";
import Image from "next/image";
import { Fragment } from "react";
import { CgMenu } from "react-icons/cg";
import { Menu, Transition } from "@headlessui/react";
import TagsPill from "./TagsPill";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function RecipeCardLong() {
  return (
    <>
      <div className="w-full border shadow-md p-4">
        <div className="flex">
          <div className=" grow">
            <h4>4 May 2022</h4>
          </div>
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
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
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
        </div>
        <h1 className="text-2xl text-center md:text-left my-3 font-semibold">Spaghett</h1>
        <div className="grid grid-cols-4 my-3">
          <div className="order-2 md:order-1 col-span-4 md:col-span-3">
            <p className="text-justify md:text-left four-lines-ellipsis">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. A amet
              impedit, modi similique molestiae, ad praesentium doloremque hic,
              maxime minima magni pariatur deserunt. Amet placeat magnam
              sapiente tempora, vitae incidunt? Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Veniam voluptas maiores est odio
              quis dolorum ad optio quasi magni error animi ducimus officia
              perferendis et placeat nobis, suscipit dolore doloribus!
            </p>
            <div className="flex flex-wrap gap-1 md:gap-3 my-3">
                <TagsPill tag={{id: 0, name: "tags"}} />
                <TagsPill tag={{id: 0, name: "tags"}} />
                <TagsPill tag={{id: 0, name: "tags"}} />
                <TagsPill tag={{id: 0, name: "tags"}} />
                <TagsPill tag={{id: 0, name: "tags"}} />
            </div>
          </div>
          <div className="order-1 md:order-2 px-5 my-3 mx-2 col-span-4 md:col-span-1">
            <Image
              className="rounded mx-auto w--40 md:w-full"
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
  );
}
