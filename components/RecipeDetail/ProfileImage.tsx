import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface ImgInfo {
  src: string | undefined;
  alt: string;
}

export default function ProfileImage(props: ImgInfo) {
  const [img, setImg] = useState<string | undefined>();
  const defaultImage = "/images/user-profile.png";
  const router = useRouter();

  useEffect(() => {
    console.log(props.src);
    setImg(`${process.env.API_URL}user/${props?.src}/photo`);
  }, [props.src]);

  function pushTo(): undefined {
    router.push(`/profile/${props.src}`);
    return;
  }
  return (
    <Image
      className=" rounded-full cursor-pointer"
      src={img ? img : defaultImage}
      alt={props.alt}
      width={24}
      height={24}
      layout="responsive"
      objectFit="cover"
      onClick={pushTo}
      onErrorCapture={(e) => {
        setImg(defaultImage);
      }}
    />
  );
}
