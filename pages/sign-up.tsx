import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Swal from 'sweetalert2'

export default function SignUp() {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [passwordConf, setPasswordConf] = useState("");
    const [userData, setUserData] = useState({ email: "", username: "", fullName: "", password: "" });
    const [passwordValid, setPasswordValid] = useState(false);

    //RegEx
    //Password must contain at least one lowercase letter, one number, and one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const validatePassword = (pass: string) => {
        passwordRegex.test(pass) ? setPasswordValid(true) : setPasswordValid(false);
    }

    const createUser = (event: React.SyntheticEvent) => {
        event.preventDefault();
        console.log(userData);
        submitForm();
    }

    type CreateUserResponse = {
        email: string;
        username: string;
        fullName: string;
        password: string;
    };

    async function submitForm() {
        try {
            Swal.fire({
                title: 'Loading...',
                didOpen: () => {
                    Swal.showLoading()
                }
            })
            //@ts-ignore
            const { data } = await axios.post<CreateUserResponse>(
                'https://recipyb-dev.herokuapp.com/auth/sign-up',
                { email: userData.email, username: userData.username, password: userData.password, fullName: userData.fullName },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                },
            ).then((res) => {
                Swal.fire({
                    title: 'Success!',
                    html: 'Sign-up success, please sign-in.',
                    icon: 'success',
                })
                router.push({
                    pathname: "/sign-in",
                    query: {
                        create: "success"
                    }

                })
                    .catch(error => {
                        Swal.fire(
                            'Error',
                            'Sign-up error please check your data',
                            'error'
                        )
                    });

            }).catch(error => {
                Swal.fire(
                    'Error',
                    error.response.data.message,
                    'error'
                )
            });

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

    return (
        <div className="min-h-screen flex items-stretch text-white">
            <div
                className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center 
      bg-[url('https://images.unsplash.com/photo-1504387828636-abeb50778c0c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')]"
            >
                <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
                <div className="w-full px-24 z-10 flex flex-col">
                    <div className="flex flex-row">
                        <Image
                            src="/images/bibimbap192x192.png"
                            alt="RecipyBook"
                            width={50}
                            height={50}
                            objectFit="cover"
                        />
                        <h1 className="text-5xl ml-4 font-bold text-left tracking-wide font-logo">
                            Recipy Book
                        </h1>
                    </div>
                    <p className="text-3xl my-4 font-logo pl-20">Cook with us!</p>
                </div>
                <div className="bottom-0 absolute p-4 text-center right-0 left-0 flex justify-center space-x-4"></div>
            </div>
            <div className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0 bg-gray-900">
                <div
                    className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center 
        bg-[url('https://images.unsplash.com/photo-1608266400306-3e699423dc53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')]"
                >
                    <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
                </div>
                <div className="w-full py-6 z-20">
                    <div className="lg:hidden flex flex-row text-center justify-center">
                        <Image
                            src="/images/bibimbap192x192.png"
                            alt="RecipyBook"
                            width={50}
                            height={50}
                            objectFit="cover"
                        />
                        <h1 className="text-5xl font-bold text-left tracking-wide font-logo">
                            Recipy Book
                        </h1>
                    </div>
                    <h1 className="my-6 text-3xl font-bold">Sign Up</h1>
                    <form onSubmit={createUser} method="POST" className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto">
                        <div className="pb-2 pt-4">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                                required
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserData({ ...userData, [e.target.name]: e.target.value })}
                                className="block w-full p-4 text-gray-900 leading-tight focus:outline-orange-400 text-lg rounded-sm bg-slate"
                            />
                        </div>
                        <div className="pb-2 pt-4">
                            <input
                                type="text"
                                name="fullName"
                                id="fullName"
                                required
                                placeholder="Full Name"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserData({ ...userData, [e.target.name]: e.target.value })}
                                className="block w-full p-4 text-gray-900 leading-tight focus:outline-orange-400 text-lg rounded-sm bg-slate"
                            />
                        </div>
                        <div className="pb-2 pt-4">
                            <input
                                type="text"
                                name="username"
                                id="username"
                                required
                                placeholder="Username"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserData({ ...userData, [e.target.name]: e.target.value })}
                                className="block w-full p-4 text-gray-900 leading-tight focus:outline-orange-400 text-lg rounded-sm bg-slate"
                            />
                        </div>
                        <div className="pb-2 pt-4">
                            <input
                                className="block w-full p-4 text-gray-900 leading-tight focus:outline-orange-400 text-lg rounded-sm bg-slate"
                                type="password"
                                name="password"
                                id="password"
                                required
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setPassword(e.target.value);
                                    setUserData({ ...userData, ["password"]: e.target.value });
                                    validatePassword(e.target.value);
                                }}
                                placeholder="Password"
                            />
                        </div>
                        {(password != passwordConf && passwordConf.length > 0) &&
                            <div className="text-red-600">
                                <small>The password confirmation does not match</small>
                            </div>}
                        {(password.length > 0 && password.length < 8) &&
                            <div className="text-red-600">
                                <small>Password must contain at least 8 character</small>
                            </div>}
                        {(!passwordValid && password.length > 0) && <div className="text-red-600"><small>Password must contain at least one letter, one number, and one special character</small></div>}
                        <div className="pb-2 pt-4">
                            <input
                                className="block w-full p-4 text-gray-900 leading-tight focus:outline-orange-400 text-lg rounded-sm bg-slate"
                                type="password"
                                name="confirm-password"
                                id="confirm-password"
                                required
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setPasswordConf(e.target.value)
                                }}
                                placeholder="Confirm Password"
                            />
                        </div>
                        <div className="text-right text-gray-400 hover:underline hover:text-gray-100">
                            <a href="/sign-in">Already have account? Sign in here</a>
                        </div>
                        <div className="px-4 pb-2 pt-4">
                            <button type="submit" className="uppercase block w-full p-4 text-lg rounded-full bg-orange-400 hover:bg-orange-500 focus:outline-none">
                                sign up
                            </button>
                        </div>

                        <div className="p-4 text-center right-0 left-0 flex justify-center space-x-4 mt-16 lg:hidden ">
                            <a href="#">
                                <svg
                                    fill="#fff"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                </svg>
                            </a>
                            <a href="#">
                                <svg
                                    fill="#fff"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                                </svg>
                            </a>
                            <a href="#">
                                <svg
                                    fill="#fff"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
