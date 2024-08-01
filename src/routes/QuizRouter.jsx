import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import Quiz from "../pages/quiz";
import LoginPage from "../pages/login";
import SignupPage from "../pages/signup";
import Profile from "../components/UserComponent/Profile";
import History from "../pages/history";
import Review from "../pages/review";

function QuizRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/history" element={<History/>}/>
        <Route path="/review" element={<Review/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default QuizRouter;
