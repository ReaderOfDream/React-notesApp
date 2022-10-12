import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { push } from 'connected-react-router';
import { Routes } from '../common/constants';
import NoticeListItemPresenter from '../components/NoticeListItem';
import { requestDeleteNotice, requestUpdateNotice } from '../redux-modules/notices/actions';
import DraggableSourceNotice from './DraggableSourceNotice';

class NoticeListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
    };
  }

  getItem() {
    const { notice, onDeleteClicked, onClicked } = this.props;
    const { editMode } = this.state;
    return (
      <NoticeListItemPresenter
        name={notice.title}
        editMode={editMode}
        notice={notice}
        onDeleteClicked={onDeleteClicked}
        onClicked={onClicked}
        onNameClicked={this.onNameClicked}
        onInputCompleted={this.onInputCompleted}
        onCancelled={this.onCancelled}
      />
    );
  }

  onInputCompleted = (newName) => {
    const { onRename, notice } = this.props;

    this.setState({
      editMode: false,
    });

    notice.title = newName;

    onRename(notice);
  }

  onCancelled = () => {
    this.setState({
      editMode: false,
    });
  }

  onNameClicked = () => {
    this.setState(prevState => ({
      editMode: !prevState.editMode,
    }));
  };

  wrapWithDragSource(comp) {
    const { notice } = this.props;
    return (
      <DraggableSourceNotice notice={notice}>
        {comp}
      </DraggableSourceNotice>);
  }

  render() {
    const item = this.getItem();
    const { canDrag } = this.props;
    return (
      <div className="note-list-item">
        {canDrag
          ? this.wrapWithDragSource(item)
          : item
        }
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    notice: ownProps.notice,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onDeleteClicked: (e) => {
      e.preventDefault();
      dispatch(requestDeleteNotice(ownProps.notice.id));
    },
    onClicked: (notice) => {
      dispatch(push(`${notice.directoryId}/${Routes.noticePath}/${notice.id}`));
    },
    onRename: (notice) => {
      dispatch(requestUpdateNotice(notice));
    },
  };
}

function mergeProps(state, dispatchProps, ownProps) {
  const { notice } = state;

  return {
    ...state,
    ...ownProps,
    ...dispatchProps,
    onClicked: () => {
      dispatchProps.onClicked(notice);
    },
  };
}

NoticeListItem.propTypes = {
  onDeleteClicked: PropTypes.func.isRequired,
  onClicked: PropTypes.func.isRequired,
  notice: PropTypes.shape({}).isRequired,
  canDrag: PropTypes.bool.isRequired,
  onRename: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(NoticeListItem);
