import * as types from './types';

export function requestNotices() {
  return {
    type: types.NOTICES_REQUESTING,
  };
}

export function receiveNotices(notices, tags) {
  return {
    type: types.NOTICES_RECEIVED,
    payload: {
      notices,
      tags,
    },
  };
}

export function requestNoticesFailed(error) {
  return {
    type: types.NOTICES_REQUEST_FAILED,
    payload: {
      error,
    },
  };
}

export function requestAddNotice(notice) {
  return {
    type: types.NOTICE_ADD_REQUESTING,
    payload: {
      notice,
    },
  };
}

export function requestAddNoticeFailed(error) {
  return {
    type: types.NOTICE_ADD_REQUEST_FAILED,
    payload: {
      error,
    },
  };
}

export function receiveAddNotice(notice, tags) {
  return {
    type: types.NOTICE_ADD_RECEIVED,
    payload: {
      notice,
      tags,
    },
  };
}

export function requestUpdateNotice(notice) {
  return {
    type: types.NOTICE_UPDATE_REQUESTING,
    payload: {
      notice,
    },
  };
}

export function requestUpdateNoticeFailed(error) {
  return {
    type: types.NOTICE_UPDATE_REQUEST_FAILED,
    payload: {
      error,
    },
  };
}

export function receiveUpdateNotice(notice, tags) {
  return {
    type: types.NOTICE_UPDATE_RECEIVED,
    payload: {
      notice,
      tags,
    },
  };
}

export function changeNoticeItemsPosition(notices) {
  return {
    type: types.CHANGE_NOTICE_ITEMS_POSITION_REQUESTING,
    payload: {
      notices,
    },
  };
}

export function requestDeleteNotice(id) {
  return {
    type: types.NOTICE_DELETE_REQUESTING,
    payload: {
      id,
    },
  };
}

export function requestDeleteNoticeFailed(error) {
  return {
    type: types.NOTICE_DELETE_FAILED,
    payload: {
      error,
    },
  };
}

export function receiveDeleteNotice(id) {
  return {
    type: types.NOTICE_DELETE_RECEIVED,
    payload: {
      id,
    },
  };
}
