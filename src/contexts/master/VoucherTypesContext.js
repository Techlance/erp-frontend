import React, { createContext } from "react";
import { useDispatch } from "react-redux";
import {
  getVoucherTypesAsync,
  getVoucherTypesDetailAsync,
  createVoucherTypesAsync,
  deleteVoucherTypesAsync,
  updateVoucherTypesAsync,
} from "../../api";

export const VoucherTypesContext = createContext();

export const VoucherTypeProvider = ({ children }) => {
  const dispatch = useDispatch();

  const getVoucherTypesDetail = async (vid) => {
    await getVoucherTypesDetailAsync(vid, dispatch);
  };

  const getVoucherTypes = async (id) => {
    await getVoucherTypesAsync(id, dispatch);
  };

  const createVoucherTypes = async (mid,data) => {
    await createVoucherTypesAsync(data, dispatch);
    await getVoucherTypesAsync(mid, dispatch);
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
        getVoucherTypes,
        getVoucherTypesDetail,
        createVoucherTypes,
        updateVoucherTypes,
        deleteVoucherTypes,
      }}
    >
      {children}
    </VoucherTypesContext.Provider>
  );
};
