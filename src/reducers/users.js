import {
  CHANGE_FIELD,
  LOAD_USER,
  CHANGE_FIELD_PROFILE,
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  EDIT_REQUEST,
  EDIT_FAILURE,
  EDIT_SUCCESS,
} from 'src/actions/user';

const initialState = {
  user: {},
  username: '',
  password: '',
  token: '',
  isLogged: false,
  loggingIn: false,
  registering: false,
  editing: false,
};

const User = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_FIELD: {
      const target = action.identifier;
      return {
        ...state,
        [target]: action.newValue,
      };
    }
    case CHANGE_FIELD_PROFILE: {
      const target = action.identifier;
      return {
        ...state,
        user: {
          ...state.user,
          [target]: action.newValue,
        },
      };
    }
    case LOAD_USER:
      return {
        ...state,
        user: action.user,
        token: action.token,
        isLogged: action.isLogged,
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        username: action.user,
        loggingIn: true,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loggingIn: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        isLogged: true,
        loggingIn: false,
      };
    case REGISTER_REQUEST:
      return {
        ...state,
        registering: true,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        registering: false,
      }
    case REGISTER_SUCCESS:
      return {
        ...state,
        registering: false,
      };
    case EDIT_REQUEST:
      return {
        ...state,
        editing: true,
      };
    case EDIT_SUCCESS: {
      const { username, firstname, lastname, github, linkedin, avatar, bio, email, visibility } = action.user;
      return {
        ...state,
        user: {
          ...state.user,
          pseudonym: username,
          fisrtName: firstname,
          lastName: lastname,
          email,
          github,
          linkedin,
          avatar,
          bio,
          visibility,
        },
        editing: false,
      };
    }
    case EDIT_FAILURE:
      return {
        ...state,
        editing: false,
      };
    default:
      return state;
  }
};

export default User;
