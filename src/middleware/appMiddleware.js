import axios from 'axios';
import { api } from 'src/utils/url';

import { CHECK_LOGGED, loadUser } from 'src/actions/user';
import { GET_ADMIN, loading, ADD_USER, GET_SELECTED_USER, GET_ALL_USERS, saveAdminList ,saveUsersList, getSelectedUserSuccess } from 'src/actions/app';


const appMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case CHECK_LOGGED:
      if (localStorage.getItem('token') !== null) {
        if (store.getState().user.isLogged) {
          console.log('je suis connecté');
        }
        else {
          axios({
            method: 'GET',
            url: `${api}/users/show/${JSON.parse(localStorage.getItem('user'))}`,
            headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}` },
          })
            .then((res) => {
              store.dispatch(loadUser(localStorage.getItem('token'), res.data, true));
              store.dispatch(loading(false));
            })
            .catch((error) => {
              console.warn(error);
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              store.dispatch(loading(false));
              console.log('Redirect sur la page Login');
            });
          next(action);
          break;
        }
      }
      else {
        store.dispatch(loading(false));
        console.log('Redirect sur la page Login');
        // redirect sur la page login
      }
      next(action);
      break;

    case GET_SELECTED_USER: {
      const user = store.getState().app.users.find((i) => i.slug === localStorage.getItem('getUserUrl'));
      if (user !== undefined) {
        store.dispatch(getSelectedUserSuccess(user));
      }
      break;
    }

    case ADD_USER:
      axios({
        method: 'POST',
        url: `${api}/users/add`,
        headers: { 'Content-Type': 'application/json' },
        data: {
          pseudonym: store.getState().app.register.username,
          fisrtName: store.getState().app.register.firstname,
          lastName: store.getState().app.register.lastname,
          email: store.getState().app.register.email,
          password: store.getState().app.register.password,
          visibility: store.getState().app.register.visibility,
        },
      })
        .then((res) => {
        })
        .catch((error) => {
          console.warn(error);
        });
      next(action);
      break;

    case GET_ADMIN:
      axios({
        method: 'GET',
        url: `${api}/users/admin/list`,
      })
        .then((res) => {
          store.dispatch(saveAdminList(res.data));
        })
        .catch((error) => {
          console.warn(error);
        });
      next(action);
      break;
    case GET_ALL_USERS:
      axios({
        method: 'GET',
        url: `${api}/users/list`,
      })
        .then((res) => {
          store.dispatch(saveUsersList(res.data));
        })
        .catch((error) => {
          console.warn(error);
        });
      next(action);
      break;
    default:
      next(action);
  }
};

export default appMiddleware;
