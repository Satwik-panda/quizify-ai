import React, { useContext } from "react";
import { DetailsContext } from "../../context/DetailsContext ";
import { QuizProgressContext } from "../../context/QuizProgressContext";

// FORMAT: Trim extra spaces and capitalize the first letter
function formatTopic(topic) {
  if (!topic) return "";
  const trimmedTopic = topic.trim();
  const formattedTopic =
    trimmedTopic.charAt(0).toUpperCase() + trimmedTopic.slice(1);
  return formattedTopic;
}

function ProgressBar() {
  const { topic } = useContext(DetailsContext);
  const { progress } = useContext(QuizProgressContext)

  return (
    <div className="flex flex-col items-center w-full py-4">
      <div className="flex items-center justify-between w-full">
      <h1 className="text-xl font-normal text-gray 800 py-5">
            Quiz Topic: {formatTopic(topic)}
          </h1>
        <span className="text-lg font-semibold text-blue-800">{progress}%</span>
      </div>
      <div className="w-full bg-gray-300 rounded-full h-2 shadow-lg">
        <div
          className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full shadow-md transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}>
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
