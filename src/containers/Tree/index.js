import { connect } from 'react-redux';

import { getUserByIdAction } from 'src/actions/user';
import { getDefaultTree, updateTree } from 'src/actions/tree';

import Tree from 'src/components/Tree';

const mapStateToProps = (state) => ({
  // nom de la prop à remplir: donnée à récupérer dans le state
  user: state.user.user,
  skillList: state.tree.tree,
});

const mapDispatchToProps = (dispatch) => ({
  // nom de la prop à remplir: callback qui contient un appel à dispatch
  getUserById: (id) => {
    dispatch(getUserByIdAction(id));
  },
  getDefaultTree: () => {
    dispatch(getDefaultTree());
  },
  updateTree: () => {
    /*
    Partie Dev
     */
    console.log('On envoie l\'action de la sauvegarde de l\'arbre');
    /*
    Partie Prod
     */
    dispatch(updateTree());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tree);
