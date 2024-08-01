import React, { useContext, useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { QuizProgressContext } from "../../context/QuizProgressContext";
import useQuestion from "../../hooks/useQuestion";
import { DetailsContext } from "../../context/DetailsContext ";
import Modal from "../404/Modal";
import failureData from "../../../public/animations/fail.json";
import Lottie from "react-lottie";
import axios from "axios";

const QuizButtonNavigation = () => {
  const {
    questions,
    currentQuestion,
    setCurrentQuestion,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    selectedOption,
    setSelectedOption,
    correctAnswerNumber,
    wrongAnswerNumber,
    setCorrectAnswerNumber,
    setWrongAnswerNumber,
    setShowCorrectness,
    setProgress,
    setShowResult,
    submit,
    next,
    setSubmit,
    setNext,
  } = useContext(QuizProgressContext);

  const { topic, numQuestions, showError, setShowError } =
    useContext(DetailsContext);
  const [latestIndex, setLatestIndex] = useState(0);
  const [quizSaved, setQuizSaved] = useState(false); // State to track if quiz data has been saved
  const buttonStatusRef = useRef({ submit: true, next: false });

  const failureOptions = {
    loop: true,
    autoplay: true,
    animationData: failureData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const { fetchQuestion, loading } = useQuestion();

  const handleErrorClose = () => {
    setShowError(false);
  };

  async function handleSubmit() {
    if (!selectedOption) {
      setShowError(true);
      return;
    }
    setSubmit(false);
    setNext(true);
    setShowCorrectness(true);
    buttonStatusRef.current = { submit: false, next: true };

    if (selectedOption === currentQuestion.ANSWER) {
      setCorrectAnswerNumber((prev) => prev + 1);
    } else setWrongAnswerNumber((prev) => prev + 1);

    await fetchQuestion(currentQuestionIndex + 1);
  }

  function handleNext() {
    document
      .querySelectorAll(".option")
      .forEach((opt) => opt.classList.remove("selected"));
    setShowCorrectness(false);
    if (currentQuestionIndex < numQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setSubmit(true);
      setNext(false);
    } else {
      setShowResult(true); // Show result when quiz is over
      //store all questions in the db
    }

    setProgress(Math.floor(((currentQuestionIndex + 1) / numQuestions) * 100));

    // Update the buttonStatusRef
    buttonStatusRef.current = { submit: true, next: false };
  }

  function handlePrev() {
    setSubmit(false);
    setNext(false);
    setCurrentQuestionIndex((prev) => prev - 1);
    setShowCorrectness(true);
  }

  function handleForward() {
    setCurrentQuestionIndex((prev) => prev + 1);
    if (currentQuestionIndex + 1 == latestIndex) {
      // there is +1 because when this condition is getting checked currentQuestionIndex is not yet updated
      if (buttonStatusRef.current.submit) {
        setSubmit(true);
        setShowCorrectness(false);
      } else {
        setNext(true);
        setShowCorrectness(true);
      }
    }
  }

  const url_key = import.meta.env.VITE_APP_URL;

  useEffect(() => {
    setLatestIndex((prev) => Math.max(currentQuestionIndex, prev));
    if (currentQuestionIndex >= 0) {
      setCurrentQuestion(questions[currentQuestionIndex]);
    }
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (
      next &&
      !loading &&
      currentQuestionIndex === numQuestions - 1 &&
      !quizSaved
    ) {
      questions.splice(currentQuestionIndex + 1);
      const quiz_id = new Date().toISOString();
      const quiz_data = {
        id: quiz_id,
        quiz_details: questions,
        topic: topic,
        score: correctAnswerNumber,
        wrong: wrongAnswerNumber,
      };

      console.log("quiz_data after adding id:----", quiz_data);

      if (questions) {
        const session_id = localStorage.getItem("session_id");
        axios
          .post(`${url_key}/store_quiz`, {
            session_id,
            quiz_data,
          })
          .then(() => {
            console.log("DB updation successful!!");
            setQuizSaved(true); // Mark quiz data as saved
          })
          .catch((error) => {
            console.log("DB updation Error:(", error);
          });
      }
    }
  }, [next, loading, currentQuestionIndex, numQuestions, questions, quizSaved]);

  return (
    <div className="relative flex justify-between items-center mt-2 h-16">
      {currentQuestionIndex >= 1 && (
        <div className="absolute flex items-center left-2 top-0 bottom-0 my-auto">
          <button
            className="cta bg-[#6225E6] text-white p-1 rounded-lg shadow-[5px_5px_0_black] w-10 h-10 flex justify-center items-center relative transition-all duration-500 hover:w-16 hover:shadow-[5px_5px_0_#FBC638]"
            onClick={handlePrev}
          >
            <span className="flex justify-center items-center relative">
              <svg
                width="35px"
                height="21.5px"
                viewBox="0 0 66 43"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <g
                  id="arrow"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                >
                  <path
                    className="one opacity-1"
                    d="M25.8456067,3.89485454 L22.0236851,0.139296592 C21.8291689,-0.0518420739 21.5173671,-0.0518571125 21.3228325,0.139262789 L0.308386609,20.7848311 C-0.0855800733,21.1718824 -0.0911863347,21.8050225 0.295865047,22.1989893 C0.299981197,22.2031791 0.304134283,22.2073326 0.308323825,22.2114492 L21.322902,42.8607841 C21.5174043,43.0519059 21.8291758,43.0519358 22.0237147,42.8608513 L25.8454814,39.1069479 C26.0424848,38.9134427 26.0453207,38.5968729 25.8518155,38.3998695 C25.8497107,38.3977268 25.8475868,38.395603 25.8454438,38.3934985 L9.00622109,21.8567812 C8.80919719,21.6632968 8.80632803,21.3467273 8.99981243,21.1497035 C9.00193528,21.1475418 9.00407765,21.1453995 9.00623947,21.1432767 L25.8454792,4.60825197 C26.0425131,4.41477773 26.0453987,4.09820839 25.8519244,3.90117456 C25.8498374,3.89904911 25.8477314,3.89694235 25.8456067,3.89485454 Z"
                    fill="#FFFFFF"
                  ></path>
                  <path
                    className="two"
                    d="M45.8456067,3.89485454 L42.0236851,0.139296592 C41.8291689,-0.0518420739 41.5173671,-0.0518571125 41.3228325,0.139262789 L20.3083866,20.7848311 C19.9144199,21.1718824 19.9088137,21.8050225 20.295865,22.1989893 C20.2999812,22.2031791 20.3041343,22.2073326 20.3083238,22.2114492 L41.322902,42.8607841 C41.5174043,43.0519059 41.8291758,43.0519358 42.0237147,42.8608513 L45.8454814,39.1069479 C46.0424848,38.9134427 46.0453207,38.5968729 45.8518155,38.3998695 C45.8497107,38.3977268 45.8475868,38.395603 45.8454438,38.3934985 L29.0062211,21.8567812 C28.8091972,21.6632968 28.806328,21.3467273 28.9998124,21.1497035 C29.0019353,21.1475418 29.0040776,21.1453995 29.0062395,21.1432767 L45.8454792,4.60825197 C46.0425131,4.41477773 46.0453987,4.09820839 45.8519244,3.90117456 C45.8498374,3.89904911 45.8477314,3.89694235 45.8456067,3.89485454 Z"
                    fill="#FFFFFF"
                  ></path>
                  <path
                    className="three opacity-1"
                    d="M65.8456067,3.89485454 L62.0236851,0.139296592 C61.8291689,-0.0518420739 61.5173671,-0.0518571125 61.3228325,0.139262789 L40.3083866,20.7848311 C39.9144199,21.1718824 39.9088137,21.8050225 40.295865,22.1989893 C40.2999812,22.2031791 40.3041343,22.2073326 40.3083238,22.2114492 L61.322902,42.8607841 C61.5174043,43.0519059 61.8291758,43.0519358 62.0237147,42.8608513 L65.8454814,39.1069479 C66.0424848,38.9134427 66.0453207,38.5968729 65.8518155,38.3998695 C65.8497107,38.3977268 65.8475868,38.395603 65.8454438,38.3934985 L49.0062211,21.8567812 C48.8091972,21.6632968 48.806328,21.3467273 48.9998124,21.1497035 C49.0019353,21.1475418 49.0040776,21.1453995 49.0062395,21.1432767 L65.8454792,4.60825197 C66.0425131,4.41477773 66.0453987,4.09820839 65.8519244,3.90117456 C65.8498374,3.89904911 65.8477314,3.89694235 65.8456067,3.89485454 Z"
                    fill="#FFFFFF"
                  ></path>
                </g>
              </svg>
            </span>
          </button>
        </div>
      )}

      <div className="flex justify-center items-center absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 my-auto">
        {submit ? (
          <button
            onClick={handleSubmit}
            className="bg-[#6225E6] text-white font-light w-20 py-2 rounded-full shadow-[5px_5px_0_black] 
  transition-[width, font-weight, box-shadow] duration-300 ease-in-out focus:outline-none 
  hover:w-32 hover:tracking-widest hover:shadow-[5px_5px_0_#FBC638] hover:font-medium hover:scale-103 hover:text-[18px]"
          >
            SUBMIT
          </button>
        ) : null}
        {next ? (
          loading ? (
            <p
              className="bg-[#6225E6] text-white w-32 p-2 rounded-full shadow-[5px_5px_0_#FBC638] 
  transition-all duration-300 ease-in-out focus:outline-none 
  text-center flex items-center justify-center space-x-2"
            >
              {" "}
              <span>Generating </span>
              <svg
                version="1.1"
                id="L9"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 100 100"
                enable-background="new 0 0 100 100"
                xml:space="preserve"
              >
                <rect x="4" y="50" width="12" height="30" fill="#fff">
                  <animateTransform
                    attributeType="xml"
                    attributeName="transform"
                    type="translate"
                    values="0 0; 0 20; 0 0"
                    begin="0"
                    dur="0.6s"
                    repeatCount="indefinite"
                  />
                </rect>
                <rect x="24" y="50" width="12" height="30" fill="#fff">
                  <animateTransform
                    attributeType="xml"
                    attributeName="transform"
                    type="translate"
                    values="0 0; 0 20; 0 0"
                    begin="0.2s"
                    dur="0.6s"
                    repeatCount="indefinite"
                  />
                </rect>
                <rect x="44" y="50" width="12" height="30" fill="#fff">
                  <animateTransform
                    attributeType="xml"
                    attributeName="transform"
                    type="translate"
                    values="0 0; 0 20; 0 0"
                    begin="0.4s"
                    dur="0.6s"
                    repeatCount="indefinite"
                  />
                </rect>
              </svg>
            </p>
          ) : (
            <button
              onClick={handleNext}
              className="bg-[#6225E6] text-white font-light w-20 py-2 rounded-full shadow-[5px_5px_0_black] 
  transition-[width, font-weight, box-shadow] duration-300 ease-in-out focus:outline-none 
  hover:w-32 hover:tracking-widest hover:shadow-[5px_5px_0_#FBC638] hover:font-medium hover:scale-103 hover:text-[18px]"
            >
              {currentQuestionIndex <= numQuestions - 2 ? "NEXT" : "FINISH"}
            </button>
          )
        ) : null}
      </div>

      {currentQuestionIndex !== latestIndex && (
        <div className="flex items-center absolute right-2 top-0 bottom-0 my-auto">
          <button
            className="cta bg-[#6225E6] text-white p-1 rounded-lg shadow-[3px_3px_0_black] w-10 h-10 flex justify-center items-center relative transition-all duration-500 focus:outline-none hover:w-16 hover:shadow-[5px_5px_0_#FBC638]"
            onClick={handleForward}
          >
            <span className="flex justify-center items-center relative">
              <svg
                width="33px"
                height="21.5px"
                viewBox="0 0 66 43"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <g
                  id="arrow"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                >
                  <path
                    className="one opacity-0"
                    d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z"
                    fill="#FFFFFF"
                  ></path>
                  <path
                    className="two"
                    d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z"
                    fill="#FFFFFF"
                  ></path>
                  <path
                    className="three opacity-0"
                    d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z"
                    fill="#FFFFFF"
                  ></path>
                </g>
              </svg>
            </span>
          </button>
        </div>
      )}

      <Modal
        show={showError}
        message="Please select your answer before proceeding !!"
        onClose={handleErrorClose}
        img={
          <Lottie
            options={failureOptions}
            className="object-cover h-full w-full p-3 z-1000"
          />
        }
      />
    </div>
  );
};

export default QuizButtonNavigation;
