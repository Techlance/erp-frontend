import React, { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// reducer - state management

// project imports
import Loader from "../../ui-component/Loader";
import useAuth from "../../hooks/useAuth";

import {
  // Company Account Head
  getCostCategoryAsync,
  addCostCategoryAsync,
  updateCostCategoryAsync,
  deleteCostCategoryAsync,
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

    await getCostCategoryAsync(data.id, dispatch);
  };

  const updateCostCategory = async (data) => {
    await updateCostCategoryAsync(data, dispatch);

    await getCostCategoryAsync(data.id, dispatch);
    // await getSelectedCompanyAsync(data.id, dispatch);
  };

  const deleteCostCategory = async (id) => {
    await deleteCostCategoryAsync(id, dispatch);

    await getCostCategoryAsync(id, dispatch);
  };

  //   useEffect(() => {
  // getUserCompanies();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [user]);

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
      }}
    >
      {children}
    </CostCenter.Provider>
  );
};
