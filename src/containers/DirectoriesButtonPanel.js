import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { getSelectedDirectoryId } from '../reducers/uiReducer';
import { changeNewDirectoryParentId } from '../actions/ui';
import { getRootDirectoryId } from '../redux-modules/directories/selectors';
import { deleteDirectoryRequest } from '../redux-modules/directories/actions';
import DirectoriesButtonPanelPresenter from '../components/DirectoriesButtonPanel';

class DirectoriesButtonPanel extends React.Component {
    onAddClicked = () => {
      const { selectedDirectoryId, onAddNew, rootDirectoryId } = this.props;
      if (selectedDirectoryId) {
        onAddNew(selectedDirectoryId);
      } else {
        onAddNew(rootDirectoryId);
      }
    }

    onDeleteClicked = () => {
      const { selectedDirectoryId, onRemove } = this.props;
      if (selectedDirectoryId) {
        onRemove(selectedDirectoryId);
      }
    }

    render() {
      const { selectedDirectoryId } = this.props;
      return (
        <DirectoriesButtonPanelPresenter
          onAddClicked={this.onAddClicked}
          onDeleteClicked={this.onDeleteClicked}
          isDeleteDisabled={selectedDirectoryId === null}
        />
      );
    }
}

function mapStoreToProps(store) {
  return {
    selectedDirectoryId: getSelectedDirectoryId(store),
    rootDirectoryId: getRootDirectoryId(store),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onAddNew: (parentDirectoryId) => {
      dispatch(changeNewDirectoryParentId(parentDirectoryId));
    },
    onRemove: (directoryId) => {
      dispatch(deleteDirectoryRequest(directoryId));
    },
  };
}

DirectoriesButtonPanel.defaultProps = {
  selectedDirectoryId: null,
  rootDirectoryId: null,
};

DirectoriesButtonPanel.propTypes = {
  selectedDirectoryId: PropTypes.number,
  rootDirectoryId: PropTypes.number,
  onRemove: PropTypes.func.isRequired,
  onAddNew: PropTypes.func.isRequired,
};

export default connect(mapStoreToProps, mapDispatchToProps)(DirectoriesButtonPanel);
