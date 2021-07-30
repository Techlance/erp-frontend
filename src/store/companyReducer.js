import { GET_COMPANY_DETAILS, GET_COMPANY_LIST, UPDATE_COMPANY_DETAILS, DELETE_COMPANY } from "./actions";

const companyReducer = (state, action) => {
  switch (action.type) {
    case GET_COMPANY_LIST: {
      const {} = action.payload;
      return {
        ...state,
      };
    }
    case GET_COMPANY_DETAILS: {
      const {} = action.payload;
      return {
        ...state,
      };
    }
    case UPDATE_COMPANY_DETAILS: {
      return {
        ...state,
      };
    }
    case DELETE_COMPANY:{
        return{
            ...state,
        }
    }
    default: {
      return { ...state };
    }
  }
};

export default accountReducer;
