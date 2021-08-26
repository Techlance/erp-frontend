import React, { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// reducer - state management

// project imports
import Loader from "../../ui-component/Loader";
import useAuth from "../../hooks/useAuth";

import {
  // Company LC
  getLCAsync,
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

  const getLC = async (id) => {
    await getLCAsync(id, dispatch);
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

  const addLC = async (data) => {
    await addLCAsync(data, dispatch);

    await getLCAsync(data.company_master_id, dispatch);
  };

  const updateLC = async (data) => {
    await updateLCAsync(data, dispatch);

    await getLCAsync(data.lc_id, dispatch);
    // await getSelectedCompanyAsync(data.id, dispatch);
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

    await getLCAmendAsync(data.lc_id, dispatch);
  };

  const updateLCAmend = async (data) => {
    await updateLCAmendAsync(data, dispatch);

    await getLCAmendAsync(data.company_master_id, dispatch);
    // await getSelectedCompanyAsync(data.id, dispatch);
  };

  const deleteLCAmend = async (id) => {
    await deleteLCAmendAsync(id, dispatch);

    // await getLCAmendAsync(dispatch);
  };

  const getSelectedLcDocs = async (id) => {
    await getSelectedLCDocsAsync(id, dispatch);
  };

  const createLcDocs = async (data) => {
    await createLCDocAsync(data, dispatch);

    await getSelectedLCDocsAsync(data.lc_id, dispatch);
  };

  const deleteLcDoc = async (id, lc_id) => {
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
        getLC,
        getLCDetail,
        addLC,
        updateLC,
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
