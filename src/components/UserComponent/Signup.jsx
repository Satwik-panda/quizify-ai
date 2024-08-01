import React, { useState, useContext } from "react";
import Lottie from "react-lottie";
import animationData from "../../../public/animations/signup.json";
import successData from "../../../public/animations/success.json";
import failureData from "../../../public/animations/fail.json";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthenticationContext } from "../../context/QuizAuthentication";
import Modal from "../404/Modal";

function Signup() {
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

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const createLottieOptions = (animationData, loop = true) => ({
    loop,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  });
  const url_key = import.meta.env.VITE_APP_URL;

  const defaultOptions = createLottieOptions(animationData);
  const successOptions = createLottieOptions(successData, false);
  const failureOptions = createLottieOptions(failureData, false);

  const modalClose = () => {
    setModal(false);
    if (responseStatus === true) {
      navigate("/");
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setModalMessage("Passwords don't match!");
      setResponseStatus(false);
      setModal(true);
      return;
    }

    const formData = {
      username,
      email,
      password,
    };
    console.log("form data submiting while signup:---------", formData);
    axios
      .post(`${url_key}/signup`, formData)
      .then((response) => {
        console.log("response from backend while signup:------", response.data);
        setModalMessage(response.data.message);
        setResponseStatus(response.data.status);
        setModal(true);
        if (response.data.status === true) {
          if (!localStorage.getItem("session_id")) {
            localStorage.setItem("session_id", response.data.session_id);
          }
          if (!localStorage.getItem("email")) {
            localStorage.setItem("email", response.data.email);
          }
          if (!localStorage.getItem("username")) {
            localStorage.setItem("username", response.data.username);
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
  }

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
                Create your account
              </h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm space-y-px">
                <div>
                  <label htmlFor="username" className="sr-only">
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                  />
                </div>
                <div className="mt-3">
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mt-3">
                  <label htmlFor="confirm-password" className="sr-only">
                    Confirm Password
                  </label>
                  <input
                    id="confirm-password"
                    name="confirmPassword"
                    type="password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign Up
                </button>
              </div>
              <div className="text-sm text-center">
                <p>
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                    onClick={() => navigate("/login")}
                  >
                    LogIn
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

export default Signup;
