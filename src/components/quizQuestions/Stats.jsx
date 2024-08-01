import React, { useContext } from "react";
import { DetailsContext } from "../../context/DetailsContext ";
import { QuizProgressContext } from "../../context/QuizProgressContext";

function Stats() {
  const { numQuestions } = useContext(DetailsContext);
  const { correctAnswerNumber,wrongAnswerNumber } = useContext(QuizProgressContext);
  const totalQuestions = numQuestions;
  const progress = (correctAnswerNumber / totalQuestions) * 100;
  const wrongProgress=(wrongAnswerNumber / totalQuestions) * 100;
  // console.log("wrong answers in %:",wrongProgress);
  return (
    <StatsCard
    CORRECT={correctAnswerNumber}
    WRONG={wrongProgress}
    TOTAL={totalQuestions}
    PROGRESS={progress}
    />
  );
}

export const StatsCard=({TOTAL, CORRECT, WRONG, PROGRESS})=>{
  const correctPercentage = PROGRESS;
  const wrongPercentage = WRONG;
  // console.log("wrong and correct in %",wrongPercentage, correctPercentage)
  return(
    <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 w-full h-full">
      <h1 className="text-center mb-4 text-2xl font-semibold text-gray-700">
        Score
      </h1>
      <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center aspect-w-1 aspect-h-1">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-xl sm:text-2xl font-normal text-gray-800">
            {CORRECT}/{TOTAL}
          </div>
        </div>
        <div
          className="w-full h-full rounded-full"
          style={{
            background: `conic-gradient(
              #4ade80 ${correctPercentage}%, /* Green color section */
              #ffffff ${correctPercentage}% ${100 - wrongPercentage}%, /* White color section */
              #f87171 ${100 - wrongPercentage}% /* Red color section */
            )`,
            
            border: "1px solid #3d3d3d",
            
          }}
        ></div>
      </div>
      <p className="mt-4 text-gray-600 text-lg">
        {PROGRESS.toFixed(2)}% Correct!
      </p>
    </div>
  )
}

export default Stats;
