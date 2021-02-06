import * as routes from "./routes";

export const LOGIN = `/${routes.ACCOUNT}/${routes.LOGIN}`;

export const FORGOT_PASSWORD = `/${routes.ACCOUNT}/${routes.FORGOT_PASSWORD}`;

export const RESET_PASSWORD = `/${routes.ACCOUNT}/${routes.RESET_PASSWORD}`;

export const SETTINGS = `/${routes.ADMIN}/${routes.SETTINGS}`;

export const ADMIN_PROFILE = `/${SETTINGS}/${routes.ADMIN_PROFILE}`;

export const CHANGE_PASSWORD = `/${SETTINGS}/${routes.CHANGE_PASSWORD}`;

export const EDIT_PROFILE = `/${SETTINGS}/${routes.EDIT_PROFILE}`;

export const RTLS = `/${routes.ADMIN}/${routes.RTLS}`;

export const STAKEHOLDERS = `/${routes.ADMIN}/${routes.STAKEHOLDERS}`;

export const EMPLOYEES = `/${STAKEHOLDERS}/${routes.EMPLOYEES}`;

export const DRIVER = `/${STAKEHOLDERS}/${routes.DRIVER}`;

export const VENDOR = `/${STAKEHOLDERS}/${routes.VENDOR}`;

export const CAB = `/${STAKEHOLDERS}/${routes.CAB}`;

export const CAB_MAPPING = `/${STAKEHOLDERS}/${routes.CAB_MAPPING}`;

export const ADD_EMPLOYEE = `/${STAKEHOLDERS}/${routes.EMPLOYEES}/${routes.ADD}`;

export const ARCHIVED_EMPLOYEE = `/${STAKEHOLDERS}/${routes.EMPLOYEES}/${routes.ARCHIVE}`;

export const EDIT_EMPLOYEE = `/${STAKEHOLDERS}/${routes.EMPLOYEES}/${routes.EDIT}`;

export const ADD_DRIVER = `/${STAKEHOLDERS}/${routes.DRIVER}/${routes.ADD}`;

export const ARCHIVED_DRIVER = `/${STAKEHOLDERS}/${routes.DRIVER}/${routes.ARCHIVE}`;

export const EDIT_DRIVER = `/${STAKEHOLDERS}/${routes.DRIVER}/${routes.EDIT}`;

export const ADD_VENDOR = `/${STAKEHOLDERS}/${routes.VENDOR}/${routes.ADD}`;

export const ARCHIVED_VENDOR = `/${STAKEHOLDERS}/${routes.VENDOR}/${routes.ARCHIVE}`;

export const EDIT_VENDOR = `/${STAKEHOLDERS}/${routes.VENDOR}/${routes.EDIT}`;

export const ADD_CAB = `/${STAKEHOLDERS}/${routes.CAB}/${routes.ADD}`;

export const ARCHIVED_CAB = `/${STAKEHOLDERS}/${routes.CAB}/${routes.ARCHIVE}`;

export const EDIT_CAB = `/${STAKEHOLDERS}/${routes.CAB}/${routes.EDIT}`;

export const DASHBOARD = `/${routes.ADMIN}/${routes.DASHBOARD}`;

export const DASHBOARD_LIST = `/${routes.ADMIN}/${routes.DASHBOARD}/${routes.DASHBOARD_LIST}`;

export const ROUTE = `/${routes.ADMIN}/${routes.ROUTE}`;

export const ROUTE_PANEL = `/${routes.ADMIN}/${routes.ROUTE}/${routes.ROUTE_PANEL}`;

export const ADMIN_NOTIFICATION = `/${routes.ADMIN}/${routes.MAINNOTI}`;

export const WEBNOTIFICATION = `${ADMIN_NOTIFICATION}/${routes.WEBNOTI}/${routes.NOTI_LIST}`;

export const NOTIFICATION = `${ADMIN_NOTIFICATION}/${routes.NOTI}`;

export const ADD_NOTIFICATION = `${ADMIN_NOTIFICATION}/${routes.WEBNOTI}/${routes.ADD}`;

export const EDIT_NOTIFICATION = `/${ADMIN_NOTIFICATION}/${routes.WEBNOTI}/${routes.EDIT}`;

export const CAB_ROUTE_MAP = `/${routes.ADMIN}/${routes.CAB_MAP}`;

export const CAB_ROUTE_MAP_LIST = `/${routes.ADMIN}/${routes.CAB_MAP}/${routes.CAB_MAP_LIST}`;

export const ROSTER = `/${routes.ADMIN}/${routes.ROSTER}`;

export const ROSTER_LIST = `/${routes.ADMIN}/${routes.ROSTER}/${routes.ROSTER_LIST}`;

export const GROUP_INFO = `/${routes.ADMIN}/${routes.CAB_MAP}/${routes.GROUP_INFO}`;

export const SUBADMIN = `/${routes.ADMIN}/${routes.SUBADMIN}`;

export const SUBADMIN_LIST = `/${routes.ADMIN}/${routes.SUBADMIN}/${routes.SUBADMIN_LIST}`;

export const SUBADMIN_ADD = `/${routes.ADMIN}/${routes.SUBADMIN}/${routes.SUBADMIN_ADD}`;

export const SUBADMIN_EDIT = `/${routes.ADMIN}/${routes.SUBADMIN}/${routes.SUBADMIN_EDIT}`;

export const SUBADMIN_DETAIL = `/${routes.ADMIN}/${routes.SUBADMIN}/${routes.SUBADMIN_DETAIL}`;

export const REQUESTS = `/${routes.ADMIN}/${routes.REQUESTS}`;

export const REQUESTS_LISTS = `/${routes.ADMIN}/${routes.REQUESTS}/${routes.REQUESTS_LISTS}`;

export const SHIFT = `/${routes.ADMIN}/${routes.SHIFT}`;

export const SHIFT_LISTS = `/${routes.ADMIN}/${routes.SHIFT}/${routes.SHIFT_LISTS}`;

export const SHIFT_ADD = `/${routes.ADMIN}/${routes.SHIFT}/${routes.SHIFT_ADD}`;

export const AUDITS = `/${routes.ADMIN}/${routes.AUDITS}`;

export const TRIP_HISTORY = `/${routes.ADMIN}/${routes.TRIP_HISTORY}`;
// archived  sub-admins -- satyam
export const SUBADMIN_ARCHIVE = `/${routes.ADMIN}/${routes.SUBADMIN}/${routes.SUBADMIN_ARCHIVE}`;
// roster view -- satyam
export const ROUTE_INFO = `/${routes.ADMIN}/${routes.ROSTER}/${routes.ROUTE_INFO}`;
// billing satyam
export const BILLING = `/${routes.ADMIN}/${routes.BILLING}`;

