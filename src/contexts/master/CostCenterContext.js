import React, { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// reducer - state management

// project imports
import Loader from "../../ui-component/Loader";
import useAuth from "../../hooks/useAuth";

import {
  // Company Cost Category
  getCostCategoryAsync,
  addCostCategoryAsync,
  updateCostCategoryAsync,
  deleteCostCategoryAsync,
  getCostCenterAsync,
  getCostCenterDetailsAsync,
  addCostCenterAsync,
  updateCostCenterAsync,
  deleteCostCenterAsync,
} from "../../api";

// constant
const initialState = {
  cost_category: [],
};

export const CostCenter = createContext();

export const CostCenterProvider = ({ children }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.costCenter);
  const [loading] = useState(false);

  const { user } = useAuth();

  const getCostCategory = async (id) => {
    await getCostCategoryAsync(id, dispatch);
  };

  const addCostCategory = async (data) => {
    await addCostCategoryAsync(data, dispatch);

    await getCostCategoryAsync(data.company_master_id, dispatch);
  };

  const updateCostCategory = async (data) => {
    await updateCostCategoryAsync(data, dispatch);

    await getCostCategoryAsync(data.company_master_id, dispatch);
    // await getSelectedCompanyAsync(data.id, dispatch);
  };

  const deleteCostCategory = async (id) => {
    await deleteCostCategoryAsync(id, dispatch);

    // await getCostCategoryAsync(id, dispatch);
  };

  const getCostCenter = async (id) => {
    await getCostCenterAsync(id, dispatch);
  };

  const getCostCenterDetails = async (id) => {
    await getCostCenterDetailsAsync(id, dispatch);
  };

  const addCostCenter = async (data) => {
    await addCostCenterAsync(data, dispatch);

    await getCostCenterAsync(data.company_master_id, dispatch);
  };

  const updateCostCenter = async (data) => {
    await updateCostCenterAsync(data, dispatch);

    await getCostCenterAsync(data.company_master_id, dispatch);
    // await getSelectedCompanyAsync(data.id, dispatch);
  };

  const deleteCostCenter = async (id) => {
    await deleteCostCenterAsync(id, dispatch);

    await getCostCenterAsync(id, dispatch);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <CostCenter.Provider
      value={{
        ...state,
        getCostCategory,
        addCostCategory,
        updateCostCategory,
        deleteCostCategory,
        getCostCenter,
        getCostCenterDetails,
        addCostCenter,
        updateCostCenter,
        deleteCostCenter,
      }}
    >
      {children}
    </CostCenter.Provider>
  );
};
