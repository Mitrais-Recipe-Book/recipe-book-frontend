import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import React from "react";

export default function editprofile() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto pt-1">
        <div className="container w-3/4 mx-auto pt-1">
          <section className="my-2 py-3 rounded-md bg-white drop-shadow-lg">
            <h1 className="text-4xl text-center mb-3 font-bold">
              Edit Profile
            </h1>
            <Formik
              initialValues={{
                email: "",
                fullName: "",
              }}
              onSubmit={(values) => {
                console.log("first");
                console.log(values);
              }}
              validationSchema={Yup.object({
                email: Yup.string().email("Please fill a valid email"),
                fullName: Yup.string().required("Full name is required"),
              })}
            >
              {(props) => (
                <div className="py-4 px-10">
                  <Form>
                    <div className="grid grid-cols-4 gap-2 my-4">
                      <label className="grid-col-1">Email</label>
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

                      <label className="grid-col-1">Fullname</label>
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
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
