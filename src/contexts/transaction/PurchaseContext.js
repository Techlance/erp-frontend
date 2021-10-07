import React, { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// reducer - state management

// project imports
import Loader from "../../ui-component/Loader";

import {
  getVouchersAsync
} from "../../api";

import { purchaseActions } from '../../store/actions' 

export const PurchaseContext = createContext();

export const PurchaseProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { company } = useSelector((state) => state.companyMaster);
  const [loading] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company]);

  if (loading) {
    return <Loader />;
  }

  const getVouchers = async (id)=>{
    await getVouchersAsync(id, dispatch);
  }

  const selectParentVoucher = (voucher)=>{
    dispatch({
      type:purchaseActions.SELECT_PARENT_VOUCHER,
      payload: voucher
    })
  }

  return (
    <PurchaseContext.Provider
      value={{
        selectParentVoucher,
        getVouchers,
      }}
    >
      {children}
    </PurchaseContext.Provider>
  );
};
