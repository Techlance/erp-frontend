import React from "react";

import { JWTProvider } from "./JWTContext";
import { CompanyProvider } from "./CompanyContext";
import { UserPermissionProvider } from "./UserPermissionContext";
import { LedgerMasterProvider } from "./master/LedgerMasterContext";
import { CostCenterProvider } from "./master/CostCenterContext";
import { MasterCompanyProvider } from "./master/MasterCompanyContext";

const AppContextProvider = ({ children }) => {
  return (
    <JWTProvider>
      <CompanyProvider>
        <UserPermissionProvider>
          <LedgerMasterProvider>
            <CostCenterProvider>{children}</CostCenterProvider>
          </LedgerMasterProvider>
        </UserPermissionProvider>
      </CompanyProvider>
    </JWTProvider>
  );
};

export default AppContextProvider;
