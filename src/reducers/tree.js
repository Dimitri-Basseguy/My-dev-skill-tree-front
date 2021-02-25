import { GET_TREE_REQUEST, GET_TREE_SUCCESS, GET_TREE_FAILURE, SET_VALIDATION_SUCCESS, SET_VALIDATION_REQUEST, ADD_SKILL } from '../actions/tree';
import { CLEAR } from 'src/actions/alert';

const initialState = {
  tree: [],
};

const treeReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_TREE_REQUEST:
      return {
        ...state,
        loadingTree: true,
      };
    case GET_TREE_SUCCESS:
      return {
        ...state,
        tree: action.value,
        loadingTree: false,
      };
    case GET_TREE_FAILURE:
      return {
        ...state,
        loadingTree: true,
      };
    case SET_VALIDATION_REQUEST:
      return {
        tree: state.tree.map((skill) => {
          if (skill.id === action.skill.id) {
            return {
              ...skill,
              isValidated: action.edit,
            };
          }
          if (action.parent !== null && skill.id === action.parent.id) {
            return {
              ...skill,
              update: false,
            };
          }
          return skill;
        }),
      };
    case SET_VALIDATION_SUCCESS: {
      const increment = action.edit ? +1 : -1;
      return {
        ...state,
        tree: state.tree.map((skill) => {
          if (skill.id === action.skill.id) {
            return {
              ...skill,
              isValidated: action.edit,
            };
          }
          if (action.parent !== null && skill.id === action.parent.id) {
            return {
              ...skill,
              counter: skill.counter + increment,
              update: true,
            };
          }
          return skill;
        }),
      };
    }
    case CLEAR:
      return {
        ...state,
        loadingTree:true,
      }
    default: return state;
  }
};

export default treeReducer;
