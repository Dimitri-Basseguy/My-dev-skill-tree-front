import {
  GET_ALL_REQUEST,
  GET_ALL_FAILURE,
  GET_ALL_SUCCESS,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  SELECTED_USER_UPDATE
} from 'src/actions/user';

import {
  LOADING,
  CHANGE_FIELD,
  GET_SELECTED_USER_SUCCESS,
  SAVE_USERS_LIST,
  SAVE_ADMIN_LIST,
} from 'src/actions/app';

import { SUCCESS, ERROR, CLEAR } from 'src/actions/alert';

const initialState = {
  loading: true,
  register: {
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    visibility: true,
  },
  errors: {
    username: null,
    firstname: null,
    lastname: null,
    email: null,
    password: null,
  },
  alert: [],
  users: [],
  selectedUser: { id:null },
  admins: [],
  userLoading: true,
  usersLoading: true,
};

const App = (state = initialState, action = {}) => {
  switch (action.type) {
    case LOADING: {
      return {
        ...state,
        loading: action.bool,
      };
    }
    // USER REQUEST
    case GET_USER_REQUEST:
      return {
        ...state,
        selectedUser: '',
        userLoading: true,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        selectedUser: action.user,
        userLoading: false,
      };
    case GET_USER_FAILURE:
      return {
        ...state,
        selectedUser: null,
        alert: action.error,
      };
    case SELECTED_USER_UPDATE:
      return {
        ...state,
        selectedUser: {
          ...state.selectedUser,
          xpFront: action.xpFront,
          xpBack: action.xpBack,
          xpFull: action.xpFull,
        },
      };
    case GET_ALL_REQUEST:
      return {
        ...state,
        usersLoading: true,
      };
    case GET_ALL_SUCCESS:
      return {
        ...state,
        users: action.user,
        usersLoading: false,
      };
    case GET_ALL_FAILURE:
      return {
        ...state,
        usersLoading: false,
        alert: action.error,
      };

    case ERROR:
      return {
        ...state,
        alert: [...state.alert, action.message],
      };
    case SUCCESS:
      return {
        ...state,
        alert: [...state.alert, action.message],
      };
    case CLEAR:
      return {
        ...state,
        alert: [],
        selectedUser: {},
        userLoading: true,
        loadingTree: true,
      };
    case SAVE_USERS_LIST:
      return {
        ...state,
        users: action.users,
      };
    case SAVE_ADMIN_LIST:
      return {
        ...state,
        admins: action.admins,
      };
    default:
      return state;
  }
};

export default App;
