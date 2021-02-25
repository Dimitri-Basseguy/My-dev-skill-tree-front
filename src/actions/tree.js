import axios from 'axios';
import { api } from 'src/utils/url';
import { getUserProfileByUsername, updateSelectedUser } from './user';

export const GET_TREE_REQUEST = 'TREE_REQUEST';
export const GET_TREE_SUCCESS = 'TREE_SUCCESS';
export const GET_TREE_FAILURE = 'TREE_FAILURE';

export const request = (type, value) => ({
  type,
  value,
});
export const success = (type, value) => ({
  type,
  value,
});
export const failure = (type, error) => ({
  type,
  error,
});

// API REQUEST DES SKILLS DE BASE
const getDefaultTree = (user) => {
  return axios({
    method: 'GET',
    url: `${api}/skills/list`,
    headers: { 'Content-Type': 'application/json' },
  })
    .catch((error) => {
      console.log(error);
      return error;
    })
    .then((res) => {
      const baseSkills = res.data;
      // console.log('baseTree', baseSkills);
      const userSkills = user.skills;
      // console.log('userTree', userSkills);

      const tree = newTree(baseSkills);
      const userTree = createValidatedTree(tree, userSkills);

      return userTree;
    });
};

// FORMATER LE TREE CORRECTEMENT POUR CREER L'ARBRE
// Todo : à déplacer dans une fonction externe
const newTree = (baseSkills) => {
  const tree = [];
  baseSkills.map((skill) => {
    const currentId = skill.id;
    const childrenList = [];

    // Initialisation des paramètres par défaut
    // skill.position = { x: 0, y: 0 };
    // skill.rotation = 0;
    skill.isParent = false;
    skill.isMain = false;
    skill.counter = 0;

    // Création de la liste des enfants pour la comparaison
    baseSkills.map((oneSkill) => {
      if (oneSkill.parentId === currentId) {
        childrenList.push(oneSkill.id);
      }
    });

    skill.children = childrenList;

    // Est-ce que l'item est Parent
    if (childrenList.length !== 0) {
      skill.isParent = true;
      skill.counter = 0;
      skill.update = true;
    }

    // Est-ce que l'item est Main
    if (skill.parentId === null) {
      skill.isMain = true;
      skill.counter = 0;
      skill.update = true;
    }
    tree.push(skill);
  });
  return tree;
};

// FORMATER LE TREE AVEC LES DONNEES DE L'UTILISATEUR
// Todo : à déplacer dans une fonction externe
const createValidatedTree = (baseSkills, userSkills) => {
  const tree = [];
  baseSkills.map((b) => {
    if (b.id <= 300) {
      if (userSkills.find((item) => item.id === b.id)) {
        b.isValidated = true;
        tree.push(b);
      }
      else {
        b.isValidated = false;
        tree.push(b);
      }
    }
  });
  howManyChildrenValidated(tree);
  return tree;
};

const howManyChildrenValidated = (tree) => {
  tree.forEach(item => {
    if (item.isMain || item.isParent) {
      item.children.forEach(i => {
        if (tree[i - 1].isValidated) {
          item.counter += 1;
        }
      });
    }
  });
  return tree;
};

export const getUserTree = (username) => (dispatch) => {
  dispatch(request(GET_TREE_REQUEST));

  getUserProfileByUsername(username)
    .then(
      (user) => {
        getDefaultTree(user)
          .then(
            tree => {
              console.log(`Récupération de l'arbre de ${user.pseudonym}`);
              dispatch(success(GET_TREE_SUCCESS, tree));
            },
            error => {
              console.log('ERREUR DE CHARGEMENT');
              dispatch(failure(GET_TREE_FAILURE, 'Erreur de chargement'));
            },
          );
      },
      (error) => {
        console.log('Profile inconnu', error);
      },
    );
};

// ACTIONS DANS LE TREE
export const ADD_ISVALIDATED = 'ADD_ISVALIDATED';
export const REMOVE_ISVALIDATED = 'REMOVE_ISVALIDATED';
export const SET_VALIDATION_REQUEST = 'SET_VALIDATION_REQUEST';
export const SET_VALIDATION_SUCCESS = 'SET_VALIDATION_SUCCESS';
export const SET_VALIDATION_FAILURE = 'SET_VALIDATION_FAILURE';
const successValidationEdit = (type, skill, parent, edit) => ({
  type,
  skill,
  parent,
  edit,
});

const requestValidationEdit = (type, skill, parent) => ({
  type,
  skill,
  parent,
});

export const setValidation = (skill) => {
  return (dispatch, getState) => {
    // Verification si le tree visité est celui de l'utilisateur
    // Dans ce cas il pourra modifier les valeurs
    if (getState().app.selectedUser.id === getState().user.user.id) {
      //console.log('trying to set validation :', skill);
      let parent = null;

      if (skill.parentId !== null) {
        parent = getState().tree.tree[skill.parentId - 1];
      }
      if (skill.isValidated) {
        dispatch(requestValidationEdit(SET_VALIDATION_REQUEST, skill, parent));

        updateTree(getState().user.user, skill, 'remove')
          .then(
            (data) => {
              console.log('Skill id : ', skill.id, '| Total Xp Front : ', data['Xp Front'], '| Total Xp Back :', data['Xp Back']);
              dispatch(successValidationEdit(SET_VALIDATION_SUCCESS, skill, parent, false));
              dispatch(updateSelectedUser(data));
              if (parent !== null && parent.counter > (parent.children.length - 1)) {
                dispatch(setValidation(parent));
              }
            },
            (error) => {
              console.log(error);
            },
          );
      }
      else {
        dispatch(requestValidationEdit(SET_VALIDATION_REQUEST, skill, parent));

        updateTree(getState().user.user, skill, 'add')
          .then(
            (data) => {
              console.log('Skill id : ', skill.id, '| Total Xp Front : ', data['Xp Front'], '| Total Xp Back :', data['Xp Back']);
              dispatch(successValidationEdit(SET_VALIDATION_SUCCESS, skill, parent, true));
              dispatch(updateSelectedUser(data));
              if (parent !== null && parent.counter === (parent.children.length - 1)) {
                dispatch(setValidation(parent));
              }
            },
            (error) => {
              console.log(error);
            },
          );
      }
    }
  };
};

// API REQUEST : 'PUT' DANS LES SKILLS DE L'USER
const updateTree = (user, skill, bool) => {
  const { userId, pseudonym } = user;
  let xpFront = null;
  let xpBack = null;
  let data = {};

  const { id, xp } = skill;

  if (id < 146) {
    xpFront = xp;
    xpBack = 0;
  }
  else if (id > 145) {
    xpFront = 0;
    xpBack = xp;
  }
  if (bool === 'add') {
    data = {
      id: userId,
      xpFront,
      xpBack,
      addSkills: id,
      removeSkills: null,
    };
  }
  else if (bool === 'remove') {
    data = {
      id: userId,
      xpFront: xpFront * -1,
      xpBack: xpBack * -1,
      addSkills: null,
      removeSkills: id,
    };
  }

  return axios({
    method: 'PUT',
    url: `${api}/users/update/${pseudonym}`,
    headers: { Authorization: `Bearer ${JSON.parse(localStorage.token)}` },
    data,
  })
    .then((res) => {
      const { data } = res;
      return data;
    })
    .catch((error) => {
      return error;
    });
};

const updateParent = () => {

};

export const SAVE_TREE = 'SAVE_TREE';
export const UPDATE_TREE = 'UPDATE_TREE';
export const ADD_SKILL = 'ADD_SKILL';
export const REMOVE_SKILL = 'REMOVE_SKILL';

export const saveTree = (defaultTree) => ({
  type: SAVE_TREE,
  value: defaultTree,
});

export const addSkill = (skill) => ({
  type: ADD_SKILL,
  value: skill,
});

export const removeSkill = (skill) => ({
  type: REMOVE_SKILL,
  value: skill,
});
