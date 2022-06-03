import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface ImgInfo {
  src: string;
  alt: string;
  href?: string;
}

export default function BannerImage(props: ImgInfo) {
  const [img, setImg] = useState(props.src);
  const defaultImage = "/images/bibimbap-image.webp";
  const router = useRouter();

  useEffect(() => {
    setImg(props.src);
  }, [props.src]);

  function pushTo(): undefined {
    router.push(`/recipe/${props.href}`);
    return;
  }
  return props.href ? (
    <Image
      className=" rounded-t cursor-pointer"
      src={img ? img : defaultImage}
      alt={props.alt}
      width={200}
      height={130}
      layout="responsive"
      objectFit="cover"
      onClick={pushTo}
      onErrorCapture={(e) => {
        setImg(defaultImage);
      }}
    />
  ) : (
    <Image
      className="object-cover rounded-t"
      src={img ? img : defaultImage}
      alt={props.alt}
      width={180}
      height={100}
      layout="responsive"
      objectFit="cover"
      onErrorCapture={(e) => {
        setImg(defaultImage);
      }}
    />
  );
}
