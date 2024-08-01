import React, { useContext, useEffect } from "react";
import Card1 from "../components/formComponent/Card1";
import Card2 from "../components/formComponent/Card2";
import Card3 from "../components/formComponent/Card3";
import { DetailsContext } from "../context/DetailsContext ";
import Lottie from "react-lottie";
import animationData from "../../public/animations/form-page.json";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { QuizProgressContext } from "../context/QuizProgressContext";

function Home() {
  const navigate = useNavigate();

  useEffect(()=>{
    setCardCount(1);
  setQuestions([]);
  setCurrentQuestion(null);
  setCurrentQuestionIndex(0);
  setSelectedOption(null);
  setCorrectAnswerNumber(0);
  setWrongAnswerNumber(0);
  setShowCorrectness(false);
  setProgress(0);
  setShowResult(false);
  setSubmit(true);
  setNext(false);
  setTopic("");
  setDifficulty("");
  setNumQuestions("");
  },[])
  const {
    setQuestions,
    setCurrentQuestion,
    setCurrentQuestionIndex,
    setSelectedOption,
    setCorrectAnswerNumber,
    setWrongAnswerNumber,
    setShowCorrectness,
    setProgress,
    setShowResult,
    setSubmit,
    setNext,
  } = useContext(QuizProgressContext);
  const {
    setCardCount,
    setTopic,
    setDifficulty,
    setNumQuestions,
    cardCount
  } = useContext(DetailsContext);

  

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  let componentToRender;
  switch (cardCount) {
    case 1:
      componentToRender = <Card1 />;
      break;
    case 2:
      componentToRender = <Card2 />;
      break;
    case 3:
      componentToRender = <Card3 />;
      break;
    default:
      componentToRender = null;
  }
 
  return (
    <div className="min-h-screen bg-home-page-svg bg-cover bg-center relative flex flex-col">
      <NavBar />

      <div className="pt-2 pb-8 lg:pt-2 lg:pb-12 text-center lg:text-left px-4 lg:px-9">
        <h1 className="text-6xl lg:text-[7rem] xl:text-10xl text-white">
          <span  >Quizify </span>
          <span className="text-[#dcdc45] rounded-xl">AI</span>
        </h1>
      </div>

      <div className="flex-grow flex flex-col lg:flex-row items-center justify-center">
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/2 lg:pr-[16rem]">
          <Lottie
            options={defaultOptions}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
        <div className="z-10 mt-8 lg:mt-0 lg:absolute lg:right-0 lg:bottom-0 lg:p-4">
          {componentToRender}
        </div>
      </div>
    </div>
  );
}

export default Home;
