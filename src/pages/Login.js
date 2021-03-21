import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import firebase from "../config/firebase";

export default function Login() {
  const [isLoading, setIsLoading] = useState(null);
  const [errors, setErrors] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  function onFormSubmit(e) {
    if (isLoading) return;

    e.preventDefault();
    setIsLoading(true);

    firebase
      .auth()
      .signInWithEmailAndPassword(form.email, form.password)
      .then((res) => {
        setMessage("Login successfully.");
        setIsLoggedIn(true);
        setErrors(false);
        setIsLoading(false);
      })
      .catch((error) => {
        setMessage(error.message);
        setErrors(true);
        setIsLoading(false);
      });
  }

  function onInputChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  if (isLoggedIn) return <Redirect to="/" exact />;

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-300 to-red-200 ">
      <div className="m-auto text-3xl p-10 bg-gradient-to-l rounded-br-full rounded-tl-full text-center w-3/4 md:w-1/2 lg:w-1/3 m-5">
        <h1 className="mb-10 text-5xl text-white">Login</h1>
        {message ? (
          <div
            className={`text-left mb-5 text-white p-5 text-xl ${
              errors ? "bg-red-400" : "bg-green-400"
            }`}
          >
            {message}
          </div>
        ) : null}
        <form onSubmit={onFormSubmit}>
          <div>
            <input
              className="border mb-10 rounded-xl p-4 w-full text-indigo-500 text-xl"
              type="email"
              name="email"
              onChange={onInputChange}
              value={form.email}
              placeholder="Email or Username"
            ></input>
          </div>
          <div>
            <input
              className="border mb-10 rounded-xl p-4 w-full text-indigo-500 text-xl"
              type="password"
              name="password"
              onChange={onInputChange}
              value={form.password}
              placeholder="Password"
            ></input>
          </div>
          <div>
            <button
              className="bg-yellow-500 border mb-10 rounded-xl p-4 text-white w-full font-bold bg-gradient-to-tl from-indigo-500 to-pink-400"
              type="submit"
            >
              {isLoading ? (
                <i className="fas fa-spinner fa-spin text-5xl"></i>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
