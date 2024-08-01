import React, { useContext, useState } from "react";
import Lottie from "react-lottie";
import animationData from "../../../public/animations/login-lottie.json";
import successData from "../../../public/animations/success.json";
import failureData from "../../../public/animations/fail.json";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthenticationContext } from "../../context/QuizAuthentication";
import Modal from "../404/Modal";

function Login() {
  const navigate = useNavigate();
  const {
    logedIn,
    setLogedIn,
    modal,
    setModal,
    modalMessage,
    setModalMessage,
    responseStatus,
    setResponseStatus,
  } = useContext(AuthenticationContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createLottieOptions = (animationData, loop = true) => ({
    loop,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  });

  const defaultOptions = createLottieOptions(animationData);
  const successOptions = createLottieOptions(successData, false);
  const failureOptions = createLottieOptions(failureData, false);

  const modalClose = () => {
    setModal(false);
    if (responseStatus === true) {
      navigate("/");
    }
  };
  const url_key = import.meta.env.VITE_APP_URL;
  console.log("url key in login !", url_key);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      email,
      password,
    };
    console.log(JSON.stringify(formData));

    axios
      .post(`${url_key}/login`, formData)
      .then((response) => {
        console.log(response.data);
        setModalMessage(response.data.message);
        setResponseStatus(response.data.status);
        if (!localStorage.getItem("username")) {
          localStorage.setItem("username", response.data.username);
        }
        if (!localStorage.getItem("email")) {
          localStorage.setItem("email", response.data.email);
        }
        setModal(true);
        if (response.data.status === true) {
          if (!localStorage.getItem("session_id")) {
            localStorage.setItem("session_id", response.data.session_id);
          }
          setLogedIn(true);
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
        setModalMessage(error);
        setResponseStatus(false);
        setModal(true);
      });
  };

  return (
    <>
      {modal && (
        <Modal
          show={modal}
          img={
            <Lottie
              options={
                responseStatus === true ? successOptions : failureOptions
              }
              className="object-cover h-full w-full p-3 z-1000"
            />
          }
          message={modalMessage}
          onClose={modalClose}
        />
      )}

      <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-[#ecf0f4]">
        <div className="md:w-1/2 flex items-center justify-center p-4 md:p-0">
          <Lottie
            options={defaultOptions}
            className="object-cover h-32 w-32 md:h-full md:w-full p-3"
          />
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12 bg-[#f9f9f9] rounded-3xl">
          <div className="w-full max-w-md space-y-8">
            <div>
              <h2 className="mt-6 text-center text-xl font-bold text-stone-700 font-serif">
                Log in to your account
              </h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm space-y-px">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
                <div className="mt-3">
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Log In
                </button>
              </div>
              <div className="inline-flex items-center justify-center w-full">
                <hr className="w-64 h-px my-8 bg-black border-2" />
                <span className="absolute px-3 font-medium bg-white rounded-full">
                  OR
                </span>
              </div>
              <div className="flex justify-around items-center">
                <button className="flex flex-row items-center">
                  Login with
                  <svg
                    className="ml-2"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="25"
                    preserveAspectRatio="xMidYMid"
                    viewBox="0 0 256 262"
                    id="google"
                  >
                    <path
                      fill="#4285F4"
                      d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                    ></path>
                    <path
                      fill="#34A853"
                      d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                    ></path>
                    <path
                      fill="#FBBC05"
                      d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                    ></path>
                    <path
                      fill="#EB4335"
                      d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                    ></path>
                  </svg>
                </button>
                <button className="flex flex-row items-center">
                  Login with
                  <svg
                    className="ml-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 42 32"
                    id="github"
                    width="34"
                    height="34"
                  >
                    <linearGradient
                      id="a"
                      x1="16"
                      x2="16"
                      y1="32"
                      y2="0"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0" stopColor="#ff2d76"></stop>
                      <stop offset="1" stopColor="#fb0000"></stop>
                    </linearGradient>
                    <path
                      fill="url(#a)"
                      d="M21.806 32h-8.529s.012-2.531 0-4.267c-5.838 1.257-7.467-3.2-7.467-3.2-1.067-2.133-2.133-3.2-2.133-3.2-2.133-1.267 0-1.067 0-1.067 2.133 0 3.2 2.133 3.2 2.133 1.872 3.179 5.203 2.667 6.4 2.133 0-1.067.467-2.679 1.067-3.2-4.659-.525-8.538-3.2-8.538-8.533s1.071-6.4 2.138-7.467C7.728 4.807 6.835 2.864 7.976 0c0 0 2.096 0 4.229 3.2 1.057-1.057 4.267-1.067 5.334-1.067 1.065 0 4.275.01 5.331 1.067C25.005 0 27.106 0 27.106 0c1.14 2.864.249 4.807.032 5.333 1.067 1.067 2.133 2.133 2.133 7.467s-3.873 8.009-8.533 8.533c.601.521 1.067 2.356 1.067 3.2V32h.001z"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="text-sm text-center">
                <p>
                  Don't have an account?{" "}
                  <a
                    href="/signup"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                    onClick={() => navigate("/signup")}
                  >
                    Sign Up
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
