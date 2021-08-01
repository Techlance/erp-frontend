import React from "react";

// import { combineContext } from "../utils/combineContext";

// import JWTContext from "./JWTContext";
// import CompanyContext from "./CompanyContext";

import { JWTProvider } from "./JWTContext";
import { CompanyProvider } from "./CompanyContext";

const AppContextProvider = ({ children }) => {
  return (
    <JWTProvider>
      <CompanyProvider>{children}</CompanyProvider>
    </JWTProvider>
  );
};

export default AppContextProvider;
