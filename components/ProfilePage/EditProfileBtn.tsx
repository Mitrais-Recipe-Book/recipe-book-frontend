import { useRouter } from "next/router";

export default function EditProfileBtn(props: any) {
    const router = useRouter()
    return (
        <button className="uppercase transition  bg-gray-800 text-sm text-white hover:bg-gray-600 px-4 py-2 rounded-md " onClick={()=> {router.push("/edit-profile")}}>Edit Profile </button>
    );
}