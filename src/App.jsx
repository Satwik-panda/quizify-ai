import "./App.css";
import DetailsProvider from "./context/DetailsContext ";
import QuizProgressProvider from "./context/QuizProgressContext";
import QuizRouter from "./routes/QuizRouter";
import AuthenticationDetailsProvider from "./context/QuizAuthentication";

function App() {
  return (
    <DetailsProvider>
      <AuthenticationDetailsProvider>
        <QuizProgressProvider>
          <QuizRouter />
        </QuizProgressProvider>
      </AuthenticationDetailsProvider>
    </DetailsProvider>
  );
}

export default App;
