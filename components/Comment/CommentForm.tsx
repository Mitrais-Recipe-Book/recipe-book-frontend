import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

interface CommentFormProps {
  recipeId: number | undefined;
  username: string;
}

export default function CommentForm(props: CommentFormProps) {
  return (
    <Formik
      initialValues={{ comment: "" }}
      onSubmit={(values) => {
        axios
          .post(process.env.API_URL + `recipe/${props.recipeId}/comment/add`, {
            comment: values.comment,
            username: props.username,
          })
          .then((res) => {
            console.log(res);
            console.log(props.username);
          });
        console.log(values.comment);
      }}
      validationSchema={Yup.object({
        comment: Yup.string()
          .required("Comment is required to comment")
          .max(140, "Comment is too long"),
      })}
    >
      {(props) => (
        <Form className="flex flex-col gap-2">
          <div className="flex flex-row">
            <Field
              name="comment"
              as="textarea"
              className=" bg-white text-gray-700 border border-gray-400 p-2 rounded grow"
            />
          </div>
          <div className="flex flex-row place-content-end">
            {props.errors.comment === "Comment is too long" ? (
              <ErrorMessage className="grow" name="comment" component="div" />
            ) : null}
            <p className="place-self-end px-3">
              {props.values.comment.length}/140
            </p>
            <button
              className="bg-red-500 hover:bg-red-700 disabled:bg-gray-500 text-white font-bold py-1 px-8 rounded cursor-pointer disabled:cursor-default"
              type="submit"
              disabled={!props.isValid}
            >
              POST
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
