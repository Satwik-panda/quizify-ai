import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { DetailsContext } from "../../context/DetailsContext ";

function PageNotFound() {
  const navigate = useNavigate();
  const { setCardCount } = useContext(DetailsContext);

  return (
    <>
      <div className="flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <img
            src="/assets/404-error.png"
            alt="Page Not Found"
            className="mx-auto mb-8 w-[600px] h-auto"
          />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Page Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The page you are looking for does not exist.
          </p>
          <button
            onClick={() => {
              setCardCount(1);
              navigate("/");
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-1 mb-3"
          >
            Go Home
          </button>
        </div>
      </div>
    </>
  );
}

export default PageNotFound;
