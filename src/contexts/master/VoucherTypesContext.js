import React, { createContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createVoucherTypesAsync,
  deleteVoucherTypesAsync,
  getVoucherTypesAsync,
  updateVoucherTypesAsync,
} from "../../api";

export const VoucherTypesContext = createContext();

export const VoucherTypeProvider = ({ children }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.voucherTypes);

  const getVoucherTypes = async (id) => {
    await getVoucherTypesAsync(id, dispatch);
  };

  const createVoucherTypes = async (data) => {
    await createVoucherTypesAsync(data, dispatch);
  };

  const updateVoucherTypes = async (data) => {
    await updateVoucherTypesAsync(data, dispatch);
  };

  const deleteVoucherTypes = async (id) => {
    await deleteVoucherTypesAsync(id, dispatch);
  };

  return (
    <VoucherTypesContext.Provider
      value={{
        ...state,
        getVoucherTypes,
        createVoucherTypes,
        updateVoucherTypes,
        deleteVoucherTypes,
      }}
    >
      {children}
    </VoucherTypesContext.Provider>
  );
};
