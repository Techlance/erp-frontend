import React from "react";

import { JWTProvider } from "./JWTContext";
import { CompanyProvider } from "./CompanyContext";
import { UserPermissionProvider } from "./UserPermissionContext";
import { LedgerMasterProvider } from "./master/LedgerMasterContext";
import { MasterCompanyProvider } from "./master/MasterCompanyContext";
import { VoucherTypeProvider } from "./master/VoucherTypesContext";

const AppContextProvider = ({ children }) => {
  return (
    <JWTProvider>
      <CompanyProvider>
        <MasterCompanyProvider>
          <UserPermissionProvider>
            <LedgerMasterProvider>
              <VoucherTypeProvider>{children}</VoucherTypeProvider>
            </LedgerMasterProvider>
          </UserPermissionProvider>
        </MasterCompanyProvider>
      </CompanyProvider>
    </JWTProvider>
  );
};

export default AppContextProvider;
