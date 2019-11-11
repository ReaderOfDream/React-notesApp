import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import { requestAddDirectory, deleteDirectoryRequest, updateDirectoryRequest } from '../redux-modules/directories/actions';
import TreeComponent from '../tree/TreeComponent';
import { getDirectoriesTree, getRootDirectoryId } from '../redux-modules/directories/selectors';
import {
  getDirectoryOperationInProgress, getNewDirectoryParentId,
  getSelectedDirectoryId, getDirectoriesLoading,
} from '../reducers/uiReducer';
import { changeNewDirectoryParentId } from '../actions/ui';
import LoadingIndicator from '../busyComponents/LoadingIndicator';
import BusyIndicator from '../busyComponents/BusyIndicator';

const DirectoriesTree = (props) => {
  const {
    isBusy, selectedDirectoryId, rootDirectoryId, onDirectoryClicked, onAdd, onEdit, onDelete,
    newDirectoryParentId, onChangeNewDirectoryParentId, directories,
  } = props;
  const treeComponent = (
    <TreeComponent
      isOperationInProgress={isBusy}
      selectedDirectoryId={selectedDirectoryId}
      rootDirectoryId={rootDirectoryId}
      onSelect={onDirectoryClicked}
      onAdd={onAdd}
      onEdit={onEdit}
      onDelete={onDelete}
      newDirectoryParentId={newDirectoryParentId}
      onchangeNewDirectoryParentId={onChangeNewDirectoryParentId}
      items={directories}
    />
  );

  return (
    <div>
      {treeComponent}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    directories: getDirectoriesTree(state),
    rootDirectoryId: getRootDirectoryId(state),
    isLoading: getDirectoriesLoading(state),
    isBusy: getDirectoryOperationInProgress(state),
    newDirectoryParentId: getNewDirectoryParentId(state),
    selectedDirectoryId: getSelectedDirectoryId(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onDirectoryClicked: (id) => {
      if (id) {
        dispatch(push(`${id}`));
      } else {
        dispatch(push('/'));
      }
    },
    onAdd: (name, parentFolderId) => {
      dispatch(requestAddDirectory(name, parentFolderId));
    },
    onEdit: (item) => {
      dispatch(updateDirectoryRequest(item));
    },
    onChangeNewDirectoryParentId: (id) => {
      dispatch(changeNewDirectoryParentId(id));
    },

    onDelete: (id) => {
      dispatch(deleteDirectoryRequest(id));
    },
  };
}

DirectoriesTree.defaultProps = {
  newDirectoryParentId: null,
  selectedDirectoryId: null,
};

DirectoriesTree.propTypes = {
  directories: PropTypes.arrayOf(PropTypes.object).isRequired,
  rootDirectoryId: PropTypes.number.isRequired,
  onDirectoryClicked: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isBusy: PropTypes.bool.isRequired,
  newDirectoryParentId: PropTypes.number,
  onChangeNewDirectoryParentId: PropTypes.func.isRequired,
  selectedDirectoryId: PropTypes.number,
};

const BusyDirectoriesTreeContainer = BusyIndicator(DirectoriesTree);

const LoadingDirectoriesTreeContainer = LoadingIndicator(BusyDirectoriesTreeContainer);

export default connect(mapStateToProps, mapDispatchToProps)(LoadingDirectoriesTreeContainer);
