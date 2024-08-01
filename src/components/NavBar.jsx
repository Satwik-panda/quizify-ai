import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthenticationContext } from "../context/QuizAuthentication";
import axios from "axios";
import Lottie from "react-lottie";
import successData from "../../public/animations/success.json";
import failureData from "../../public/animations/fail.json";
import Modal from "./404/Modal";

import {
  FaHome,
  FaHistory,
  FaUser,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";

const createLottieOptions = (animationData) => ({
  loop: true,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
});

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const {
    modal,
    setModal,
    modalMessage,
    setModalMessage,
    responseStatus,
    setResponseStatus,
  } = useContext(AuthenticationContext);

  const url_key = import.meta.env.VITE_APP_URL;

  const successOptions = createLottieOptions(successData);
  const failureOptions = createLottieOptions(failureData);

  const modalClose = () => {
    setModal(false);
    if (responseStatus === true) {
      navigate("/");
    }
  };

  const session_id = localStorage.getItem("session_id");
  if (localStorage.getItem("username")) {
    var username = localStorage.getItem("username");
  }

  if (username != null) {
    username = username.toUpperCase();
  }

  let logedIn = session_id ? true : false;

  function handleLogOut(e) {
    e.preventDefault();
    console.log("logging out");
    const formData = { session_id };
    console.log(JSON.stringify(formData));

    axios
      .post(`${url_key}/logout`, formData)
      .then((response) => {
        if (response.data.status === true) {
          logedIn = false;
          localStorage.removeItem("session_id");
          localStorage.removeItem("username");
          localStorage.removeItem("email");
          setModalMessage("Logged out successfully!");
          setResponseStatus(true);
          setModal(true);
        } else {
          console.log("error:", response.data.message);
          setModalMessage("Logout failed. Please try again.");
          setResponseStatus(false);
          setModal(true);
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
        setModalMessage(error);
        setResponseStatus(false);
        setModal(true);
      });
  }

  let root_div_class;
  const button_class =
    "group cursor-pointer hover:text-white hover:shadow-[3px_3px_0_#FBC638] hover:bg-[#6225E6] hover:scale-110 w-9 hover:w-24 text-xl transition-all duration-300 flex items-center rounded-full p-2 relative";

  if (path === "/")
    root_div_class =
      "flex px-8 py-4 gap-4 md:justify-end justify-center min-w-screen text-white md:text-black";
  else
    root_div_class =
      "flex flex-col sm:flex-row px-8 py-4 gap-4 justify-between min-w-screen bg-waves-svg bg-no-repeat bg-cover bg-center";

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

      <div className={root_div_class}>
        {path !== "/" && (
          <h1
            className="text-5xl font-semibold flex items-center justify-center hover:cursor-pointer "
            onClick={() => navigate("/")}
          >
            <span className="text-[#000000]">Quizify </span>
            <span className="text-[#dcdc45] ml-1 rounded-2xl">AI</span>
          </h1>
        )}
        {logedIn ? (
          <div className="relative z-10 flex p-4 gap-6 font-semibold md:justify-end justify-center items-center">
            {/* <div className="flex gap-3 md:gap-8 p-3 bg-[#f5f5f5cc] rounded-lg shadow-md items-center w-full max-w-md md:max-w-lg lg:max-w-xl"> */}

            {path !== "/" && (
              <button onClick={() => navigate("/")} className={button_class}>
                <FaHome />
                <span className="absolute opacity-0 group-hover:opacity-100 -right-5 group-hover:right-5 text-sm text-white text-center transition-all duration-300">
                  Home
                </span>
              </button>
            )}
            <span onClick={() => navigate("/history")} className={button_class}>
              <FaHistory />
              <span className="absolute opacity-0 group-hover:opacity-100 -right-5 group-hover:right-4 text-sm text-white text-center transition-all duration-300">
                History
              </span>
            </span>
            <span onClick={() => navigate("/profile")} className={button_class}>
              <FaUser />
              <span className="absolute opacity-0 group-hover:opacity-100 -right-5 group-hover:right-5 text-sm text-white text-center transition-all duration-300">
                Profile
              </span>
            </span>
            <span onClick={handleLogOut} className={button_class}>
              <FaSignOutAlt />
              <span className="absolute opacity-0 group-hover:opacity-100 -right-5 group-hover:right-4 text-sm text-white text-center transition-all duration-300">
                LogOut
              </span>
            </span>

            {/* </div> */}
          </div>
        ) : (
          <div className="relative z-10 flex p-4  gap-6 font-semibold md:justify-end justify-center items-center">
            {/* <div className="flex gap-5 md:gap-8 p-4 bg-[#f5f5f5cc] rounded-lg shadow-md items-center w-full max-w-md md:max-w-lg lg:max-w-xl"> */}
            {path !== "/" && (
              <button onClick={() => navigate("/")} className={button_class}>
                <FaHome />
                <span className="absolute opacity-0 group-hover:opacity-100 -right-5 group-hover:right-4 text-sm text-white text-center transition-all duration-300">
                  Home
                </span>
              </button>
            )}
            <button
              href="/login"
              onClick={() => navigate("/login")}
              className={button_class}
            >
              <FaSignInAlt />
              <span className="absolute opacity-0 group-hover:opacity-100 -right-5 group-hover:right-5 text-sm text-white text-center transition-all duration-300">
                LogIn
              </span>
            </button>
            <button
              href="/signup"
              onClick={() => navigate("/signup")}
              className={button_class}
            >
              <FaUserPlus />
              <span className="absolute opacity-0 group-hover:opacity-100 -right-5 group-hover:right-4 text-sm text-white text-center transition-all duration-300">
                SignUp
              </span>
            </button>
            {/* </div> */}
          </div>
        )}
      </div>
    </>
  );
}

export default NavBar;
