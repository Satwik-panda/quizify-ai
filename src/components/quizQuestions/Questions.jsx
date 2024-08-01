import React, { useContext, useEffect } from "react";
import { QuizProgressContext } from "../../context/QuizProgressContext";
import { DetailsContext } from "../../context/DetailsContext ";

function formatQuestion(text) {
  text = text.replace(/^```(?:python)?\s*|```$/g, "").trim();

  const lines = text.split("\n").filter((line) => line.trim() !== "");

  if (lines.length > 1) {
    return lines.map((line, index) => (
      <React.Fragment key={index}>
        <span className={index === 0 ? "font-medium" : "normal-weight"}>
          {line}
        </span>
        {index < lines.length - 1 && <br />}
      </React.Fragment>
    ));
  } else {
    return <span className="font-medium">{text}</span>;
  }
}

function Questions() {
  const {
    setQuestions,
    currentQuestionIndex,
    currentQuestion,
    showCorrectness,
    selectedOption,
    setSelectedOption,
  } = useContext(QuizProgressContext);

  const { numQuestions } = useContext(DetailsContext);
  const { QUESTION, OPTIONS, ANSWER, EXPLANATION, USER } = currentQuestion;

  if (USER) {
    setSelectedOption(USER);
  }


  const handleOptionClick = (event) => {
    setSelectedOption(event.target.textContent);
  };

  useEffect(() => {
    if (selectedOption) {
      setQuestions((prevQuestions) => {
        const updatedQuestions = [...prevQuestions];
        updatedQuestions[currentQuestionIndex] = {
          ...updatedQuestions[currentQuestionIndex],
          USER: selectedOption,
        };
        return updatedQuestions;
      });
    }
  }, [selectedOption]);

  return (<Card 
           QUESTION={QUESTION}
           OPTIONS={OPTIONS} 
           ANSWER={ANSWER}
           EXPLANATION={EXPLANATION}
           INDEX={currentQuestionIndex + 1}
           selectedOption={selectedOption}
           showCorrectness={showCorrectness}
           handleOptionClick={handleOptionClick}
            />
  );
}

export const Card=({QUESTION, OPTIONS, ANSWER, EXPLANATION, INDEX, selectedOption, showCorrectness, handleOptionClick})=>{
  return (
    <div className="bg-gradient-to-r from-[#1f7aea] via-indigo-500 to-purple-600 p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
      <div className="text-white text-lg sm:text-xl font-bold mb-4">
        {INDEX} : {"   "}
        {formatQuestion(QUESTION)}
      </div>
      <ul
        className="bg-white rounded-lg p-4 shadow-md"
        key={INDEX}
      >
        {OPTIONS?.map((op, idx) => {
          const isSelected = selectedOption === op;
          const isCorrect = op === ANSWER;

          let optionClass = `option p-4 my-2 rounded-lg ${
            showCorrectness
              ? ""
              : "cursor-pointer font-normal hover:bg-indigo-600 hover:text-white hover:font-medium transition-all duration-200"
          }`;

          if (isSelected) {
            optionClass += " selected";
            if (showCorrectness) {
              optionClass += isCorrect
                ? " correct bg-green-400 text-white"
                : " incorrect bg-red-400 text-white";
            } else {
              optionClass += " bg-blue-200";
            }
          } else if (showCorrectness && isCorrect) {
            optionClass += " correct bg-green-400 text-white";
          } else {
            optionClass += " bg-gray-100";
          }

          return (
            <>
              <li
                key={idx}
                className={optionClass}
                onClick={(e) => handleOptionClick(e)}
              >
                {op}
              </li>
              {idx !== OPTIONS.length - 1 && (
                <hr className="my-2 border-t border-gray-200" />
              )}
            </>
          );
        })}
      </ul>
      {showCorrectness && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
          <p className="font-semibold text-lg text-gray-800">
            Correct Answer: {ANSWER}
          </p>
          <p className="mt-2 text-gray-900">Explanation: {EXPLANATION}</p>
        </div>
      )}
    </div>
  )
}

export default Questions;
