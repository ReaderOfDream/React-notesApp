import { combineReducers } from 'redux';
import { noticesReducer, NOTICES } from '../redux-modules/notices';
import {
  directoriesReducer, DIRECTORIES, rootDirectoryIdReducer, ROOT_DIRECTORY_ID,
} from '../redux-modules/directories';
import { tagsReducer } from '../redux-modules/tags/index';
import { TAGS } from '../redux-modules/tags/const';
import { uiReducer, UI } from './uiReducer';
import { connectRouter } from 'connected-react-router'

export default function createReducer(history){ 
  return combineReducers({
    [DIRECTORIES]: directoriesReducer,
    [ROOT_DIRECTORY_ID]: rootDirectoryIdReducer,
    [NOTICES]: noticesReducer,
    [TAGS]: tagsReducer,
    [UI]: uiReducer,
    router: connectRouter(history)
  });
}