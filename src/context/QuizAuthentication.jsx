import React, { createContext, useState } from "react";

export const AuthenticationContext = createContext();

const AuthenticationDetailsProvider = ({ children }) => {
  const [logedIn, setLogedIn] = useState(false);

  // states for handling modal
  const [modal, setModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [responseStatus, setResponseStatus] = useState(null);

  return (
    <AuthenticationContext.Provider
      value={{
        logedIn,
        setLogedIn,
        modal,
        setModal,
        modalMessage,
        setModalMessage,
        responseStatus,
        setResponseStatus,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationDetailsProvider;
