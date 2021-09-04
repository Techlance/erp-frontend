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
  getCompanyLedgerDetailsAsync,
  addCompanyLedgerAsync,
  updateCompanyLedgerAsync,
  deleteCompanyLedgerAsync,
  getLedgerDocsAsync,
  createLedgerDocAsync,
  deleteLedgerDocAsync,
  addLedgerBalanceAsync,
  addLedgerBillwiseAsync,
  getLedgerBalanceAsync,
  getLedgerBillwiseAsync,
  updateLedgerBalanceAsync,
  updateLedgerBillwiseAsync,
  deleteLedgerBillAsync,
} from "../../api";

export const LedgerMaster = createContext();

export const LedgerMasterProvider = ({ children }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.ledgerMaster);
  const { company } = useSelector((state) => state.companyMaster);
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

  const deleteCompanyAccountHead = async (id, mid) => {
    await deleteCompanyAccountHeadAsync(id, dispatch);

    await getCompanyAccountHeadsAsync(mid, dispatch);
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

  const getCompanyLedgerDetails = async (id) => {
    await getCompanyLedgerDetailsAsync(id, dispatch);
  };

  const addCompanyLedger = async (data) => {
    const response = await addCompanyLedgerAsync(data, dispatch);

    await getCompanyLedgersAsync(data.company_master_id, dispatch);

    return response;
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

  const getLedgerDocs = async (id) => {
    await getLedgerDocsAsync(id, dispatch);
  };

  const createLedgerDoc = async (data) => {
    await createLedgerDocAsync(data, dispatch);

    await getLedgerDocsAsync(state.company_ledger_details?.id, dispatch);
  };

  const deleteLedgerDoc = async (id, lid) => {
    await deleteLedgerDocAsync(id, dispatch);

    await getLedgerDocsAsync(lid, dispatch);
  };

  const addLedgerBalance = async (data) => {
    await addLedgerBalanceAsync(data, dispatch);
  };

  const addLedgerBillwise = async (data) => {
    await addLedgerBillwiseAsync(data, dispatch);
  };

  const getLedgerBalance = async (id) => {
    await getLedgerBalanceAsync(id, dispatch);
  };

  const getLedgerBillwise = async (id) => {
    await getLedgerBillwiseAsync(id, dispatch);
  };

  const updateLedgerBalance = async (data) => {
    await updateLedgerBalanceAsync(data, dispatch);
  };

  const updateLedgerBillwise = async (data) => {
    await updateLedgerBillwiseAsync(data, dispatch);
  };

  const deleteLedgerBill = async (id) => {
    await deleteLedgerBillAsync(id, dispatch);
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
        getCompanyLedgerDetails,
        addCompanyLedger,
        updateCompanyLedger,
        deleteCompanyLedger,
        getLedgerDocs,
        createLedgerDoc,
        deleteLedgerDoc,
        getLedgerBalance,
        getLedgerBillwise,
        addLedgerBalance,
        addLedgerBillwise,
        updateLedgerBalance,
        updateLedgerBillwise,
        deleteLedgerBill,
      }}
    >
      {children}
    </LedgerMaster.Provider>
  );
};
