import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const QuizProgressContext = createContext();

const QuizProgressProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]); //stores all question, option, description.
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctAnswerNumber, setCorrectAnswerNumber] = useState(0);
  const [wrongAnswerNumber, setWrongAnswerNumber] = useState(0);
  const [showCorrectness, setShowCorrectness] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [submit, setSubmit] = useState(true);
  const [next, setNext] = useState(false);

  return (
    <QuizProgressContext.Provider
      value={{
        questions,
        setQuestions,
        currentQuestion,
        setCurrentQuestion,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        selectedOption,
        setSelectedOption,
        correctAnswerNumber,
        setCorrectAnswerNumber,
        wrongAnswerNumber,
        setWrongAnswerNumber,
        showCorrectness,
        setShowCorrectness,
        progress,
        setProgress,
        showResult,
        setShowResult,
        submit,
        setSubmit,
        next,
        setNext,
      }}
    >
      {children}
    </QuizProgressContext.Provider>
  );
};

export default QuizProgressProvider;
