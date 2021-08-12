import React, { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// reducer - state management

// project imports
import Loader from "../../ui-component/Loader";
import useAuth from "../../hooks/useAuth";

import {
    // Company Account Head
    getCompanyAccountHeadsAsync,
    addCompanyAccountHeadAsync,
    updateCompanyAccountHeadAsync,
    deleteCompanyAccountHeadAsync,
} from "../../api";

// constant
const initialState = {
  company_account_heads:[]
};

export const LedgerMaster = createContext();

export const LedgerMasterProvider = ({ children }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.ledgerMaster);
  const [loading] = useState(false);

  const { user } = useAuth();

  const getCompanyAccountHeads = async (id) => {
    await getCompanyAccountHeadsAsync(id,dispatch);
  };

  const addCompanyAccountHead = async (data) => {
    await addCompanyAccountHeadAsync(data, dispatch);

    await getCompanyAccountHeadsAsync(data.id,dispatch);
  };

  const updateCompanyAccountHead = async (data) => {
    await updateCompanyAccountHeadAsync(data, dispatch);

    // await getCompanyAccountHeadsAsync(id,dispatch);
    // await getSelectedCompanyAsync(data.id, dispatch);
  };

  const deleteCompanyAccountHead = async (id) => {
    await deleteCompanyAccountHeadAsync(id, dispatch);

    await getCompanyAccountHeadsAsync(id,dispatch);
  };

//   useEffect(() => {
    // getUserCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [user]);

  if (loading) {
    return <Loader />;
  }

  return (
    <LedgerMaster.Provider
      value={{
        ...state,
        getCompanyAccountHeads,
        addCompanyAccountHead,
        updateCompanyAccountHead,
        deleteCompanyAccountHead
      }}
    >
      {children}
    </LedgerMaster.Provider>
  );
};
