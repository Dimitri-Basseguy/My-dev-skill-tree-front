export const CHANGE_FIELD = 'CHANGE_FIELD';
export const ADD_USER = 'ADD_USER';
export const GET_SELECTED_USER = 'GET_SELECTED_USER';
export const GET_SELECTED_USER_SUCCESS = 'GET_SELECTED_USER_SUCCESS';
export const LOADING = 'LOADING';
export const CHECK_ATTRIBUTE = 'CHECK_ATTRIBUTE';
export const GET_ALL_USERS = 'GET_ALL_USERS';
export const SAVE_USERS_LIST = 'SAVE_USERS_LIST';
export const GET_ADMIN = 'GET_ADMIN';
export const SAVE_ADMIN_LIST = 'SAVE_ADMIN_LIST';

export const changeField = (newValue, identifier) => ({
  type: CHANGE_FIELD,
  newValue,
  identifier,
});

export const loading = (bool) => ({
  type: LOADING,
  value: bool,
});

export const addUser = () => ({
  type: ADD_USER,
});

export const getSelectedUser = () => ({
  type: GET_SELECTED_USER,
});

export const getSelectedUserSuccess = (user) => ({
  type: GET_SELECTED_USER_SUCCESS,
  user,
});

export const checkAttribute = () => ({
  type: CHECK_ATTRIBUTE,
});

export const getAllUsers = () => ({
  type: GET_ALL_USERS,
});

export const saveUsersList = (users) => ({
  type: SAVE_USERS_LIST,
  users,
});
export const getAdmin = () => ({
  type: GET_ADMIN,
});

export const saveAdminList = (admins) => ({
  type: SAVE_ADMIN_LIST,
  admins,
});