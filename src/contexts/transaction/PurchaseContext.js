import React, { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// reducer - state management

// project imports
import Loader from "../../ui-component/Loader";

import {

} from "../../api";

export const PurchaseContext = createContext();

export const PurchaseProvider = ({ children }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.PurchaseledgerMaster);
  const { company } = useSelector((state) => state.companyMaster);
  const [loading] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company]);

  if (loading) {
    return <Loader />;
  }

  return (
    <PurchaseContext.Provider
      value={{
      }}
    >
      {children}
    </PurchaseContext.Provider>
  );
};
