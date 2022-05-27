import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

export const FollowBtn = (props: any) => {
    const apiUrl = "https://recipyb-dev.herokuapp.com/api/v1"
    const router = useRouter()

    const followCreator = () => {
        if (props.session != null) {
            Swal.fire({
                title: 'Follow',
                text: "Are you sure want to follow?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Follow',
            }).then((result) => {
                if (result.isConfirmed) {
                    submitFollow();
                }
            })
        } else {
            Swal.fire({
                title: 'Failed',
                html: 'Please log in to your account!',
                icon: 'error',
                confirmButtonText: "Login",
                showCancelButton: true

            }).then((result) => {
                if (result.isConfirmed) {
                    router.push("/sign-in")
                }
            })
        }
    }

    type FollowCreator = {
        userId: BigInteger;
        creatorId: BigInteger;
    };

    async function submitFollow() {
        try {
            // 👇️ const data: FollowCreator
            //@ts-ignore
            const { data } = await axios.post<FollowCreator>(
                `${apiUrl}/user/follow`,
                { userId: props.session.user.id, creatorId: props?.creatorId },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                },
            ).then((res) => {
                Swal.fire({
                    title: 'Success!',
                    html: 'Follow Success!',
                    icon: 'success',
                }).catch(error => {
                    Swal.fire(
                        'Error',
                        'Follow Failed!',
                        'error'
                    )
                });

            }).catch((err) => {
                Swal.fire({
                    title: 'Failed',
                    html: err.response.data.message,
                    icon: 'error',
                })
            }
            );
            return data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log('error message: ', error.message);
                // 👇️ error: AxiosError<any, any>
                return error.message;
            } else {
                console.log('unexpected error: ', error);
                return 'An unexpected error occurred';
            }
        }
    }

    return (<button className="uppercase transition  bg-gray-800 text-sm text-white hover:bg-gray-600 px-4 py-2 rounded-md " onClick={followCreator}>Follow </button>);
}