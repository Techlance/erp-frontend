import React, { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// reducer - state management

// project imports
import Loader from "../../ui-component/Loader";

import {
  // Company Account Head
  getCompanyAccountHeadsAsync,
  addCompanyAccountHeadAsync,
  updateCompanyAccountHeadAsync,
  deleteCompanyAccountHeadAsync,

  //Company Account Group
  getCompanyAccountGroupsAsync,
  getCompanyAccountGroupDetailsAsync,
  addCompanyAccountGroupAsync,
  updateCompanyAccountGroupAsync,
  deleteCompanyAccountGroupAsync,

  //Compny Ledger
  getCompanyLedgersAsync,
  addCompanyLedgerAsync,
  updateCompanyLedgerAsync,
  deleteCompanyLedgerAsync,
} from "../../api";
import useComapanyMaster from "../../hooks/useCompanyMaster";

export const LedgerMaster = createContext();

export const LedgerMasterProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { company } = useComapanyMaster();
  const state = useSelector((state) => state.ledgerMaster);
  const [loading] = useState(false);

  const getCompanyAccountHeads = async (id) => {
    await getCompanyAccountHeadsAsync(id, dispatch);
  };

  const addCompanyAccountHead = async (data) => {
    await addCompanyAccountHeadAsync(data, dispatch);

    await getCompanyAccountHeadsAsync(data.company_master_id, dispatch);
  };

  const updateCompanyAccountHead = async (data) => {
    await updateCompanyAccountHeadAsync(data, dispatch);

    await getCompanyAccountHeadsAsync(data.company_master_id, dispatch);
    // await getSelectedCompanyAsync(data.id, dispatch);
  };

  const deleteCompanyAccountHead = async (id) => {
    await deleteCompanyAccountHeadAsync(id, dispatch);

    await getCompanyAccountHeadsAsync(id, dispatch);
  };

  const getCompanyAccountGroups = async (id) => {
    await getCompanyAccountGroupsAsync(id, dispatch);
  };

  const getCompanyAccountGroupDetails = async (id) => {
    await getCompanyAccountGroupDetailsAsync(id, dispatch);
  };

  const addCompanyAccountGroup = async (data) => {
    await addCompanyAccountGroupAsync(data, dispatch);

    await getCompanyAccountGroupsAsync(data.company_master_id, dispatch);
  };

  const updateCompanyAccountGroup = async (data) => {
    await updateCompanyAccountGroupAsync(data, dispatch);

    await getCompanyAccountGroupsAsync(data.company_master_id, dispatch);
    // await getSelectedCompanyAsync(data.id, dispatch);
  };

  const deleteCompanyAccountGroup = async (id) => {
    await deleteCompanyAccountGroupAsync(id, dispatch);

    await getCompanyAccountGroupsAsync(id, dispatch);
  };

  const getCompanyLedgers = async (id) => {
    await getCompanyLedgersAsync(id, dispatch);
  };

  const addCompanyLedger = async (data) => {
    await addCompanyLedgerAsync(data, dispatch);

    await getCompanyLedgersAsync(data.company_master_id, dispatch);
  };

  const updateCompanyLedger = async (data) => {
    await updateCompanyLedgerAsync(data, dispatch);

    await getCompanyLedgersAsync(data.company_master_id, dispatch);
    // await getSelectedCompanyAsync(data.id, dispatch);
  };

  const deleteCompanyLedger = async (id) => {
    await deleteCompanyLedgerAsync(id, dispatch);

    await getCompanyLedgersAsync(id, dispatch);
  };

  useEffect(() => {
    getCompanyAccountHeads(company?.company_id);
    getCompanyAccountGroups(company?.company_id);
    getCompanyLedgers(company?.company_id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company]);

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
        deleteCompanyAccountHead,
        getCompanyAccountGroups,
        getCompanyAccountGroupDetails,
        addCompanyAccountGroup,
        updateCompanyAccountGroup,
        deleteCompanyAccountGroup,
        getCompanyLedgers,
        addCompanyLedger,
        updateCompanyLedger,
        deleteCompanyLedger,

      }}
    >
      {children}
    </LedgerMaster.Provider>
  );
};
