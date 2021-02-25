import { combineReducers } from 'redux';

import appReducer from './app';
import userReducer from './users';
import treeReducer from './tree';

const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  tree: treeReducer,
});

export default rootReducer;
