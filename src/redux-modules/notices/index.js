import {
  NOTICES_RECEIVED, NOTICE_ADD_RECEIVED, NOTICE_UPDATE_RECEIVED, NOTICE_DELETE_RECEIVED,
} from './types';
import { NOTICES } from './const';

export { NOTICES };

export function noticesReducer(state = {}, action) {
  let newState;
  let notice;
  switch (action.type) {
    case NOTICES_RECEIVED:
      return {
        ...action.payload.notices,
      };
    case NOTICE_ADD_RECEIVED:
      notice = action.payload.notice; // eslint-disable-line prefer-destructuring
      return Object.assign({}, state, { [notice.id]: notice });
    case NOTICE_UPDATE_RECEIVED:
      notice = action.payload.notice; // eslint-disable-line prefer-destructuring
      return Object.assign({}, state, { [notice.id]: notice });
    case NOTICE_DELETE_RECEIVED:
      newState = { ...state };
      delete newState[action.payload.id];
      return newState;
    default:
      return state;
  }
}
