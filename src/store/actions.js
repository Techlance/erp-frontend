// action - account
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const ACCOUNT_INITIALIZE = "ACCOUNT_INITIALIZE";
export const FIREBASE_STATE_CHANGED = "FIREBASE_STATE_CHANGED";
export const SET_MENU = "SET_MENU";

// action - customization
export const MENU_TOGGLE = "@customization/MENU_TOGGLE";
export const MENU_OPEN = "@customization/MENU_OPEN";
export const MENU_TYPE = "@customization/MENU_TYPE";
export const PRESET_COLORS = "@customization/PRESET_COLORS";
export const THEME_LOCALE = "@customization/THEME_LOCALE";
export const THEME_RTL = "@customization/THEME_RTL";
export const SET_FONT_FAMILY = "@customization/SET_FONT_FAMILY";
export const SET_BORDER_RADIUS = "@customization/SET_BORDER_RADIUS";
export const SET_OUTLINED_FILLED = "@customization/SET_OUTLINED_FILLED";

// action - snackbar
export const SNACKBAR_OPEN = "@snackbar/SNACKBAR_OPEN";

// action - company master
export const COMPANIES_INITIALIZE = "COMPANIES_INITIALIZE";
export const GET_USER_COMPANIES = "GET_USER_COMPANIES";
export const VIEW_COMPANY = "VIEW_COMPANY";
export const CREATE_COMPANY = "CREATE_COMPANY";
export const EDIT_COMPANY = "EDIT_COMPANY";
export const DELETE_COMPANY = "DELETE_COMPANY";
export const VIEW_COMPANY_DOCS = "VIEW_COMPANY_DOCS";
export const CREATE_COMPANY_DOCS = "CREATE_COMPANY_DOCS";
export const DELETE_COMPANY_DOCS = "DELETE_COMPANY_DOCS";
export const GET_CURRENCY = "GET_CURRENCY";
export const ADD_CURRENCY = "ADD_CURRENCY";
export const SELECT_COMPANY = "SELECT_COMPANY";
export const EXIT_COMPANY = "EXIT_COMPANY";

// action - user management - user
export const userManagementUserActions = {
  VIEW_USER: "VIEW_USER",
  VIEW_USER_BY_ID: "VIEW_USER_BY_ID",
};

export const userManagementUserCompanyGroupActions = {
  VIEW_USER_COMPANY_GROUP: "VIEW_USER_COMPANY_GROUP",
};

// action - user management - user groups
export const userManagementUserGroups = {
  VIEW_USER_GROUP: "VIEW_USER_GROUP",
  VIEW_USER_GROUP_BY_ID: "VIEW_USER_GROUP_BY_ID",
};

// action - user management - user rights
export const userRightsActions = {
  CREATE_USER_RIGHTS: "CREATE_USER_RIGHTS",
  EDIT_USER_RIGHTS: "EDIT_USER_RIGHTS",
  VIEW_USER_RIGHTS: "VIEW_USER_RIGHTS",
  DELETE_USER_RIGHTS: "DELETE_USER_RIGHTS",
  VIEW_USER_RIGHTS_BY_ID: "VIEW_USER_RIGHTS_BY_ID",
};

// action - master - ledger master - account head
export const GET_COMPANY_ACCOUNT_HEADS = "GET_COMPANY_ACCOUNT_HEADS";
export const CREATE_COMPANY_ACCOUNT_HEAD = "CREATE_COMPANY_ACCOUNT_HEAD";
export const UPDATE_COMPANY_ACCOUNT_HEAD = "UPDATE_COMPANY_ACCOUNT_HEAD";
export const DELETE_COMPANY_ACCOUNT_HEAD = "DELETE_COMPANY_ACCOUNT_HEAD";

// action - master - cost center - cost category
export const GET_COST_CATEGORY = "GET_COST_CATEGORY";
export const CREATE_COST_CATEGORY = "CREATE_COST_CATEGORY";
export const UPDATE_COST_CATEGORY = "UPDATE_COST_CATEGORY";
export const DELETE_COST_CATEGORY = "DELETE_COST_CATEGORY";

// action - master - cost center - cost center
export const GET_COST_CENTER = "GET_COST_CENTER";
export const CREATE_COST_CENTER = "CREATE_COST_CENTER";
export const UPDATE_COST_CENTER = "UPDATE_COST_CENTER";
export const DELETE_COST_CENTER = "DELETE_COST_CENTER";
export const GET_COST_CENTER_DETAILS = "GET_COST_CENTER_DETAILS";

// action - master - ledger master - account group
export const GET_COMPANY_ACCOUNT_GROUPS = "GET_COMPANY_ACCOUNT_GROUPS";
export const GET_COMPANY_ACCOUNT_GROUP_DETAILS =
  "GET_COMPANY_ACCOUNT_GROUP_DETAILS";
export const CREATE_COMPANY_ACCOUNT_GROUP = "CREATE_COMPANY_ACCOUNT_GROUP";
export const UPDATE_COMPANY_ACCOUNT_GROUP = "UPDATE_COMPANY_ACCOUNT_GROUP";
export const DELETE_COMPANY_ACCOUNT_GROUP = "DELETE_COMPANY_ACCOUNT_GROUP";

// action - master - ledger master - ledger
export const GET_COMPANY_LEDGERS = "GET_COMPANY_LEDGERS";
export const GET_COMPANY_LEDGER_DETAILS = "GET_COMPANY_LEDGER_DETAILS";
export const CREATE_COMPANY_LEDGER = "CREATE_COMPANY_LEDGER";
export const UPDATE_COMPANY_LEDGER = "UPDATE_COMPANY_LEDGER";
export const DELETE_COMPANY_LEDGER = "DELETE_COMPANY_LEDGER";

// action - master - LC
export const GET_IMPORT_LC = "GET_IMPORT_LC";
export const GET_EXPORT_LC = "GET_EXPORT_LC";
export const GET_DETAIL_LC = "GET_DETAIL_LC";
export const CREATE_LC = "CREATE_LC";
export const UPDATE_LC = "UPDATE_LC";
export const DELETE_LC = "DELETE_LC";

// action - master - LC - Docs
export const GET_LC_DOCS = "GET_LC_DOCS";
export const CREATE_LC_DOCS = "CREATE_LC_DOCS";
export const UPDATE_LC_DOCS = "UPDATE_LC_DOCS";
export const DELETE_LC_DOCS = "DELETE_LC_DOCS";

// action - master - LC - Ammend
export const GET_LC_AMEND = "GET_LC_AMEND";
export const CREATE_LC_AMEND = "CREATE_LC_AMEND";
export const UPDATE_LC_AMEND = "UPDATE_LC_AMEND";
export const DELETE_LC_AMEND = "DELETE_LC_AMEND";

// action - master - LC - Party Code
export const GET_PARTY_CODE_PAY = "GET_PARTY_CODE_PAY";
export const GET_PARTY_CODE_RECEIVE = "GET_PARTY_CODE_RECEIVE";
export const GET_BANK_AC = "GET_BANK_AC";
export const VIEW_LEDGER_DOCS = "VIEW_LEDGER_DOCS";
export const VIEW_LEDGER_BALANCE = "VIEW_LEDGER_BALANCE";
export const UPDATE_LEDGER_BALANCE = "UPDATE_LEDGER_BALANCE";
export const VIEW_LEDGER_BILLWISE = "VIEW_LEDGER_BILLWISE";

// action - master - voucher type
export const voucherTypeActions = {
  GET_VOUCHER_TYPES: "GET_VOUCHER_TYPES",
  GET_VOUCHER_TYPES_DETAILS: "GET_VOUCHER_TYPES_DETAILS",
};

//action - master - opening balance
export const brsActions = {
  GET_BRS_BANKS: "GET_BRS_BANKS",
  SET_BRS_BANK: "SET_BRS_BANK",
  GET_BRS: "GET_BRS",
  GET_BRS_DETAIL: "GET_BRS_DETAIL",
};

export const budgetActions = {
  GET_COMPANY_BUDGET: "GET_COMPANY_BUDGET",
  CREATE_COMPANY_BUDGET: "CREATE_COMPANY_BUDGET",
  GET_COMPANY_BUDGET_DETAILS: "GET_COMPANY_BUDGET_DETAILS",
  UPDATE_COMPANY_BUDGET_DETAILS: "UPDATE_COMPANY_BUDGET_DETAILS",
  GET_COMPANY_BUDGET_REVISE: "GET_COMPANY_BUDGET_REVISE",
  UPDATE_COMPANY_BUDGET_REVISE: "UPDATE_COMPANY_BUDGET_REVISE",
  GET_COMPANY_BUDGET_CASHFLOW_DETAILS: "GET_COMPANY_BUDGET_CASHFLOW_DETAILS",
  GET_COMPANY_BUDGET_CASHFLOW_REVISE: "GET_COMPANY_BUDGET_CASHFLOW_REVISE",
  ADD_BUDGET_CASHFLOW_DETAILS: "ADD_BUDGET_CASHFLOW_DETAILS",
};

export const purchaseActions = {
  GET_PURCHASE_CREDIT : "GET_PURCHASE_CREDIT",
  SELECT_PARENT_VOUCHER: "SELECT_PARENT_VOUCHER",
  GET_VOUCHER_LIST: "GET_VOUCHER_LIST",
};