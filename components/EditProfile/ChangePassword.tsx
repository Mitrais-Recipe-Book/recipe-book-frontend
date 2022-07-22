import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import Swal from "sweetalert2";
import SweetAlert2 from "react-sweetalert2";

interface Props {
  user: {
    id: number;
    username: string;
  };
}

export default function ChangePassword(props: Props) {
  function PasswordForm() {
    return (
      <>
        <Formik
          initialValues={{
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          }}
          onSubmit={(values) => {
            axios
              .put(
                `${process.env.API_URL}user/${props.user.username}/profile/change-password`,
                values
              )
              .then((res) => {
                Swal.fire({
                  title: "Success",
                  text: "Password updated successfully",
                  icon: "success",
                }).then(() => {
                  setSwalProps({ ...swalProps, show: false });
                });
              })
              .catch((err) => {
                Swal.fire({
                  title: "Error",
                  text: err.response.data.message,
                  icon: "error",
                }).then(() => {
                  setSwalProps({ ...swalProps, show: false });
                });
              });
          }}
          validationSchema={Yup.object({
            oldPassword: Yup.string().required("Required"),
            newPassword: Yup.string().required("Required").min(6, "Too short"),
            confirmPassword: Yup.string()
              .required("Required")
              .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
          })}
        >
          {(props) => (
            <Form>
              <div className="flex flex-col gap-3">
                <Field
                  className="p-2"
                  name="oldPassword"
                  type="password"
                  placeholder="Old Password"
                />
                <ErrorMessage
                  className="text-red-500"
                  component="div"
                  name="oldPassword"
                />
                <Field
                  className="p-2"
                  name="newPassword"
                  type="password"
                  placeholder="New Password"
                />
                <ErrorMessage
                  className="text-red-500"
                  component="div"
                  name="newPassword"
                />
                <Field
                  className="p-2"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                />
                <ErrorMessage
                  className="text-red-500"
                  component="div"
                  name="confirmPassword"
                />
                <button
                  className="bg-red-500 hover:bg-red-700 disabled:bg-gray-500 text-white font-bold py-2 px-4 rounded cursor-pointer"
                  type="submit"
                  disabled={
                    !props.isValid || props.isSubmitting || !props.dirty
                  }
                >
                  Change Password
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  }
  function changePassword() {
    setSwalProps({ ...swalProps, show: true });
  }

  const [swalProps, setSwalProps] = useState({
    show: false,
    title: "Change Your Password",
    showConfirmButton: false,
  });

  return (
    <div>
      <div
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
        onClick={changePassword}
      >
        Change Password
      </div>
      <SweetAlert2
        {...swalProps}
        didClose={() => {
          setSwalProps({ ...swalProps, show: false });
        }}
      >
        <>
          <PasswordForm />
        </>
      </SweetAlert2>
    </div>
  );
}
