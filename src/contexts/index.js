import React from "react";

import { JWTProvider } from "./JWTContext";
import { CompanyProvider } from "./CompanyContext";
import { UserPermissionProvider } from "./UserPermissionContext";
import { LedgerMasterProvider } from "./master/LedgerMasterContext";
import { CostCenterProvider } from "./master/CostCenterContext";
import { MasterCompanyProvider } from "./master/MasterCompanyContext";
import { VoucherTypeProvider } from "./master/VoucherTypesContext";
import { BrsProvider } from "./master/BrsContext";
import { LcProvider } from "./master/lcContext";
import { BudgetProvider } from "./master/BudgetContext";

const AppContextProvider = ({ children }) => {
  return (
    <JWTProvider>
      <CompanyProvider>
        <MasterCompanyProvider>
          <UserPermissionProvider>
            <LedgerMasterProvider>
              <VoucherTypeProvider>
                <BrsProvider>
                  <LcProvider>
                    <BudgetProvider>
                      <CostCenterProvider>{children}</CostCenterProvider>
                    </BudgetProvider>
                  </LcProvider>
                </BrsProvider>
              </VoucherTypeProvider>
            </LedgerMasterProvider>
          </UserPermissionProvider>
        </MasterCompanyProvider>
      </CompanyProvider>
    </JWTProvider>
  );
};

export default AppContextProvider;
