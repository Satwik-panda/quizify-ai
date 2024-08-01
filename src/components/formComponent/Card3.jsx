import React, { useContext } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { DetailsContext } from "../../context/DetailsContext ";
import Modal from "../404/Modal";
import failureData from "../../../public/animations/fail.json";
import Lottie from "react-lottie";

function Card3() {
  const navigate = useNavigate();
  const {
    numQuestions,
    setNumQuestions,
    setCardCount,
    showError,
    setShowError,
  } = useContext(DetailsContext);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!numQuestions || numQuestions <= 0) {
      setShowError(true);
      return;
    }
    navigate("/quiz");
  };

  return (
    <>
      <div className="relative bg-[#CCE3DC] p-4 md:p-8 rounded-xl lg:rounded-l-[6rem] shadow-lg flex flex-col items-center justify-end md:h-[15rem]">
        <div className="absolute left-4 md:left-10 p-2 md:p-4 top-4">
          <button
            className="bg-black text-white p-2 rounded-full hover:bg-gray-700 transition duration-300"
            onClick={() => setCardCount((prev) => prev - 1)}
          >
            <FaArrowLeft className="w-3 h-3 md:w-4 md:h-4" />
          </button>
        </div>

        <div className="mb-4 md:mb-6 animate-bounce">
          <img
            className="w-24 h-24 md:w-[11rem] md:h-[11rem]"
            src="/assets/countdown.png"
            alt="Logo"
          />
        </div>

        <div className="flex flex-col md:flex-row w-full gap-2 md:gap-4 items-center mb-4 md:mb-6 animate-pulse">
          <h4 className="text-lg md:text-xl font-semibold text-gray-800 text-center md:text-left">
            "How many questions do you prefer for your quiz"
          </h4>
          <div className="flex items-center gap-1 md:gap-2">
            <img
              className="w-4 h-4 md:w-[2rem] md:h-[2rem]"
              src="/assets/shrug.png"
              alt="Icon"
            />
            <strong className="text-green-800 text-xl md:text-2xl">?</strong>
          </div>
        </div>

        <div className="flex w-full flex-col md:flex-row justify-end">
          <form
            className="flex w-full max-w-lg relative"
            onSubmit={handleSubmit}
          >
            <input
              name="quiz-number"
              type="number"
              min={1}
              max={100}
              value={numQuestions}
              onInput={(event) => setNumQuestions(event.target.value)}
              placeholder="Ex: 10"
              className="animate-float flex-grow px-4 py-3 rounded-full outline-none lg:w-96 hover:shadow-2xl hover:shadow-gray-700 focus:shadow-gray-100 focus:scale-105 duration-300"
            />

            <button
              type="submit"
              className="bg-green-700 text-white p-3 rounded-full hover:bg-blue-600 active:bg-green-700 flex items-center justify-center h-10 md:h-12 w-10 md:w-12 absolute right-0 top-1/2 transform -translate-y-1/2 transition duration-300"
            >
              <FaArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </form>
        </div>
      </div>
      <Modal
        show={showError}
        message="Please enter the number of questions !!"
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

export default Card3;
