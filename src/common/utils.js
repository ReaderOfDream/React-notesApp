export function getErrorMessageFromException(e) {
  const message = (e.response && e.response.data) || e.message;
  return message;
}

export function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export function hasItemWithIdInTree(id, item, getChildren, getId) {
  if (getId(item) === id) {
    return true;
  }

  const children = getChildren(item);

  if (children) {
    return children.some(i => hasItemWithIdInTree(id, i, getChildren, getId));
  }

  return false;
}
