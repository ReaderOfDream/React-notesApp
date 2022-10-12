import { createSelector } from 'reselect';
import { getAllTags } from '../tags/selectors';
import { getSearchFilter, getSelectedDirectoryId } from '../../reducers/uiReducer';
import * as constants from './const';

const getNormalizedNotices = state => state[constants.NOTICES];
const getNoticeById = (state, id) => getNormalizedNotices(state)[id];
const getNotices = state => Object.values(state[constants.NOTICES]);

export const getAllNotes = createSelector(
  [getNormalizedNotices, getAllTags],
  getDenormalizedNotes,
);

export const getNotice = createSelector(
  [getNoticeById, getAllTags],
  getDenormalizedNote,
);

const getFilteredNormalizedNotices = createSelector(
  [getSelectedDirectoryId, getNotices],
  (filter, notes) => notes.filter(i => i.directoryId === filter),
);

export const getFilteredNotices = createSelector(
  [getFilteredNormalizedNotices, getAllTags],
  (notes, tags) => notes.map(i => getDenormalizedNote(i, tags)),
);

export const getSearchedNotices = createSelector(
  [getSearchFilter, getAllNotes],
  (searchFilter, notes) => {
    let filteredNotes = notes;

    if (!searchFilter || !searchFilter.text) {
      return [];
    }

    if (searchFilter.isAdvancedSearch) {
      filteredNotes = advancedSearch(searchFilter.text, filteredNotes);
    } else {
      filteredNotes = simpleSearch(searchFilter.text, filteredNotes);
    }

    return filteredNotes;
  },
);

function getDenormalizedNotes(notices, tags) {
  const ids = Object.keys(notices);

  const denormalizedNotes = ids.map(i => getDenormalizedNote(notices[i], tags));

  return denormalizedNotes;
}

function getDenormalizedNote(stateNotice, tags) {
  if (!stateNotice) {
    return null;
  }

  const notice = { ...stateNotice };

  notice.tags = notice.tags.map(tId => tags.find(t => t.id === tId));
  return notice;
}

function regexMatchAnyInArray(array, regex) {
  let tagRegexResult;
  array.forEach((item) => {
    if (!tagRegexResult) {
      tagRegexResult = regex.exec(item.name);
    }
  });

  return tagRegexResult && tagRegexResult.index >= 0;
}

function advancedSearch(searchText, notes) {
  const regex = new RegExp(searchText, 'i');
  return notes.filter((i) => {
    const regexTagsRes = regexMatchAnyInArray(i.tags, regex);
    const regexDescriptionRes = regex.exec(i.description);
    return (regexTagsRes) || (regexDescriptionRes && regexDescriptionRes.index >= 0);
  });
}

function simpleSearch(searchText, notes) {
  const regex = new RegExp(searchText, 'i');
  return notes.filter((i) => {
    const regexRes = regex.exec(i.title);
    return regexRes && regexRes.index >= 0;
  });
}
