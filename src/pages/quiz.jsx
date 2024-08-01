import React, { useContext, useEffect, useRef } from "react";
import NavBar from "../components/NavBar";
import Questions from "../components/quizQuestions/Questions";
import Stats from "../components/quizQuestions/Stats";
import ProgressBar from "../components/quizQuestions/ProgressBar";
import Result from "../components/quizQuestions/Result";
import QuizButtonNavigation from "../components/quizQuestions/QuizButtonNavigation";
import useQuestion from "../hooks/useQuestion";
import { QuizProgressContext } from "../context/QuizProgressContext";

function Quiz() {
  const {
    questions,
    currentQuestion,
    setCurrentQuestion,
    showResult,
  } = useContext(QuizProgressContext);

  const { fetchQuestion } = useQuestion();

  useEffect(() => {
    fetchQuestion(0); // Fetch the first question on initial render
  }, []); // Empty dependency array ensures this runs only once on mount

  const calledOnce = useRef(true);
  useEffect(() => {
    if (questions.length > 0 && calledOnce.current) {
      setCurrentQuestion(questions[0]);
      calledOnce.current = false;
    }
    // console.log(questions)
  }, [questions, setCurrentQuestion]);
  

  return (
    <>
      
      <NavBar />
      <div className="flex justify-center items-center flex-col px-4 sm:px-12 pb-12 bg-[#ffffff] relative">
        <ProgressBar/>

        {currentQuestion ? (
          <div className="flex flex-col md:flex-row w-full mt-6 ">
            <div className="flex w-full md:w-1/4 justify-center m-4">
              <Stats />   
            </div>

            {/* Main Content: Question and Buttons */}
            <div className="flex flex-col w-full md:w-3/4">
              {/* <div className="bg-quiz-card-gradient text-black shadow-lg rounded-lg p-4 sm:p-6 w-full"> */}
                {currentQuestion && (
                    <Questions/>
                )}
              {/* </div> */}

              {/* Buttons */}
              <QuizButtonNavigation />
            </div>
          </div>
        ) : (
          <div className="h-[10rem] w-[10rem]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
              <rect
                fill="#000000"
                stroke="#000000"
                strokeWidth="15"
                strokeLinejoin="round"
                width="30"
                height="30"
                x="85"
                y="85"
                rx="0"
                ry="0"
              >
                <animate
                  attributeName="rx"
                  calcMode="spline"
                  dur="0.9"
                  values="15;15;5;15;15"
                  keySplines=".5 0 .5 1;.8 0 1 .2;0 .8 .2 1;.5 0 .5 1"
                  repeatCount="indefinite"
                ></animate>
                <animate
                  attributeName="ry"
                  calcMode="spline"
                  dur="0.9"
                  values="15;15;10;15;15"
                  keySplines=".5 0 .5 1;.8 0 1 .2;0 .8 .2 1;.5 0 .5 1"
                  repeatCount="indefinite"
                ></animate>
                <animate
                  attributeName="height"
                  calcMode="spline"
                  dur="0.9"
                  values="30;30;1;30;30"
                  keySplines=".5 0 .5 1;.8 0 1 .2;0 .8 .2 1;.5 0 .5 1"
                  repeatCount="indefinite"
                ></animate>
                <animate
                  attributeName="y"
                  calcMode="spline"
                  dur="0.9"
                  values="40;170;40;"
                  keySplines=".6 0 1 .4;0 .8 .2 1"
                  repeatCount="indefinite"
                ></animate>
              </rect>
            </svg>
            <h1 className="text-center">Loading Your Quiz</h1>
          </div>
        )}
        {showResult && <Result />}
      </div>
    </>
  );
}

export default Quiz;
