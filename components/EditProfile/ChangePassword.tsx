import axios from "axios";
import { Field, Form, Formik } from "formik";
import React from "react";
import ReactDOM from "react-dom";
import { renderToStaticMarkup } from "react-dom/server";
import Swal from "sweetalert2";

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
            axios.put(
              `${process.env.API_URL}user/${props.user.username}/profile/change-password`,
              values
            );
          }}
        >
          <Form>
            <div className="flex flex-col gap-3">
              <Field
                name="oldPassword"
                type="password"
                placeholder="Old Password"
              />
              <Field
                name="newPassword"
                type="password"
                placeholder="New Password"
              />
              <Field
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
              />
              <button type="submit">Change Password</button>
            </div>
          </Form>
        </Formik>
      </>
    );
  }
  function changePassword() {
    Swal.fire({
      title: "Change your password",
      html: form,
      showConfirmButton: false,
    });
  }

  const form = document.createElement("div");
  let staticElement = renderToStaticMarkup(<PasswordForm />);
  form.innerHTML = `<div>${staticElement}</div>`;
  return (
    <div>
      <div
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
        onClick={changePassword}
      >
        Change Password
      </div>
    </div>
  );
}
