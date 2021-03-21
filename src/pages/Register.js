import { Field, Form, Formik, ErrorMessage } from "formik";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import firebase from "../config/firebase";
import * as Yup from "yup";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(value, formikBag) => {
        // To avoid users click the button many times
        if (isLoading) return;

        setIsLoading(true);
        firebase
          .auth()
          .createUserWithEmailAndPassword(value.email, value.password)
          .then((res) => {
            setIsLoading(false);

            return <Redirect to="/" exact />;
          })
          .catch((err) => {
            setIsLoading(false);

            formikBag.setFieldError("email", err.message);
          });
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .required("Email is required")
          .email("Email is invalid"),
        password: Yup.string()
          .required("Password is required")
          .min(6, "Password must be longer than 6"),
      })}
    >
      <div className="flex h-screen bg-gradient-to-br from-purple-300 to-red-200 ">
        <div className="m-auto text-3xl p-10 bg-gradient-to-l rounded-br-full rounded-tl-full text-center w-3/4 md:w-1/2 lg:w-1/3 m-5">
          <h1 className="mb-10 text-5xl text-white">Register</h1>

          <Form>
            <div>
              <ErrorMessage
                className="text-xl text-left text-red-600"
                name="email"
                component="div"
              />
              <Field
                className="border mb-10 rounded-xl p-4 w-full text-indigo-500 text-xl"
                type="email"
                name="email"
                placeholder="Email or Username"
              ></Field>
            </div>
            <div>
              <ErrorMessage
                className="text-xl text-left text-red-600"
                name="password"
                component="div"
              />
              <Field
                className="border mb-10 rounded-xl p-4 w-full text-indigo-500 text-xl"
                type="password"
                name="password"
                placeholder="Password"
              ></Field>
            </div>
            <div>
              <button
                className="bg-yellow-500 border mb-10 rounded-xl p-4 text-white w-full font-bold bg-gradient-to-tl from-indigo-500 to-pink-400"
                type="submit"
              >
                {isLoading ? (
                  <i className="fas fa-spinner fa-spin text-5xl"></i>
                ) : (
                  "Register"
                )}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </Formik>
  );
}
