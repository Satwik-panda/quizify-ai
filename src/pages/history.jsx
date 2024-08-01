import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import HistoryList from "../components/UserComponent/HistoryList";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

function History() {
  console.log("in the right place");
  const [prevQuiz, setPrevQuiz] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalMessage, setModalMessage] = useState("");
  const url_key = import.meta.env.VITE_APP_URL;

  useEffect(() => {
    const sessionId = localStorage.getItem("session_id");
    const email = localStorage.getItem("email");

    if (sessionId) {
      axios
        .get(`${url_key}/fetch_user`, { params: { email: email } })
        .then((response) => {
          console.log("response from fetch user in history:-------",response)
          setPrevQuiz(response.data.quizzes);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setModalMessage("Error fetching data.");
          setIsLoading(false);
        })
        .finally(() => console.log());
    } else {
      setModalMessage("No session ID found.");
      setIsLoading(false);
    }
  }, []);

  console.log("received from backend", prevQuiz);

  return (
    <div>
      <NavBar />
      <h1 className="text-center text-3xl font-medium text-gray-800">
        Previous Quizzes
      </h1>
      <hr className="w-full my-5 h-[1px] border-t-0 bg-transparent bg-gradient-to-r from-transparent via-black to-transparent opacity-100" />
      {isLoading ? <p>Loading...</p> : <HistoryList list={prevQuiz} />}
      {modalMessage && <div>{modalMessage}</div>}
    </div>
  );
}

export default History;
