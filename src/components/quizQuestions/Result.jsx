import React, { useContext } from "react";
import { QuizProgressContext } from "../../context/QuizProgressContext";
import { DetailsContext } from "../../context/DetailsContext ";
import { useNavigate } from "react-router-dom";

function getGreetings(score) {
  if (score >= 75) return "You did Amazing";
  else if (score >= 50 && score < 75) return "You did alright.";
  else if (score >= 30 && score < 50) return "You can improve";
  else return "You learned a lot!!!";
}

function Result() {
  const navigate = useNavigate();
  const {
    questions,
    setQuestions,
    setCurrentQuestion,
    setCurrentQuestionIndex,
    setSelectedOption,
    correctAnswerNumber,
    setCorrectAnswerNumber,
    wrongAnswerNumber,
    setWrongAnswerNumber,
    setShowCorrectness,
    setProgress,
    setShowResult,
    setSubmit,
    setNext,
  } = useContext(QuizProgressContext);
  const {
    topic,
    setCardCount,
    setTopic,
    setDifficulty,
    numQuestions,
    setNumQuestions,
  } = useContext(DetailsContext);
  let score = (correctAnswerNumber / numQuestions) * 100;
  let greetingMessage = getGreetings(score);

  const handleHome = () => {
    navigate("/");
  };

  function handleNavigationToReview() {
    navigate("/review", {
      state: { topic, questions, correctAnswerNumber, wrongAnswerNumber },
    });
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative w-[70%] h-[50%] bg-white rounded-lg p-8 flex flex-col justify-center items-center">
        <div className="absolute -top-10 w-24 h-24 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold border-4 border-white">
          {Math.round(score)}%
        </div>
        <p className="text-lg font-semibold mb-4">{greetingMessage}</p>
        <p className="mb-2">
          Correctness: {correctAnswerNumber}/{numQuestions}
        </p>
        <p className="mb-4">
          Incorrectness: {numQuestions - correctAnswerNumber}/{numQuestions}
        </p>
        <div className="flex gap-4">
          <button
            onClick={handleHome}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Home
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={handleNavigationToReview}
          >
            Review
          </button>
        </div>
      </div>
    </div>
  );
}

export default Result;

{
  /* <div className="w-[20%] h-[20%] rounded-full">circle</div> */
}
//show quiz page with all answers, explaination, options selected
