import React, { createContext } from "react";
import { useDispatch } from "react-redux";
import { getBanksAsync, getOpeningBalBRSAsync, setBankAsync } from "../../api";

export const BrsContext = createContext();

export const BrsProvider = ({ children }) => {
  const dispatch = useDispatch();

  const getBanks = async (id) => {
    await getBanksAsync(id, dispatch);
  };

  const setBank = async (bank) => {
    await setBankAsync(bank, dispatch);
  };

  const getOpeningBalBRS = async (id) => {
    await getOpeningBalBRSAsync(id, dispatch);
  };

  const getBrsDetails = async (id) => {
    // await getBrsDetailsAsync(id, dispatch)
  };

  const createBrs = async (data) => {
    // await createBrsAsync(data, dispatch)
  };

  const updateBrs = async (data) => {
    // await updateBrsAsync(data, dispatch)
  };

  return (
    <BrsContext.Provider
      value={{
        getBanks,
        setBank,
        getOpeningBalBRS,
        getBrsDetails,
        createBrs,
        updateBrs,
      }}
    >
      {children}
    </BrsContext.Provider>
  );
};
