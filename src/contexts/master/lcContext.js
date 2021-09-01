import React, { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// reducer - state management

// project imports
import Loader from "../../ui-component/Loader";
import useAuth from "../../hooks/useAuth";

import {
  // Company LC

  getImportLCAsync,
  getExportLCAsync,
  addLCAsync,
  updateLCAsync,
  deleteLCAsync,
  createLCDocAsync,
  getSelectedLCDocsAsync,
  deleteLCDocAsync,
  getLCAmendAsync,
  createLCAmendAsync,
  updateLCAmendAsync,
  deleteLCAmendAsync,
  getCostCenterAsync,
  getPartyCodePayAsync,
  getPartyCodeReceiveAsync,
  getBankAcAsync,
  getLCDetailAsync,
} from "../../api";

// constant
const initialState = {
  lc: [],
};

export const LC = createContext();

export const LcProvider = ({ children }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.lc);

  const [loading] = useState(false);

  const { user } = useAuth();

  const getImportLC = async (id) => {
    await getImportLCAsync(id, dispatch);
  };

  const getExportLC = async (id) => {
    await getExportLCAsync(id, dispatch);
  };

  const getLCDetail = async (id) => {
    await getLCDetailAsync(id, dispatch);
  };

  const getCostCenter = async (id) => {
    await getCostCenterAsync(id, dispatch);
  };

  const getPartyCodePay = async (id) => {
    await getPartyCodePayAsync(id, dispatch);
  };

  const getPartyCodeReceive = async (id) => {
    await getPartyCodeReceiveAsync(id, dispatch);
  };

  const getBankAc = async (id) => {
    await getBankAcAsync(id, dispatch);
  };

  const addImportLC = async (data) => {
    return await addLCAsync(data, dispatch);

    // await getImportLCAsync(data.company_master_id, dispatch);
  };

  const addExportLC = async (data) => {
    return await addLCAsync(data, dispatch);

    // await getImportLCAsync(data.company_master_id, dispatch);
  };

  const updateImportLC = async (data) => {
    await updateLCAsync(data, dispatch);

    await getImportLCAsync(data.lc_id, dispatch);
  };
  const updateExportLC = async (data) => {
    await updateLCAsync(data, dispatch);

    await getExportLCAsync(data.lc_id, dispatch);
  };

  const deleteLC = async (id) => {
    await deleteLCAsync(id, dispatch);

    // await getLCAsync(id, dispatch);
  };

  const getLCAmend = async (id) => {
    await getLCAmendAsync(id, dispatch);
  };

  const addLCAmend = async (data) => {
    await createLCAmendAsync(data, dispatch);
    // console.log(data.lc_id);
    // console.log("HELLO");
    await getLCAmendAsync(data.lc_id, dispatch);
  };

  const updateLCAmend = async (data, lc_id) => {
    console.log(data);
    console.log("HI");
    await updateLCAmendAsync(data, dispatch);

    await getLCAmendAsync(lc_id, dispatch);
  };

  const deleteLCAmend = async (id, lc_id) => {
    await deleteLCAmendAsync(id, dispatch);
    console.log(lc_id);
    console.log("HELLO");
    await getLCAmendAsync(lc_id, dispatch);
  };

  const getSelectedLcDocs = async (id) => {
    await getSelectedLCDocsAsync(id, dispatch);
  };

  const createLcDocs = async (data) => {
    await createLCDocAsync(data, dispatch);

    await getSelectedLCDocsAsync(data.lc_id, dispatch);
  };

  const deleteLcDoc = async (id, lc_id) => {
    console.log(lc_id);
    console.log("lc_id");

    await deleteLCDocAsync(id, dispatch);

    await getSelectedLCDocsAsync(lc_id, dispatch);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <LC.Provider
      value={{
        ...state,
        getImportLC,
        getExportLC,
        getLCDetail,
        addImportLC,
        addExportLC,
        updateImportLC,
        updateExportLC,
        deleteLC,
        getSelectedLcDocs,
        createLcDocs,
        deleteLcDoc,
        getLCAmend,
        updateLCAmend,
        addLCAmend,
        deleteLCAmend,
        getCostCenter,
        getPartyCodePay,
        getPartyCodeReceive,
        getBankAc,
      }}
    >
      {children}
    </LC.Provider>
  );
};
