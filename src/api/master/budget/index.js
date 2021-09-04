import { budgetActions } from "../../../store/actions";
import { dataToForm } from "../../../utils";

// project imports
import instance from "../../../utils/axios";
import sendNotification from "../../../utils/sendNotification";

export const getCompanyBudgetAsync = async (id, dispatch) => {
  try {
    if (!id) return;

    const response = await instance.get(`/budget/get-budget/${id}`);

    dispatch({
      type: budgetActions.GET_COMPANY_BUDGET,
      payload: response.data.data,
    });
  } catch (error) {
    console.log("Error while getting");
  }
};

export const addCompanyBudgetAsync = async (values, onSuccess, dispatch) => {
  try {
    let data = { ...values };
    data.year_id = data.year_id.id;
    data.authoriser = data.authoriser.id;

    const response = await instance.post(
      "/budget/create-budget",
      dataToForm(data)
    );

    if (response.data.success) {
      onSuccess();
    }

    sendNotification({
      dispatch,
      response,
    });
  } catch (error) {
    console.log("Error while creating company. budget");
  }
};

export * from "./cashflow";
export * from "./pl";
