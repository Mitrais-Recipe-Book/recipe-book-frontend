import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const FollowBtn = (props: any) => {
  const apiUrl = "https://recipyb-dev.herokuapp.com/api/v1";
  const router = useRouter();
  const [isFollowed, setIsFollowed] = useState({});

  useEffect(() => {
    if (props.session?.user?.id && props.creatorId !== undefined) {
      axios
        .get(
          `${apiUrl}/user/${props.session.user.id}/is-following?creator_id=${props.creatorId}`
        )
        .then((res) => {
          setIsFollowed(res.data.payload);
        });
    }
  }, [props.session]);

  const followButton = () => {
    return (
      <button
        className="uppercase transition  bg-gray-800 text-sm text-white hover:bg-gray-600 px-4 py-2 rounded-md "
        onClick={followCreator}
      >
        Follow{" "}
      </button>
    );
  };

  const unfollowButton = () => {
    return (
      <button
        className="uppercase transition  bg-red-500 text-sm text-white hover:bg-gray-600 px-4 py-2 rounded-md "
        onClick={unfollow}
      >
        Unfollow{" "}
      </button>
    );
  };

  const followCreator = () => {
    if (props.session != null) {
      Swal.fire({
        title: "Follow",
        text: "Are you sure want to follow?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Follow",
      }).then((result) => {
        if (result.isConfirmed) {
          submitFollow();
        }
      });
    } else {
      Swal.fire({
        title: "Failed",
        html: "Please log in to your account!",
        icon: "error",
        confirmButtonText: "Login",
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/sign-in");
        }
      });
    }
  };

  const unfollow = () => {
    if (props.session != null) {
      Swal.fire({
        title: "Unfollow",
        text: "Are you sure want to unfollow?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Unfollow",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`${apiUrl}/user/unfollow`, {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              data: {
                userId: props.session.user.id,
                creatorId: props?.creatorId,
              },
            })
            .then((res) => {
              setIsFollowed(false);

              Swal.fire({
                title: "Unfollowed!",
                html: "You unfollowed this creator.",
                icon: "success",
              });
            })
            .catch((error) => {
              Swal.fire("Error", "Something gone wrong!.", "error");
            });
        }
      });
    }
  };

  type FollowCreator = {
    userId: BigInteger;
    creatorId: BigInteger;
  };

  async function submitFollow() {
    try {
      // 👇️ const data: FollowCreator
      //@ts-ignore
      const { data } = await axios
        .post<FollowCreator>(
          `${apiUrl}/user/follow`,
          { userId: props.session.user.id, creatorId: props?.creatorId },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setIsFollowed(true);
          Swal.fire({
            title: "Success!",
            html: "Follow Success!",
            icon: "success",
          }).catch((error) => {
            Swal.fire("Error", "Follow Failed!", "error");
          });
        })
        .catch((err) => {
          Swal.fire({
            title: "Failed",
            html: err.response.data.message,
            icon: "error",
          });
        });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error message: ", error.message);
        // 👇️ error: AxiosError<any, any>
        return error.message;
      } else {
        console.log("unexpected error: ", error);
        return "An unexpected error occurred";
      }
    }
  }

  // return (
  //     <button className="uppercase transition  bg-gray-800 text-sm text-white hover:bg-gray-600 px-4 py-2 rounded-md "
  //         onClick={followCreator}>Follow </button>
  // );

  if (isFollowed) {
    return unfollowButton();
  } else {
    return followButton();
  }
};
