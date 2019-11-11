import axios from 'axios';
import { put, takeEvery, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { normalize } from 'normalizr';
import * as directoriesTypes from './redux-modules/directories/types';
import * as directoriesActions from './redux-modules/directories/actions';
import * as noticesTypes from './redux-modules/notices/types';
import * as noticesActions from './redux-modules/notices/actions';
import * as constants from './common/constants';
import { noticeSchema } from './common/schema';
import { getErrorMessageFromException } from './common/utils';

function* fetchNotices() {
  try {
    const response = yield axios.get(constants.noticesPath);
    const { notices, tags } = normalize(response.data, [noticeSchema]).entities;
    const receiveNoticesAction = noticesActions.receiveNotices(notices, tags);
    yield put(receiveNoticesAction);
  } catch (e) {
    yield put(noticesActions.requestNoticesFailed(getErrorMessageFromException(e)));
  }
}

function* addNotice(action) {
  try {
    const response = yield axios.post(constants.noticesPath, action.payload.notice);
    const normRes = normalize(response.data, noticeSchema);
    const notice = normRes.entities.notices[normRes.result];
    const { tags } = normRes.entities;

    yield put(noticesActions.receiveAddNotice(notice, tags));
    yield put(push(`/${action.payload.notice.directoryId}`));
  } catch (e) {
    yield put(noticesActions.requestAddNoticeFailed(getErrorMessageFromException(e)));
  }
}

function* updateNotice(action) {
  try {
    const response = yield axios.put(`${constants.noticesPath}/${action.payload.notice.id}`, action.payload.notice);

    const normalizedNotice = normalize(response.data, noticeSchema);
    const notice = normalizedNotice.entities.notices[normalizedNotice.result];
    const { tags } = normalizedNotice.entities;
    yield put(noticesActions.receiveUpdateNotice(notice, tags));
    yield put(push(`/${action.payload.notice.directoryId}`));
  } catch (e) {
    yield put(noticesActions.requestUpdateNoticeFailed(getErrorMessageFromException(e)));
  }
}

function* deleteNotice(action) {
  try {
    yield axios.delete(`${constants.noticesPath}/${action.payload.id}`);
    yield put(noticesActions.receiveDeleteNotice(action.payload.id));
  } catch (e) {
    yield put(noticesActions.requestDeleteNoticeFailed(getErrorMessageFromException(e)));
  }
}

function* changeNoticeItemsPosition(action) {
  try {
    yield action.payload.notices.map(notice => axios.put(`${constants.noticesPath}/${notice.id}`, notice));
    yield put(noticesActions.requestNotices());
  } catch (e) {
    yield put(noticesActions.requestUpdateNoticeFailed(getErrorMessageFromException(e)));
  }
}

function* fetchDirectories() {
  try {
    const response = yield axios.get(constants.directoriesPath);
    yield put(directoriesActions.receiveDirectories(response.data));
  } catch (e) {
    yield put(directoriesActions.requestDirectoriesFailed(getErrorMessageFromException(e)));
  }
}

function* addDirectory(action) {
  try {
    const response = yield axios.post(constants.directoriesPath, action.payload);
    const newDirectory = { ...response.data };
    yield put(directoriesActions.addDirectoryCompleted(newDirectory));
    yield put(push(`${newDirectory.id}`));
  } catch (e) {
    yield put(directoriesActions.addDirectoryRequestFailed(getErrorMessageFromException(e)));
  }
}

function* updateDirectory(action) {
  try {
    const response = yield axios.put(`${constants.directoriesPath}/${action.payload.directory.id}`, action.payload.directory);
    yield put(directoriesActions.updateDirectoryCompleted(response.data));
  } catch (e) {
    yield put(directoriesActions.updateDirectoryRequestFailed(getErrorMessageFromException(e)));
  }
}

function* deleteDirectory(action) {
  try {
    yield axios.delete(`${constants.directoriesPath}/${action.payload.directoryId}`);
    yield put(directoriesActions.deleteDirectoryCompleted(action.payload.directoryId));
    yield put(directoriesActions.requestDirectories());
    yield put(noticesActions.requestNotices());
    yield put(push('/'));
  } catch (e) {
    yield put(directoriesActions.deleteDirectoryRequestFailed(getErrorMessageFromException(e)));
  }
}

export function* noticesSaga() {
  yield takeEvery(noticesTypes.NOTICES_REQUESTING, fetchNotices);
}

export function* noticeAddSaga() {
  yield takeEvery(noticesTypes.NOTICE_ADD_REQUESTING, addNotice);
}

export function* noticeUpdateSaga() {
  yield takeEvery(noticesTypes.NOTICE_UPDATE_REQUESTING, updateNotice);
}

export function* noticeDeleteSaga() {
  yield takeEvery(noticesTypes.NOTICE_DELETE_REQUESTING, deleteNotice);
}

export function* changeNoticeItemPositionSaga() {
  yield takeEvery(noticesTypes.CHANGE_NOTICE_ITEMS_POSITION_REQUESTING, changeNoticeItemsPosition);
}

export function* directoriesSaga() {
  yield takeEvery(directoriesTypes.DIRECTORIES_REQUESTING, fetchDirectories);
}

export function* directoryAddSaga() {
  yield takeEvery(directoriesTypes.DIRECTORY_ADD_REQUESTING, addDirectory);
}

export function* directoryUpdateSaga() {
  yield takeEvery(directoriesTypes.DIRECTORY_UPDATE_REQUESTING, updateDirectory);
}

export function* directoryDeleteSaga() {
  yield takeEvery(directoriesTypes.DIRECTORY_DELETE_REQUESTING, deleteDirectory);
}

export default function* rootSaga() {
  yield all([
    noticesSaga(),
    noticeAddSaga(),
    noticeUpdateSaga(),
    noticeDeleteSaga(),
    directoriesSaga(),
    directoryAddSaga(),
    directoryUpdateSaga(),
    directoryDeleteSaga(),
    changeNoticeItemPositionSaga(),
  ]);
}
