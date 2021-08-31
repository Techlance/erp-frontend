// action - account reducer
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const ACCOUNT_INITIALIZE = "ACCOUNT_INITIALIZE";
export const FIREBASE_STATE_CHANGED = "FIREBASE_STATE_CHANGED";
export const SET_MENU = "SET_MENU";

// action - customization reducer
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

// action - company master reducer
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

// action - user management - user reducer
export const CREATE_USER = "CREATE_USER";
export const EDIT_USER = "EDIT_USER";
export const VIEW_USER = "VIEW_USER";
export const DELETE_USER = "DELETE_USER";
export const VIEW_USER_BY_ID = "VIEW_USER_BY_ID";
export const VIEW_USER_COMPANY_GROUP = "VIEW_USER_COMPANY_GROUP";

// action - user management - user group reducer
export const CREATE_USER_GROUP = "CREATE_USER_GROUP";
export const EDIT_USER_GROUP = "EDIT_USER_GROUP";
export const VIEW_USER_GROUP = "VIEW_USER_GROUP";
export const DELETE_USER_GROUP = "DELETE_USER_GROUP";
export const VIEW_USER_GROUP_BY_ID = "VIEW_USER_GROUP_BY_ID";

// action - user management - user rights reducer
export const CREATE_USER_RIGHTS = "CREATE_USER_RIGHTS";
export const EDIT_USER_RIGHTS = "EDIT_USER_RIGHTS";
export const VIEW_USER_RIGHTS = "VIEW_USER_RIGHTS";
export const DELETE_USER_RIGHTS = "DELETE_USER_RIGHTS";
export const VIEW_USER_RIGHTS_BY_ID = "VIEW_USER_RIGHTS_BY_ID";

//action - master - ledger master - account head
export const GET_COMPANY_ACCOUNT_HEADS = "GET_COMPANY_ACCOUNT_HEADS";
export const CREATE_COMPANY_ACCOUNT_HEAD = "CREATE_COMPANY_ACCOUNT_HEAD";
export const UPDATE_COMPANY_ACCOUNT_HEAD = "UPDATE_COMPANY_ACCOUNT_HEAD";
export const DELETE_COMPANY_ACCOUNT_HEAD = "DELETE_COMPANY_ACCOUNT_HEAD";

//action - master - ledger master - account group
export const GET_COMPANY_ACCOUNT_GROUPS = "GET_COMPANY_ACCOUNT_GROUPS";
export const GET_COMPANY_ACCOUNT_GROUP_DETAILS =
  "GET_COMPANY_ACCOUNT_GROUP_DETAILS";
export const CREATE_COMPANY_ACCOUNT_GROUP = "CREATE_COMPANY_ACCOUNT_GROUP";
export const UPDATE_COMPANY_ACCOUNT_GROUP = "UPDATE_COMPANY_ACCOUNT_GROUP";
export const DELETE_COMPANY_ACCOUNT_GROUP = "DELETE_COMPANY_ACCOUNT_GROUP";

//action - master - ledger master - ledger
export const GET_COMPANY_LEDGERS = "GET_COMPANY_LEDGERS";
export const GET_COMPANY_LEDGER_DETAILS = "GET_COMPANY_LEDGER_DETAILS";
export const CREATE_COMPANY_LEDGER = "CREATE_COMPANY_LEDGER";
export const UPDATE_COMPANY_LEDGER = "UPDATE_COMPANY_LEDGER";
export const DELETE_COMPANY_LEDGER = "DELETE_COMPANY_LEDGER";
export const VIEW_LEDGER_DOCS = "VIEW_LEDGER_DOCS";
export const VIEW_LEDGER_BALANCE = "VIEW_LEDGER_BALANCE";
export const UPDATE_LEDGER_BALANCE = "UPDATE_LEDGER_BALANCE";
export const VIEW_LEDGER_BILLWISE = "VIEW_LEDGER_BILLWISE";
