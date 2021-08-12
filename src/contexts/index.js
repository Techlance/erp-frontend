import React from "react";

import { JWTProvider } from "./JWTContext";
import { CompanyProvider } from "./CompanyContext";
import { UserPermissionProvider } from "./UserPermissionContext";
import { LedgerMasterProvider } from "./master/LedgerMasterContext";

const AppContextProvider = ({ children }) => {
  return (
    <JWTProvider>
      <CompanyProvider>
        <UserPermissionProvider>
          <LedgerMasterProvider>{children}</LedgerMasterProvider>
        </UserPermissionProvider>
      </CompanyProvider>
    </JWTProvider>
  );
};

export default AppContextProvider;
