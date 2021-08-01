import React from "react";

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
