import * as types from './types';

export function requestDirectories() {
  return {
    type: types.DIRECTORIES_REQUESTING,
  };
}

export function receiveDirectories(directories) {
  return {
    type: types.DIRECTORIES_RECEIVED,
    payload: {
      directories,
    },
  };
}

export function requestDirectoriesFailed(error) {
  return {
    type: types.DIRECTORIES_REQUEST_FAILED,
    payload: {
      error,
    },
  };
}

export function requestAddDirectory(name, parentId) {
  return {
    type: types.DIRECTORY_ADD_REQUESTING,
    payload: {
      name,
      parentId,
    },
  };
}

export function addDirectoryCompleted(directory) {
  return {
    type: types.DIRECTORY_ADD_COMPLETED,
    payload: {
      directory,
    },
  };
}

export function addDirectoryRequestFailed() {
  return {
    type: types.DIRECTORY_ADD_REQUEST_FAILED,
  };
}

export function updateDirectoryRequest(directory) {
  return {
    type: types.DIRECTORY_UPDATE_REQUESTING,
    payload: {
      directory,
    },
  };
}

export function updateDirectoryCompleted(directory) {
  return {
    type: types.DIRECTORY_UPDATE_COMPLETED,
    payload: {
      directory,
    },
  };
}

export function updateDirectoryRequestFailed() {
  return {
    type: types.DIRECTORY_UPDATE_REQUEST_FAILED,
  };
}

export function deleteDirectoryRequest(id) {
  return {
    type: types.DIRECTORY_DELETE_REQUESTING,
    payload: {
      directoryId: id,
    },
  };
}

export function deleteDirectoryCompleted(id) {
  return {
    type: types.DIRECTORY_DELETE_COMPLETED,
    payload: {
      directoryId: id,
    },
  };
}

export function deleteDirectoryRequestFailed() {
  return {
    type: types.DIRECTORY_DELETE_REQUEST_FAILED,
  };
}
