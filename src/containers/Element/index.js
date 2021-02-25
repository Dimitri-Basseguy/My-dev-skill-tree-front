import { connect } from 'react-redux';

import { addSkill, removeSkill } from 'src/actions/tree';

/* Suppression d'alerte d'ES Lint car ici il ne s'agit pas d'utiliser le composant Element,
simplement de le connecter au container
 */

// eslint-disable-next-line import/no-cycle
import Element from 'src/components/Element';

const mapStateToProps = (state) => ({
  // nom de la prop à remplir: donnée à récupérer dans le state
});

const mapDispatchToProps = (dispatch) => ({
  // nom de la prop à remplir: callback qui contient un appel à dispatch
  addSkill: (skill) => {
    /*
    Partie Dev
     */
    console.log('On ajoute un skill');
    /*
    Partie Prod
     */
    dispatch(addSkill(skill));
  },
  removeSkill: (skill) => {
    /*
    Partie Dev
     */
    console.log('On supprime un skill');
    /*
    Partie Prod
     */
    dispatch(removeSkill(skill));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Element);
