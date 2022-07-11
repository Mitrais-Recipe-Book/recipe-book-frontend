import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

interface Props {
  username: string;
}

export default function ChangePP(props: Props) {
  const defaultImage = "/images/No_image_available.png";
  const [img, setImg] = useState("");

  useEffect(() => {
    setImg(`${process.env.API_URL}user/${props?.username}/photo`);
  }, [props]);

  function editPP() {
    console.log("editPP");
  }
  return (
    <div>
      <div className="w-32 mx-auto">
        <Image
          className=" rounded-full cursor-pointer"
          src={img ? img : defaultImage}
          alt={props.username}
          width={24}
          height={24}
          layout="responsive"
          objectFit="cover"
          onClick={editPP}
          onErrorCapture={(e) => {
            setImg(defaultImage);
          }}
        />
      </div>
    </div>
  );
}
