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
} from "../../api";

export const Budget = createContext();

export const BudgetProvider = ({ children }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.budget);
  const { company } = useSelector((state) => state.companyMaster);
  const [loading] = useState(false);

  const getCompanyBudget = async (id) => {
    await getCompanyBudgetAsync(id, dispatch);
  };

  const addCompanyBudget = async (data) => {
    await addCompanyBudgetAsync(data, dispatch);
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

  const updateBudgetPlRevise = async (id, data, successFn) => {
    await updateBudgetPlReviseAsync(id, data, successFn, dispatch);
  };

  const getBudgetCashFlowDetails = async (id) => {
    await getBudgetCashflowDetailsAsync(id, dispatch);
  };

  useEffect(() => {
    getCompanyBudget(company?.company_id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Budget.Provider
      value={{
        ...state,
        getCompanyBudget,
        addCompanyBudget,
        getBudgetPlDetails,
        updateBudgetPlDetails,
        getBudgetPlRevise,
        updateBudgetPlRevise,
        getBudgetCashFlowDetails,
      }}
    >
      {children}
    </Budget.Provider>
  );
};
