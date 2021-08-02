// action - state management

import { CREATE_USER } from "./actions";


//-----------------------|| USER MANAGEMENT REDUCER ||-----------------------//

const userManagementReducer = (state, action) => {
  switch (action.type) {
      case CREATE_USER: {
          return{...state}
      }
      case EDIT_USER: {
          return{...state}
      }
      case VIEW_USER: {
          return{...state}
      }
      case DELETE_USER: {
          return{...state}
      }
      case VIEW_USER_BY_ID: {
          return{...state}
      }
      case CREATE_USER_GROUP: {
          return{...state}
      }
      case EDIT_USER_GROUP: {
          return{...state}
      }
      case VIEW_USER_GROUP: {
          return{...state}
      }
      case DELETE_USER_GROUP: {
          return{...state}
      }
      case CREATE_USER_RIGHTS: {
          return{...state}
      }
      case EDIT_USER_RIGHTS: {
          return{...state}
      }
      case VIEW_USER_RIGHTS: {
          return{...state}
      }
      case DELETE_USER_RIGHTS: {
          return{...state}
      }
  
      default:{
          return{...state}
      }
  }
  
};

export default userManagementReducer;
