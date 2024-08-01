import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import { StatsCard } from "../components/quizQuestions/Stats";
import { Card } from "../components/quizQuestions/Questions";
import { useLocation } from "react-router-dom";

function review() {
  const location = useLocation();
  const {
    topic = "Default Topic",
    questions = [],
    correctAnswerNumber = 0,
    wrongAnswerNumber = 0,
  } = location.state || {};

  function handleOptionClick() {
    //---don't need anything here
  }

  return (
    <>
      <NavBar />
      <div className="p-5">
        <h1 className="text-center text-3xl font-medium text-gray-800">
          Topic: {topic}
        </h1>
        <hr className="w-full my-5 h-[1px] border-t-0 bg-transparent bg-gradient-to-r from-transparent via-black to-transparent opacity-100" />
        <div className="flex flex-col sm:flex-row justify-center items-center sm:items-baseline">
          <div className="md:w-1/5 w-full">
            <StatsCard
              CORRECT={correctAnswerNumber}
              TOTAL={questions.length}
              PROGRESS={(correctAnswerNumber / questions.length) * 100}
              WRONG={(wrongAnswerNumber / questions.length) * 100}
            />
          </div>
          <div className="w-full md:w-4/5">
            {questions.map((e, index) => {
              // console.log("e",e)
              return (
                <div className="my-4 sm:mx-[3rem]" key={index}>
                  <Card
                    QUESTION={e.QUESTION}
                    OPTIONS={e.OPTIONS}
                    ANSWER={e.ANSWER}
                    EXPLANATION={e.EXPLANATION}
                    INDEX={index + 1}
                    selectedOption={e.USER}
                    showCorrectness={true}
                    handleOptionClick={handleOptionClick}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default review;
