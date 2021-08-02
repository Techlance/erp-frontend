import React from "react";

import { JWTProvider } from "./JWTContext";
import { CompanyProvider } from "./CompanyContext";
import { UserPermissionProvider } from "./UserPermissionContext";

const AppContextProvider = ({ children }) => {
  return (
    <JWTProvider>
      <CompanyProvider>
        <UserPermissionProvider>
          {children}
        </UserPermissionProvider>
      </CompanyProvider>
    </JWTProvider>
  );
};

export default AppContextProvider;
