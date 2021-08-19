import React from "react";

import { JWTProvider } from "./JWTContext";
import { CompanyProvider } from "./CompanyContext";
import { UserPermissionProvider } from "./UserPermissionContext";
import { LedgerMasterProvider } from "./master/LedgerMasterContext";
import { CostCenterProvider } from "./master/CostCenterContext";
import { MasterCompanyProvider } from "./master/MasterCompanyContext";
import { LcProvider } from "./master/lcContext";

const AppContextProvider = ({ children }) => {
  return (
    <JWTProvider>
      <CompanyProvider>
        <UserPermissionProvider>
          <MasterCompanyProvider>
            <LedgerMasterProvider>
              <LcProvider>
                <CostCenterProvider>{children}</CostCenterProvider>
              </LcProvider>
            </LedgerMasterProvider>
          </MasterCompanyProvider>
        </UserPermissionProvider>
      </CompanyProvider>
    </JWTProvider>
  );
};

export default AppContextProvider;
