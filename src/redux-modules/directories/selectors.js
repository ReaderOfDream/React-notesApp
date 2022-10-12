import { createSelector } from 'reselect';
import * as constants from './const';

export const getDirectories = state => state[constants.DIRECTORIES];

// PUBLIC SELECTORS
export const getDirectoriesTree = createSelector(
  getDirectories,
  (items) => {
    if (items.length <= 1) {
      return [];
    }

    if (items[0].name !== constants.RootDirectoryName) {
      console.error('invalid folder structure'); // eslint-disable-line
      return [];
    }

    const tree = composeTree(items);
    return tree[0].children || [];
  },
);

export const getRootDirectoryId = createSelector(
  state => state[constants.ROOT_DIRECTORY_ID],
  item => item,
);

function composeTree(arr) {
  const cloneArr = arr.map(i => Object.assign({}, i));
  const foldersDic = cloneArr.reduce((acc, curr) => {
    acc[curr.id] = curr;
    return acc;
  }, {});

  const resultArray = [];

  cloneArr.forEach((i) => {
    if (i.parentId) {
      const parent = foldersDic[i.parentId];
      if (parent) {
        parent.children = parent.children || [];
        parent.children.push(i);
      }
    } else {
      resultArray.push(i);
    }
  });

  return resultArray;
}
