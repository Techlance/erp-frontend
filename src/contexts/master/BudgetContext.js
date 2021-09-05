import React, { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// reducer - state management

// project imports
import Loader from "../../ui-component/Loader";

import {
  // Company Budgets
  getCompanyBudgetAsync,
  addCompanyBudgetAsync,
  getBudgetPlDetailsAsync,
  updateBudgetPlDetailsAsync,
  getBudgetPlReviseAsync,
  updateBudgetPlReviseAsync,
  getBudgetCashflowDetailsAsync,
  getBudgetCashflowReviseAsync,
  updateBudgetCashflowReviseAsync,
  updateBudgetCashflowDetailsAsync,
} from "../../api";

export const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { company } = useSelector((state) => state.companyMaster);
  const [loading] = useState(false);

  const getCompanyBudget = async (id) => {
    await getCompanyBudgetAsync(id, dispatch);
  };

  const addCompanyBudget = async (data, onSuccess) => {
    await addCompanyBudgetAsync(data, onSuccess, dispatch);

    await getCompanyBudgetAsync(company.company_id, dispatch);
  };

  const getBudgetPlDetails = async (id) => {
    await getBudgetPlDetailsAsync(id, dispatch);
  };

  const updateBudgetPlDetails = async (id, data, successFn) => {
    await updateBudgetPlDetailsAsync(id, data, successFn, dispatch);
  };

  const getBudgetPlRevise = async (id) => {
    await getBudgetPlReviseAsync(id, dispatch);
  };

  const updateBudgetPlRevise = async (id, data, onSuccess) => {
    await updateBudgetPlReviseAsync(id, data, onSuccess, dispatch);
  };

  const getBudgetCashFlowDetails = async (id) => {
    await getBudgetCashflowDetailsAsync(id, dispatch);
  };

  const getBudgetCashflowRevise = async (id, data, onSuccess) => {
    await getBudgetCashflowReviseAsync(id, dispatch);
  };

  const updateBudgetCashflowDetails = async (data, onSuccess) => {
  // const updateBudgetCashflowDetails = async (id, data, onSuccess) => {
    // await updateBudgetCashflowDetailsAsync(id, data, onSuccess, dispatch);
    await updateBudgetCashflowDetailsAsync(data, onSuccess, dispatch);
  };

  const updateBudgetCashflowRevise = async (id, data, onSuccess) => {
    await updateBudgetCashflowReviseAsync(id, data, onSuccess, dispatch);
  };

  useEffect(() => {
    getCompanyBudget(company?.company_id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company]);

  if (loading) {
    return <Loader />;
  }

  return (
    <BudgetContext.Provider
      value={{
        getCompanyBudget,
        addCompanyBudget,
        getBudgetPlDetails,
        updateBudgetPlDetails,
        getBudgetPlRevise,
        updateBudgetPlRevise,
        getBudgetCashFlowDetails,
        updateBudgetCashflowDetails,
        getBudgetCashflowRevise,
        updateBudgetCashflowRevise,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
