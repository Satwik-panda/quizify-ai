import React, { useContext } from "react";
import useValidation from "../../hooks/useValidation";
import { FaArrowRight } from "react-icons/fa";
import { DetailsContext } from "../../context/DetailsContext ";
import Modal from "../404/Modal";
import failureData from "../../../public/animations/fail.json";
import Lottie from "react-lottie";

function Card1() {
  const {
    topic,
    setTopic,
    setCardCount,
    showError,
    setShowError,
    errorMessage,
    seterrorMessage,
  } = useContext(DetailsContext);
  const { loading, validateTopic } = useValidation();

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

  async function handleSubmit(e) {
    e.preventDefault();
    const val = e.target.firstElementChild.value;

    if (val === "" || val === null) {
      setShowError(true);
      seterrorMessage(
        "Oops! It looks like you forgot to enter a topic !!"
      );
    } else {
      const isValid = await validateTopic(val);
      if (isValid) {
        setCardCount((prev) => prev + 1);
      } else {
        setTopic("");
        setShowError(true);
        seterrorMessage(
          "Oops! It seems the word you entered doesn't exist !!"
        );
      }
    }
  }

  return (
    <div className="transition-all duration-500 ease-in-out">
      <div className="relative bg-[#CCE3DC] p-4 md:p-8 rounded-xl lg:rounded-l-[4rem] shadow-lg flex flex-col items-center justify-end md:h-[15rem]">
        <div className="animate-float absolute top-[-6rem] right-0 md:right-11 mb-4 md:mb-6">
          <img
            className="w-24 h-24 md:w-[11rem] md:h-[11rem]"
            src="/assets/person.png"
            alt="Logo"
          />
        </div>

        <div className="flex flex-col md:flex-row w-full gap-4 items-center mb-4 md:mb-6">
          <h4 className="animate-float text-lg md:text-xl font-semibold text-grey text-center md:text-left">
            "On which subject would you like to take a Quiz"
          </h4>
          <div className="flex items-center gap-2">
            {/* Animation on appearing */}
            <img
              className="animate-float w-6 h-6 md:w-[2rem] md:h-[2rem]"
              src="/assets/shrug.png"
              alt="Icon"
            />
            <strong className="animate-float text-xl md:text-2xl">?</strong>
          </div>
        </div>

        <div className="flex w-full flex-col items-center md:flex-row">
          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-lg relative"
          >
            <input
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
              type="text"
              placeholder="Ex: Python, World war II, Historical, Science, Quiz for Kids ..."
              className="animate-float flex-grow px-4 py-3 rounded-full outline-none lg:w-96 hover:shadow-2xl hover:shadow-gray-700 focus:shadow-gray-100 focus:scale-105 duration-300"
            />
            <button
              type="submit"
              className="bg-green-700 text-white p-3 rounded-full hover:bg-blue-600 active:bg-green-700 flex items-center justify-center h-12 w-12 absolute right-0 top-1/2 transform -translate-y-1/2"
            >
              {loading ? (
                <div className="w-8 h-8 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 200 200"
                    className="animate-spin w-full h-full"
                  >
                    <circle
                      fill="none"
                      strokeOpacity="1"
                      stroke="white"
                      strokeWidth=".5"
                      cx="100"
                      cy="100"
                      r="0"
                    >
                      <animate
                        attributeName="r"
                        calcMode="spline"
                        dur="2s"
                        values="1;80"
                        keyTimes="0;1"
                        keySplines="0 .2 .5 1"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="strokeWidth"
                        calcMode="spline"
                        dur="2s"
                        values="0;25"
                        keyTimes="0;1"
                        keySplines="0 .2 .5 1"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="strokeOpacity"
                        calcMode="spline"
                        dur="2s"
                        values="1;0"
                        keyTimes="0;1"
                        keySplines="0 .2 .5 1"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </svg>
                </div>
              ) : (
                <FaArrowRight />
              )}
            </button>
          </form>
        </div>
      </div>

      {showError && (
        <Modal
          show={showError}
          message={errorMessage}
          onClose={handleErrorClose}
          img={
            <Lottie
              options={failureOptions}
              className="object-cover h-full w-full p-3 z-1000"
            />
          }
        />
      )}
    </div>
  );
}

export default Card1;
