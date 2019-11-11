import * as constants from './const';

export function getAllTags(state) {
  return Object.values(state[constants.TAGS]);
}
