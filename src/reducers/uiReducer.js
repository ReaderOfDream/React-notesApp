import { combineReducers } from 'redux';
import { LOCATION_CHANGE } from 'react-router-redux';
import { parse } from 'query-string';
import * as directoriesTypes from '../redux-modules/directories/types';
import * as noticesTypes from '../redux-modules/notices/types';
import { CHANGE_NEW_DIRECTORY_PARENT_ID, SEARCH } from '../actions/ui';

export const UI = 'ui';

function noticesFetchingReducer(state = false, action) {
  switch (action.type) {
    case noticesTypes.NOTICES_REQUESTING:
      return true;
    case noticesTypes.NOTICES_RECEIVED:
    case noticesTypes.NOTICES_REQUEST_FAILED:
      return false;
    default: return state;
  }
}

function isNoticesOperationInProgressReducer(state = false, action) {
  switch (action.type) {
    case noticesTypes.NOTICE_DELETE_REQUESTING:
    case noticesTypes.CHANGE_NOTICE_ITEMS_POSITION_REQUESTING:
    case noticesTypes.NOTICE_UPDATE_REQUESTING:
    case noticesTypes.NOTICE_ADD_REQUESTING:
    case noticesTypes.NOTICES_REQUESTING:
      return true;
    case noticesTypes.NOTICE_DELETE_RECEIVED:
    case noticesTypes.NOTICE_DELETE_FAILED:
    case noticesTypes.CHANGE_NOTICE_ITEM_POSITION_RECEIVED:
    case noticesTypes.CHANGE_NOTICE_ITEM_POSITION_FAILED:
    case noticesTypes.NOTICE_UPDATE_RECEIVED:
    case noticesTypes.NOTICE_UPDATE_REQUEST_FAILED:
    case noticesTypes.NOTICES_REQUEST_FAILED:
    case noticesTypes.NOTICES_RECEIVED:
    case noticesTypes.NOTICE_ADD_REQUEST_FAILED:
    case noticesTypes.NOTICE_ADD_RECEIVED:
      return false;
    default: return state;
  }
}

function directoriesFetchingReducer(state = false, action) {
  switch (action.type) {
    case directoriesTypes.DIRECTORIES_REQUESTING:
      return true;
    case directoriesTypes.DIRECTORIES_RECEIVED:
    case directoriesTypes.DIRECTORIES_REQUEST_FAILED:
      return false;
    default: return state;
  }
}

function directoryOperationReducer(state = false, action) {
  switch (action.type) {
    case directoriesTypes.DIRECTORY_ADD_REQUESTING:
    case directoriesTypes.DIRECTORY_UPDATE_REQUESTING:
    case directoriesTypes.DIRECTORY_DELETE_REQUESTING:
      return true;
    case directoriesTypes.DIRECTORY_ADD_COMPLETED:
    case directoriesTypes.DIRECTORY_ADD_REQUEST_FAILED:
    case directoriesTypes.DIRECTORY_UPDATE_COMPLETED:
    case directoriesTypes.DIRECTORY_UPDATE_REQUEST_FAILED:
    case directoriesTypes.DIRECTORY_DELETE_COMPLETED:
    case directoriesTypes.DIRECTORY_DELETE_REQUEST_FAILED:
      return false;
    default: return state;
  }
}

function newDirectoryParentIdReducer(state = 0, action) {
  switch (action.type) {
    case directoriesTypes.DIRECTORY_ADD_REQUESTING: return action.payload.parentId;
    case directoriesTypes.DIRECTORY_ADD_COMPLETED: return null;
    case CHANGE_NEW_DIRECTORY_PARENT_ID: return action.payload.parentId;
    default: return state;
  }
}

function searchTextReducer(state = null, action) {
  switch (action.type) {
    case SEARCH: return action.payload.text;
    default: return state;
  }
}

function searchAdvancedModeReducer(state = false, action) {
  switch (action.type) {
    case SEARCH: return action.payload.advancedMode;
    default: return state;
  }
}

function errorsReducer(state = [], action) {
  if (/.*_FAILED$/.test(action.type)) {
    const message = action.payload.error || 'Something went wrong =(';
    return [...state, message];
  }
  if (/.*_REQUESTING$/.test(action.type) || (action.type === LOCATION_CHANGE)) {
    return [];
  }

  return state;
}

const uiReducer = combineReducers({
  isNoticesFetching: noticesFetchingReducer,
  isNoticesOperationInProgress: isNoticesOperationInProgressReducer,
  isDirectoriesFetching: directoriesFetchingReducer,
  isDirectoryOperationInProgress: directoryOperationReducer,
  newDirectoryParentId: newDirectoryParentIdReducer,
  searchText: searchTextReducer,
  searchAdvancedMode: searchAdvancedModeReducer,
  errors: errorsReducer,
});

export { uiReducer };

// / PUBLIC SELECTORS
export function getSelectedDirectoryId(state) {
  const directoryId = state.router.location.pathname.slice(1).split('/')[0];

  if (directoryId) {
    return Number(directoryId);
  }

  return null;
}

export function getNewDirectoryParentId(state) {
  return state[UI].newDirectoryParentId;
}

export function getSearchFilter(state) {
  const query = parse(state.router.location.search);
  if (query.q === undefined) {
    return null;
  }

  return ({ text: query.q, isAdvancedSearch: query.advancedMode === 'true' });
}

export function getDirectoryOperationInProgress(state) {
  return state[UI].isDirectoryOperationInProgress;
}

export function getDirectoriesLoading(state) {
  return state[UI].isDirectoriesFetching;
}

export function getNoticesOperationInProgress(state) {
  return state[UI].isNoticesOperationInProgress || state[UI].isNoticesFetching;
}

export function getNoticesLoading(state) {
  return state[UI].isNoticesFetching;
}
