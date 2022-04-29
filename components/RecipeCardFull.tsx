import React from "react";
import Image from "next/image";
import { SiCodechef } from "react-icons/si";

export default function RecipeCardFull() {
  return (
    <div className="mx-2 my-3 sm:w-full xl:w-50 box-border border-1 pb-2 rounded shadow transition-all hover:bg-orange-200 hover:scale-110">
      <Image
        className="w-full rounded-t cursor-pointer"
        src="/images/bibimbap-image.webp"
        alt="RecipyBook"
        width={100}
        height={50}
        layout="responsive"
        objectFit="cover"
      />
      <div className="px-2 py-1">
        <div className="font-bold text-lg cursor-pointer">
          Recipe Card Title
        </div>
        <div className="text-gray-600 md:text-ellipsis">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
        </div>
        <div className="flex py-2">
          <div className="py-2 cursor-pointer ml-1 mr-2">
            <SiCodechef className="rounded-full" size={24} />
          </div>
          <div>
            <div className="font-semibold text-sm cursor-pointer">
              @Full Name
            </div>
            <div className="text-xs pl-1 text-gray-600 cursor-pointer">
              8 Followers
            </div>
          </div>
        </div>
      </div>
      <div className="text-center pt-1">
        <div className="text-sm text-gray-600"> 1200 Views </div>
      </div>
    </div>
  );
}
