import React, { useContext, useEffect, useState } from "react";
import NavBar from "../NavBar";
import axios from "axios";
import { AuthenticationContext } from "../../context/QuizAuthentication";
import Modal from "../404/Modal";
import Lottie from "react-lottie";
import { FaEdit } from "react-icons/fa"; // Import the Font Awesome edit icon
import profileAnimation from "../../../public/animations/profile.json";
import passwordAnimation from "../../../public/animations/password.json";
import successAnimation from "../../../public/animations/success.json";
import failureAnimation from "../../../public/animations/fail.json";

const createLottieOptions = (animationData) => ({
  loop: true,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
});

function Profile() {
  const { modalMessage, setModalMessage, responseStatus, setResponseStatus } =
    useContext(AuthenticationContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [totalQuiz, setTotalQuiz] = useState();
  const [changeP, setChangeP] = useState(false);
  const [change_username, setChangeUsername] = useState(false);
  const [closeModal, setCloseModal] = useState(false);

  const defaultOptions = createLottieOptions(profileAnimation);
  const passwordOptions = createLottieOptions(passwordAnimation);
  const successOptions = createLottieOptions(successAnimation);
  const failureOptions = createLottieOptions(failureAnimation);

  const url_key = import.meta.env.VITE_APP_URL;

  useEffect(() => {
    const email = localStorage.getItem("email");

    if (email) {
      axios
        .get(`${url_key}/fetch_user`, { params: { email: email } })
        .then((response) => {
          setUsername(response.data.username);
          setEmail(response.data.email);
          if (response.data.quizzes) setTotalQuiz(response.data.quizzes.length);
          else setTotalQuiz(0);
        })
        .catch((error) => {
          setModalMessage("Failed to fetch user data.");
          setResponseStatus(false);
          setCloseModal(true);
        });
    } else {
      setModalMessage("No session ID found.");
      setResponseStatus(false);
      setCloseModal(true);
    }
  }, []);

  const handleChangePassword = () => {
    const session_id = localStorage.getItem("session_id");
    axios
      .post(`${url_key}/change_password`, {
        session_id,
        current_password: currentPassword,
        new_password: newPassword,
      })
      .then(() => {
        setModalMessage("Password updated successfully!");
        setResponseStatus(true);
        setCloseModal(true);
      })
      .catch((error) => {
        setModalMessage(
          "Error updating password: " + error.response.data.message
        );
        setResponseStatus(false);
        setCloseModal(true);
      });
    setChangeP(false);
    setCurrentPassword("");
    setNewPassword("");
  };

  const handleChangeUsername = () => {
    const session_id = localStorage.getItem("session_id");
    axios
      .post(`${url_key}/change_username`, {
        session_id,
        new_username: newUsername,
      })
      .then(() => {
        setModalMessage("Username updated successfully!");
        localStorage.setItem("username", newUsername);
        setResponseStatus(true);
        setCloseModal(true);
        setUsername(newUsername);
      })
      .catch((error) => {
        setModalMessage(
          "Error updating username: " + error.response.data.message
        );
        setResponseStatus(false);
        setCloseModal(true);
      });
    setNewUsername("");
    setChangeUsername(false);
  };

  const handleModalClose = () => {
    setCloseModal(false);
  };

  return (
    <>
      {closeModal && (
        <Modal
          show={closeModal}
          img={
            <Lottie
              options={responseStatus ? successOptions : failureOptions}
              className="object-cover h-full w-full p-3 z-1000"
            />
          }
          message={modalMessage}
          onClose={handleModalClose}
        />
      )}

      <div className="min-h-screen">
        <NavBar />
        <div className="flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center w-full max-w-4xl bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg shadow-lg p-8 space-y-8">
            <div className="flex flex-col items-center">
              <Lottie
                options={defaultOptions}
                height={150}
                width={150}
                className="object-cover p-3"
              />
              <div className="text-xl font-semibold text-blue-500">
                {username}
              </div>
            </div>
            <div className="flex flex-col items-center w-full">
              <div className="w-full max-w-md space-y-6">
                {change_username ? (
                  <div className="flex flex-col space-y-4 bg-white p-4 rounded-lg shadow-md">
                    <div className="flex flex-col">
                      <label className="font-semibold text-gray-700">
                        New Username:
                      </label>
                      <input
                        className="rounded-md border border-gray-300 shadow-sm mt-1 p-2"
                        type="text"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                      />
                    </div>
                    <div className="flex justify-end space-x-4">
                      <button
                        className="py-2 px-4 bg-gray-300 rounded-md hover:bg-gray-400 transition duration-200"
                        onClick={() => setChangeUsername(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
                        onClick={handleChangeUsername}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
                    <p className="font-semibold text-gray-700">
                      Username :{" "}
                      <span className="font-normal text-gray-600">
                        {username}
                      </span>
                    </p>
                    <div
                      className="cursor-pointer"
                      onClick={() => setChangeUsername(true)}
                    >
                      <FaEdit
                        size={20}
                        className="text-gray-600 hover:text-gray-800 transition duration-200"
                      />
                    </div>
                  </div>
                )}
                <p className="font-semibold text-gray-700 bg-white p-4 rounded-lg shadow-md">
                  Email :{" "}
                  <span className="font-normal text-gray-600">{email}</span>
                </p>
                <p className="font-semibold text-gray-700 bg-white p-4 rounded-lg shadow-md">
                  You have appeared in {totalQuiz} quizzes
                </p>
                {changeP ? (
                  <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
                    <div className="flex flex-col">
                      <label className="font-semibold text-gray-700">
                        Current Password:
                      </label>
                      <input
                        className="rounded-md border border-gray-300 shadow-sm mt-1 p-2"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="font-semibold text-gray-700">
                        New Password:
                      </label>
                      <input
                        className="rounded-md border border-gray-300 shadow-sm mt-1 p-2"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                    <div className="flex justify-end space-x-4">
                      <button
                        className="py-2 px-4 bg-gray-300 rounded-md hover:bg-gray-400 transition duration-200"
                        onClick={() => setChangeP(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
                        onClick={handleChangePassword}
                      >
                        Change Password
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    className="cursor-pointer flex items-center justify-between bg-white p-4 rounded-lg shadow-md transition duration-200"
                    onClick={() => setChangeP(true)}
                  >
                    <p className="font-semibold text-blue-700">
                      Change Password
                    </p>
                    <Lottie
                      options={passwordOptions}
                      height={35}
                      width={35}
                      className="hover:bg-blue-600 transition duration-200"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
