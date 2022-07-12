import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import ChangePP from "@components/EditProfile/ChangePP";
import { useSession } from "next-auth/react";
import ChangePassword from "@components/EditProfile/ChangePassword";
import axios from "axios";
import Swal from "sweetalert2";

interface UserInfo {
  id: number;
  email: string;
  username: string;
  fullName: string;
  roles: string[];
}

export default function editprofile() {
  const { data: session }: any = useSession();
  const [userInfo, setUserInfo] = useState<UserInfo>();
  useEffect(() => {
    if (session) {
      axios
        .get(`${process.env.API_URL}user/${session?.user.username}/profile`)
        .then((res) => {
          setUserInfo(res.data.payload);
        });
    }
  }, [session]);
  return (
    <>
      <Navbar />
      <main className="container mx-auto pt-1">
        <div className="container w-3/4 mx-auto pt-1">
          <section className="my-2 py-3 rounded-md bg-white drop-shadow-lg">
            <h1 className="text-4xl text-center mb-3 font-bold">
              Edit Profile
            </h1>
            {userInfo ? (
              <Formik
                initialValues={{
                  email: userInfo?.email,
                  fullName: userInfo?.fullName,
                }}
                onSubmit={(values) => {
                  axios
                    .put(
                      `${process.env.API_URL}user/${session?.user.username}/profile`,
                      values
                    )
                    .then((res) => {
                      Swal.fire({
                        title: "Success",
                        text: "Profile updated successfully",
                        icon: "success",
                      });
                    });
                }}
                validationSchema={Yup.object({
                  email: Yup.string().email("Please fill a valid email"),
                  fullName: Yup.string().required("Full name is required"),
                })}
              >
                {(props) => (
                  <div className="py-4 px-10">
                    <ChangePP username={session?.user.username} />
                    <Form>
                      <div className="grid grid-cols-4  gap-2 my-4">
                        <label>Email</label>
                        <Field
                          name="email"
                          as="input"
                          className=" bg-white text-gray-700 border border-gray-400 p-2 rounded grow col-span-3"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="col-span-4 text-red-500"
                        />

                        <label>Fullname</label>
                        <Field
                          name="fullName"
                          as="input"
                          className=" bg-white text-gray-700 border border-gray-400 p-2 rounded grow col-span-3"
                        />
                        <ErrorMessage
                          name="fullName"
                          component="div"
                          className="col-span-4 text-red-500"
                        />
                        <label>Change Password</label>
                        <div className="grid-flow-col">
                          <ChangePassword />
                        </div>
                      </div>
                      <button
                        className="bg-red-500 hover:bg-red-700 disabled:bg-gray-500 text-white font-bold py-1 px-8 rounded cursor-pointer disabled:cursor-default"
                        type="submit"
                        disabled={
                          !props.isValid || props.isSubmitting || !props.dirty
                        }
                      >
                        SAVE
                      </button>
                    </Form>
                  </div>
                )}
              </Formik>
            ) : (
              <div className="py-4 px-10">Loading...</div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
