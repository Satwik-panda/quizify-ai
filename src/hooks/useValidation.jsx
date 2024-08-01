import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { DetailsContext } from "../context/DetailsContext ";

function useValidation() {
  const { loading, setLoading } = useContext(DetailsContext);

  async function validateTopic(val) {
    const apiKey = import.meta.env.VITE_API_KEY;

    const ValidationAPIBody = {
      model: "gpt-3.5-turbo-16k",
      messages: [
        {
          role: "system",
          content: "you are a helpful assistant",
        },
        {
          role: "user",
          content: `Given the topic "${val}", can you evaluate if this topic is suitable for creating a quiz? Consider the following criteria:

          1. Depth of information available: Is there enough detailed information on this topic to create multiple questions?
          2. Variety of possible questions: Does the topic allow for different types of questions (e.g., multiple-choice, true/false, short answer)?
          3. Overall engagement potential: Is the topic interesting and engaging enough to hold the attention of quiz takers?

          Respond with "Yes" or "No" and provide a brief explanation for your answer.`,
        },
      ],
      max_tokens: 50,
    };

    setLoading(true);

    try {
      const result = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + apiKey,
        },
        body: JSON.stringify(ValidationAPIBody),
      });

      const data = await result.json();

      if (
        data.choices[0].message.content.trim().toLowerCase().startsWith("yes")
      ) {
        setLoading(false);
        return true;
      } else {
        setLoading(false);
        return false;
      }
    } catch (error) {
      console.error("Error calling OpenAI API", error);
      setLoading(false);
      return false;
    }
  }

  return { loading, validateTopic };
}

export default useValidation;
