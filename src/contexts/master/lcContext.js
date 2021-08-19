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

  const addLC = async (data) => {
    await addLCAsync(data, dispatch);

    await getLCAsync(data.company_master_id, dispatch);
  };

  const updateLC = async (data) => {
    await updateLCAsync(data, dispatch);

    await getLCAsync(data.company_master_id, dispatch);
    // await getSelectedCompanyAsync(data.id, dispatch);
  };

  const deleteLC = async (id) => {
    await deleteLCAsync(id, dispatch);

    // await getLCAsync(id, dispatch);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <LC.Provider
      value={{
        ...state,
        getLC,
        addLC,
        updateLC,
        deleteLC,
      }}
    >
      {children}
    </LC.Provider>
  );
};
