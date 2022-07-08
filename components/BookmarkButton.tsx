import axios from "axios";
import { useSession } from "next-auth/react";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import Swal from "sweetalert2";

interface Props {
  recipeId: String | String[];
}

export default function FavRecipeCard(props: Props) {
  const [isFavorited, setIsFavorited] = useState<Boolean>();
  const { data: session }: any = useSession();

  useEffect(() => {
    checkFav();
  }, [session]);

  function checkFav() {
    axios
      .get(
        process.env.API_URL +
          `recipe/${props.recipeId}/favorite?username=${session?.user.username}`
      )
      .then((res) => {
        setIsFavorited(res.data.payload.favorited);
      });
  }

  function removeFavorite(username: String, recipeId: String | String[]) {
    if (username && recipeId) {
      axios
        .delete(process.env.API_URL + `recipe/${recipeId}/favorite`, {
          data: {
            username: username,
          },
        })
        .then(() => {
          setIsFavorited(false);
        });
    }
  }
  function addFavorite(username: String, recipeId: String | String[]) {
    if (username && recipeId) {
      axios
        .post(process.env.API_URL + `recipe/${recipeId}/favorite`, {
          username: username,
        })
        .then(() => {
          setIsFavorited(true);
        });
    } else {
      promptToLogin("bookmark");
    }
  }
  function promptToLogin(action: String) {
    Swal.fire({
      title: "Please Login",
      text: `You need to login to ${action} this recipe`,
      icon: "warning",
      confirmButtonText: "Login",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      reverseButtons: true,
      allowOutsideClick: true,
      allowEscapeKey: false,
      allowEnterKey: false,
      showLoaderOnConfirm: true,
    }).then((result) => {
      if (result.value) {
        router.push("/sign-in");
      }
    });
  }
  return (
    <BsFillBookmarkCheckFill
      id="bookmark"
      className={
        isFavorited
          ? "fill-red-600 cursor-pointer"
          : "fill-gray-600 cursor-pointer"
      }
      onClick={() => {
        if (isFavorited) {
          removeFavorite(session?.user.username, props.recipeId!);
        } else {
          addFavorite(session?.user.username, props.recipeId!);
        }
      }}
    />
  );
}
