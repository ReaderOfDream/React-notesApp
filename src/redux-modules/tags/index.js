import { NOTICES_RECEIVED, NOTICE_ADD_RECEIVED, NOTICE_UPDATE_RECEIVED } from '../notices/types';

export function tagsReducer(state = {}, action) {
  switch (action.type) {
    case NOTICES_RECEIVED:
      return {
        ...state,
        ...action.payload.tags,
      };
    case NOTICE_ADD_RECEIVED:
      return {
        ...state,
        ...action.payload.tags,
      };
    case NOTICE_UPDATE_RECEIVED:
      return {
        ...state,
        ...action.payload.tags,
      };
    default: return state;
  }
}
