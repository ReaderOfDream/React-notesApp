import {
  DIRECTORIES_RECEIVED, DIRECTORY_ADD_COMPLETED, DIRECTORY_UPDATE_COMPLETED,
  DIRECTORY_DELETE_COMPLETED,
} from './types';
import { RootDirectoryName, DIRECTORIES, ROOT_DIRECTORY_ID } from './const';

export { DIRECTORIES, ROOT_DIRECTORY_ID };

function receiveDirectories(state, directories) {
  return [...directories];
}

function addDirectory(state, directory) {
  return [...state, directory];
}

function updateDirectory(state, directory) {
  const directories = [...state];
  const itemIndexToReplace = directories.findIndex(i => i.id === directory.id);
  directories[itemIndexToReplace] = directory;
  return directories;
}

function removeDirectory(state, directoryId) {
  const directories = state.filter(i => i.id !== directoryId);
  return directories;
}

export function directoriesReducer(state = [], action) {
  switch (action.type) {
    case DIRECTORIES_RECEIVED: return receiveDirectories(state, action.payload.directories);
    case DIRECTORY_ADD_COMPLETED: return addDirectory(state, action.payload.directory);
    case DIRECTORY_UPDATE_COMPLETED: return updateDirectory(state, action.payload.directory);
    case DIRECTORY_DELETE_COMPLETED: return removeDirectory(state, action.payload.directoryId);
    default: return state;
  }
}

export function rootDirectoryIdReducer(state = 0, action) {
  switch (action.type) {
    case DIRECTORIES_RECEIVED:
      return action.payload.directories.filter(i => i.name === RootDirectoryName)[0].id;
    default: return state;
  }
}
