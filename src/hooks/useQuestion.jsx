import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { DetailsContext } from "../context/DetailsContext ";
import { QuizProgressContext } from "../context/QuizProgressContext";

function useQuestion() {
  const { topic, difficulty } = useContext(DetailsContext);
  const { setQuestions } = useContext(QuizProgressContext);
  const [loading, setLoading] = useState(false)
  const [apiResponse, setApiResponse] = useState(null); // Separate state for API response

  const eg = `example response: { "QUESTION": "##add your generated question##", "OPTIONS": ["##option 1##", "##option 2##", "##option 3##", "##option 4##"], "ANSWER": "##option 4##", "EXPLANATION": "##justified explanation##" }`;

  const [message, setMessage] = useState([
    {
      role: "system",
      content: `You are a helpful assistant, I want you to generate me a question on topic: ${topic}, difficulty level: ${difficulty}. Question must be clear and concise with some kind of context, with four multiple-choice answers, one correct answer (it must be one of the available options), and a brief explanation. And if I want more questions on the same topic I will reply with "NEXT" then respond with a different question and option from any previous response(keep vaiations) on the same topic. I want the result in JSON format, ${eg}`,
    },
  ]);


  useEffect(() => {
    if (apiResponse) {
      console.log("api response:----------",apiResponse)
      setMessage((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `${apiResponse}`,
        },
      ]);
      setApiResponse(null); // Reset apiResponse state
    }
  }, [apiResponse]);
  console.log("messages:--------",message);

  async function fetchQuestion(currentQuestionIndex) {
    setLoading(true)
    const apiKey = import.meta.env.VITE_API_KEY;
    if (currentQuestionIndex >= 1) {
      setMessage((prev) => [
        ...prev,
        {
          role: "user",
          content: `NEXT`,
        },
      ]);
    }
    console.log("message in request to api:---------------",message)
    const QuizAPIBody = {
      model: "gpt-3.5-turbo",
      messages: message,
      max_tokens: 300,
      response_format: { type: "json_object" },

    };

    try {
      const result = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + apiKey,
        },
        body: JSON.stringify(QuizAPIBody),
      });

      const data = await result.json();
      // console.log("data received -----------",data)
      const q = JSON.parse(data.choices[0].message.content);
      const qString = JSON.stringify(q, null, 2);
      console.log("question generated-----------",qString)
      setApiResponse(qString);

      setQuestions((prev) => {
        const updatedQuestions = [...prev, q];
        return updatedQuestions;
      });
    } catch (error) {
      console.error("Error calling OpenAI API", error);
    } finally{
      setLoading(false)
    }
  }

  return { loading, fetchQuestion };
}

export default useQuestion;

// You are a helpful Quizmaster, I want you to generate me a question on topic: ${topic}, difficulty level: ${difficulty}. 
// Question must be clear and concise, with four multiple-choice answers, one correct answer 
// (it must be one of the available options), and a brief explanation. 
// And if I want more questions on the same topic I will reply with "NEXT" then 
// respond with a different question on the same topic and difficulty level.
//  I want the result in JSON format, keep the question in the "QUESTION" key, 
// options in the "OPTIONS" key, answer in "ANSWER" and explanation in "EXPLANATION".
// example response:{"QUESTION": "What does Socket.io allow for in real-time applications?","OPTIONS": ["Sending emails","Bidirectional communication","Uploading images","Running databases"],"ANSWER": "Bidirectional communication","EXPLANATION": "Socket.io enables bidirectional communication between clients and servers in real-time applications, allowing for seamless data exchange."}