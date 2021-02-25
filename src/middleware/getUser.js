import { api } from 'src/utils/url';
import {
  GET_USER_BY_ID,
  loadUser,
} from 'src/actions/user';
import axios from 'axios';
import authHeader from 'src/components/_helpers/authHeader';


const getUser = (store) => (next) => (action) => {
  // console.log('On a intercepté une action dans authMiddleware', action);
  const requestOptions = { headers: authHeader() };

  switch (action.type) {
    case GET_USER_BY_ID: {
      const userID = action.id;
      const urlBaseAPI = `^${api}/users/show`;
      const urlAPI = urlBaseAPI + userID;
      axios.get(urlAPI, requestOptions, {
      })
        .then((response) => {
          // on voudrait mettre à jour le state par rapport à la réponse
          const actionToDispatch = loadUser(response.data);
          store.dispatch(actionToDispatch);
        })
        .catch((error) => {
          // TODO créer une action DISPLAY_ERROR, qui permettrait d'afficher l'erreur
          // et en profiter pour mettre state.loading à false dans le reducer
          console.warn(error);
        });

      // store.dispatch(loadUser(newUser));

      next(action);
      break;
    }
    default:
      // on passe l'action au voisin (le middleware suivant, ou le store si on est le
      // dernier middleware)
      next(action);
  }
};

export default getUser;
