import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

interface Props {
  username: string;
}

export default function ChangePP(props: Props) {
  const defaultImage = "/images/No_image_available.png";
  const [img, setImg] = useState("");

  const router = useRouter();

  useEffect(() => {
    setImg(
      `${process.env.API_URL}user/${
        props?.username
      }/photo?${new Date().getTime()}`
    );
  }, [props]);

  function editPP() {
    Swal.fire({
      title: "Change Profile Picture",
      input: "file",
      inputAttributes: {
        accept: "image/*",
        "aria-label": "Upload your profile picture",
      },
      showCancelButton: true,
      confirmButtonText: "Upload",
      showLoaderOnConfirm: true,
    }).then((result) => {
      if (result.value) {
        const formData: any = new FormData();
        formData.append("photo", result.value, result.value.name);
        axios
          .put(
            `${process.env.API_URL}user/${props?.username}/photo`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((res) => {
            Swal.fire({
              title: "Success",
              text: "Profile picture updated successfully",
              icon: "success",
            }).then(() => {
              router.reload();
            });
          })
          .catch((err) => {
            Swal.fire({
              title: "Error",
              text: "Error updating profile picture",
              icon: "error",
            });
          });
      }
    });
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
