import axios from 'axios';
import { api } from 'src/utils/url';
import {
  LOGIN,
  LOGOUT,
  EDIT_USER,
  GET_USER_BY_USERNAME,
  getUserByUsername,
  loadUser,
} from 'src/actions/user';

const userMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case LOGIN:
      axios({
        method: 'POST',
        url: `${api}/login_check`,
        headers: { 'Content-Type': 'application/json' },
        data: {
          username: store.getState().user.username,
          password: store.getState().user.password,
        },
      })
        .then((res) => {
          store.dispatch(loadUser(res.data.token, { pseudonym: store.getState().user.username }));
        })
        .then(() => {
          store.dispatch(getUserByUsername());
        })
        .catch((error) => {
          console.warn(error);
          //TODO : Renvoyer une erreur si 401
        });
      break;

    case LOGOUT:
      console.log('Todo : Vider le store utilisateur ici');
      store.dispatch(loadUser('', '', false));
      store.getState().user.user = '';
      localStorage.clear();
      break;

    case EDIT_USER: {
      const s = store.getState().user.user;
      axios({
        method: 'PUT',
        url: `${api}/users/edit/${store.getState().user.user.pseudonym}`,
        headers: {
          Authorization: `Bearer ${JSON.parse(store.getState().user.token)}`,
        },
        data: {
          id: s.id,
          pseudonym: s.pseudonym,
          fisrtName: s.fisrtName,
          lastName: s.lastName,
          avatar: s.avatar,
          email: s.email,
          gitHub: s.github,
          linkedIn: s.linkedin,
          visibility: s.visibility,
          bio: s.bio,
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.warn(error);
        });
      next(action);
      break;
    }

    case GET_USER_BY_USERNAME:
      axios({
        method: 'GET',
        url: `${api}/users/show/${store.getState().user.user.pseudonym}`,
        headers: { Authorization: `Bearer ${store.getState().user.token}` },
      })
        .then((res) => {
          store.dispatch(loadUser(store.getState().user.token, res.data, true));
          localStorage.setItem('user', JSON.stringify(store.getState().user.user.pseudonym));
          localStorage.setItem('token', JSON.stringify(store.getState().user.token));
        })
        .catch((error) => {
          console.warn(error);
        })
        .then(
          console.log('Ajouter isMe')
        );
      next(action);
      break;
    default:
      next(action);
  }
};

export default userMiddleware;
