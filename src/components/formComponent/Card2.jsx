import React, { useContext } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { DetailsContext } from "../../context/DetailsContext ";
import Modal from "../404/Modal";
import failureData from "../../../public/animations/fail.json";
import Lottie from "react-lottie";

function Card2() {
  const { difficulty, setDifficulty, showError, setShowError, setCardCount } =
    useContext(DetailsContext);

  const handleErrorClose = () => {
    setShowError(false);
  };

  const failureOptions = {
    loop: true,
    autoplay: true,
    animationData: failureData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleNext = () => {
    if (!difficulty) {
      setShowError(true);
      return;
    }
    setCardCount((prev) => prev + 1);
  };

  const handlePrev = () => {
    setCardCount((prev) => prev - 1);
  };

  return (
    <>
      <div className="transition-all duration-500 ease-in-out relative bg-[#CCE3DC] p-4 md:p-8 rounded-xl lg:rounded-l-[4rem] shadow-lg flex flex-col items-center justify-end h-[auto] md:h-[15rem]">
        <div className="absolute left-4 md:left-10 p-2 md:p-4 top-4">
          <button
            className="bg-black text-white p-2 md:p-3 rounded-full hover:bg-gray-700 transition duration-300"
            onClick={handlePrev}
          >
            <FaArrowLeft className="w-3 h-3 md:w-3 md:h-3" />
          </button>
        </div>

        <div className="animate-bounce mb-4 md:mb-6">
          <img
            className="w-24 h-24 md:w-[11rem] md:h-[11rem]"
            src="/assets/logo2.png"
            alt="Logo"
          />
        </div>

        <div className="flex flex-col md:flex-row w-full gap-2 md:gap-4 items-center mb-4 md:mb-6">
          <h4 className="text-lg md:text-xl font-semibold text-gray-700 text-center md:text-left animate-pulse">
            What is your preferred quiz difficulty level
          </h4>
          <div className="flex items-center gap-1 md:gap-2">
            <img
              className="w-4 h-4 md:w-[2rem] md:h-[2rem] animate-spin"
              src="/assets/next-level.png"
              alt="Icon"
            />
            <strong className="text-gray-700 text-xl md:text-2xl animate-ping">
              ?
            </strong>
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-center">
          <div className="flex justify-around py-2 md:py-3 w-full">
            <button
              className={`px-2 md:px-3 rounded-2xl font-bold ${
                difficulty === "easy"
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-gray-700 hover:text-white transition duration-300"
              }`}
              onClick={() => setDifficulty("easy")}
            >
              Easy
            </button>
            <button
              className={`px-2 md:px-3 rounded-2xl font-bold ${
                difficulty === "medium"
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-gray-700 hover:text-white transition duration-300"
              }`}
              onClick={() => setDifficulty("medium")}
            >
              Medium
            </button>
            <button
              className={`px-2 md:px-3 rounded-2xl font-bold ${
                difficulty === "hard"
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-gray-700 hover:text-white transition duration-300"
              }`}
              onClick={() => setDifficulty("hard")}
            >
              Hard
            </button>

            <button
              type="button"
              className="bg-green-700 text-white p-2 md:p-3 rounded-full hover:bg-blue-600 active:bg-green-700 flex items-center justify-center h-10 md:h-12 w-10 md:w-12 transition duration-300"
              onClick={handleNext}
            >
              <FaArrowRight className="w-4 h-4 md:w-4 md:h-4" />
            </button>
          </div>
        </div>
      </div>
      <Modal
        show={showError}
        message="Please select the difficulty level !!"
        onClose={handleErrorClose}
        img={
          <Lottie
            options={failureOptions}
            className="object-cover h-full w-full p-3 z-1000"
          />
        }
      />
    </>
  );
}

export default Card2;
