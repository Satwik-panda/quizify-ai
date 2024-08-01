import React, { createContext, useState } from "react";

export const DetailsContext = createContext();

const DetailsProvider = ({ children }) => {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [numQuestions, setNumQuestions] = useState("");
  const [loading, setLoading] = useState(false);
  const [cardCount, setCardCount] = useState(1);
  const [showError, setShowError] = useState(false);
  const [errorMessage, seterrorMessage] = useState();

  return (
    <DetailsContext.Provider
      value={{
        topic,
        setTopic,
        difficulty,
        setDifficulty,
        numQuestions,
        setNumQuestions,
        loading,
        setLoading,
        cardCount,
        setCardCount,
        showError,
        setShowError,
        errorMessage,
        seterrorMessage,
      }}
    >
      {children}
    </DetailsContext.Provider>
  );
};

export default DetailsProvider;
