export const SEARCH = 'SEARCH';
export function search(text, advancedMode) {
  return {
    type: SEARCH,
    payload: {
      text,
      advancedMode,
    },
  };
}

export const CHANGE_NEW_DIRECTORY_PARENT_ID = 'CHANGE_NEW_DIRECTORY_PARENT_ID';
export function changeNewDirectoryParentId(parentDirectoryId) {
  return {
    type: CHANGE_NEW_DIRECTORY_PARENT_ID,
    payload: {
      parentId: parentDirectoryId,
    },
  };
}
