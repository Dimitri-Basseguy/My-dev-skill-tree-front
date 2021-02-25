import axios from 'axios';
import { api } from 'src/utils/url';
import { history } from 'src/utils/history';
import { error as alertError, success as alertSuccess, clear } from 'src/actions/alert';

// TYPES
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const EDIT_REQUEST = 'EDIT_REQUEST';
export const EDIT_SUCCESS = 'EDIT_SUCCESS';
export const EDIT_FAILURE = 'EDIT_FAILURE';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const GET_ALL_REQUEST = 'GET_ALL_REQUEST';
export const GET_ALL_SUCCESS = 'GET_ALL_SUCCESS';
export const GET_ALL_FAILURE = 'GET_ALL_FAILURE';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';

export const SELECTED_USER_UPDATE = 'SELECTED_USER_UPDATE';

// ACTIONS
export const request = (type, user) => ({
  type,
  user,
});

export const success = (type, user) => ({
  type,
  user,
});

export const failure = (type, error) => ({
  type,
  error,
});
//
//  LOGIN
//
// LOGIN #2 : GET TOKEN API CALL
const getTokenAPI = (username, password) => {
  return axios({
    method: 'POST',
    url: `${api}/login_check`,
    headers: { 'Content-Type': 'application/json' },
    data: { username, password },
  })
    .catch((error) => error)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('user', JSON.stringify(username));
      localStorage.setItem('token', JSON.stringify(token));
      return token;
    });
};

// LOGIN #3 : GET USERNAME API CALL
const getUserByUsernameAPI = (token, username) => (dispatch) => {
  axios({
    method: 'GET',
    url: `${api}/users/show/${username}`,
    headers: { Authorization: `Bearer ${token}` },
  })
    .catch((error) => error)
    .then((res) => {
      const user = res.data;
      history.push('/');
      dispatch(success(LOGIN_SUCCESS, user));
    });
};

// LOGIN #1 : LOGIN SYSTEM
export const login = (username, password) => (dispatch) => {
  dispatch(request(LOGIN_REQUEST, username));

  getTokenAPI(username, password)
    .then(
      (token) => {
        dispatch(getUserByUsernameAPI(token, username));
        dispatch(getUserProfile(username));
      },
      (error) => {
        console.log(error);
        dispatch(failure(LOGIN_FAILURE, error.toString()));
        dispatch(alertError('Username or Password is incorrect...'));
      },
    );
};

//
//  REGISTER
//

// REGISTER #1 : REGISTER SYSTEM
export const register = (user) => (dispatch) => {
  const formUser = user;
  dispatch(request(REGISTER_REQUEST, user));
  dispatch(clear());

  getAllUsersAPI()
    .then(
      (users) => {
        const checkUsername = users.find(s => s.pseudonym === formUser.username);
        const checkEmail = users.find(s => s.email === formUser.email);
        // Check si le nom d'utilisateur existe déjà en bdd
        // s'il existe déjà dispatch message d'erreur
        if (checkUsername) {
          dispatch(alertError('Error : Le nom d\'utilisateur existe déjà !'));
        }
        if (checkEmail) {
          dispatch(alertError('Error : L\'email existe déjà !'));
        }
        // sinon, création de l'utilisateur
        if (checkUsername === undefined && checkEmail === undefined) {
          addUser(formUser)
            .then(
              (user) => {
                dispatch(success(REGISTER_SUCCESS, user));
                getTokenAPI(formUser.username, formUser.password)
                  .then(
                    (token) => {
                      dispatch(getUserByUsernameAPI(token, formUser.username));
                      dispatch(alertSuccess('Vous êtes enregistré sur My Dev Skill Tree !'));
                      // redirect(`${formUser.username}`);
                    },
                  );
              },
              (error) => {
                console.log('Error : API Error');
              },
            );
        }
      },
      (error) => {
        console.log(error);
      },
    );
};

const redirect = (path) => {
  return history.push(`/#/${path}`);
};

// REGISTER #2 : ADD USER
const addUser = (user) => {
  const { username, firstname, lastname, email, password, visibility } = user;
  return axios({
    method: 'POST',
    url: `${api}/users/add`,
    headers: { 'Content-Type': 'application/json' },
    data: {
      pseudonym: username,
      fisrtName: firstname,
      lastName: lastname,
      email,
      password,
      visibility,
    },
  })
    .catch((error) => error)
    .then((res) => {
      console.log(res);
      const user = res.data;
      return user;
    });
};

//
//  GET ALL USERS
//

// GET ALL USERS #2 : GET ALL USERS API
const getAllUsersAPI = () => {
  return axios({
    method: 'GET',
    url: `${api}/users/list`,
  })
    .catch((error) => error)
    .then((res) => {
      const users = res.data;
      return users;
    });
};

// GET ALL USERS #1 : GET ALL USERS ACTION
export const getAllUsers = () => (dispatch) => {
  dispatch(request(GET_ALL_REQUEST));
  getAllUsersAPI()
    .then(
      (users) => {
        dispatch(success(GET_ALL_SUCCESS, users));
      },
      (error) => {
        console.log(error);
        dispatch(failure(GET_ALL_FAILURE, error.toString()));
        dispatch(alertError('Marche pas!'));
      },
    );
};

export const getUserProfileByUsername = (url) => {
  return axios({
    method: 'GET',
    url: `${api}/users/show/${url}`,
  })
    .then((res) => {
      const user = res.data;
      return user;
    });
};

// GET USER PROFILE
export const getUserProfile = (url) => {
  return (dispatch, getState) => {
    dispatch(request(GET_USER_REQUEST));
    const getUser = null;
    getUserProfileByUsername(url)
      .then(
        (user) => {
          dispatch(success(GET_USER_SUCCESS, user));
        },
        (error) => {
          dispatch(failure(GET_USER_FAILURE, error));
        },
      );
  };
};

export const editProfile = (editedUser) => {
  return (dispatch, getState) => {
    dispatch(request(EDIT_REQUEST));
    console.log(editedUser);
    const { id, pseudonym } = getState().user.user;
    console.log(pseudonym);
    editProfileAPI(id, pseudonym, editedUser)
      .then(
        (user) => {
          console.log(user);
          dispatch(success(EDIT_SUCCESS, editedUser));
          history.push(`/${editedUser.username}`)
        },
        (error) => {
          console.log(error);
          dispatch(failure(EDIT_FAILURE));
        },
      );
  };
};

export const editProfileAPI = (id, previousUsername, editedUser) => {
  const { username, firstname, lastname, github, linkedin, avatar, bio, email, visibility } = editedUser;
  return axios({
    method: 'PUT',
    url: `${api}/users/edit/${previousUsername}`,
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
    },
    data: {
      id,
      pseudonym: username,
      fisrtName: firstname,
      lastName: lastname,
      avatar,
      email,
      gitHub: github,
      linkedIn: linkedin,
      visibility,
      bio,
    },
  })
    .then((res) => {
      const user = res.data;
      return user;
    });
};

export const update = (type, xpFront, xpBack, xpFull) => ({
  type,
  xpFront,
  xpBack,
  xpFull,
});

export const updateSelectedUser = (user) => {
  return (dispatch) => {
    dispatch(update(SELECTED_USER_UPDATE, user['Xp Front'], user['Xp Back'], user['XpFull']));
  };
};




///////// OOOOOOLD


export const GET_USER_BY_ID = 'GET_USER_BY_ID';
export const LOAD_USER = 'LOAD_USER';
export const CHECK_LOGGED = 'CHECK_LOGGED';

export const CHANGE_FIELD = 'CHANGE_FIELD';
export const CHANGE_FIELD_PROFILE = 'CHANGE_FIELD_PROFILE';
//export const LOGIN = 'LOGIN';
//export const LOGOUT = 'LOGOUT';
export const EDIT_USER = 'EDIT_USER';
export const GET_USER_BY_USERNAME = 'GET_USER_BY_USERNAME';



export const logout = () => ({
  type: LOGOUT,
});

export const checkLogged = () => ({
  type: CHECK_LOGGED,
});

export const changeFieldProfile = (newValue, identifier) => ({
  type: CHANGE_FIELD_PROFILE,
  newValue,
  identifier,
});

export const editUser = () => ({
  type: EDIT_USER,
});

export const getUserByUsername = (username) => ({
  type: GET_USER_BY_USERNAME,
  user: username,
});

export const getUserByIdAction = (newId) => ({
  type: GET_USER_BY_ID,
  id: newId,
});

export const loadUser = (token, user, isLogged) => ({
  type: LOAD_USER,
  token,
  user,
  isLogged,
});
