import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import NoteItem from './NoteItem';
import { requestUpdateNotice } from '../redux-modules/notices/actions';
import { getNotice } from '../redux-modules/notices/selectors';

class EditNoteContainer extends Component {
    onSaveClicked = (newNote) => {
      const { note, onSave } = this.props;
      newNote.id = note.id; // eslint-disable-line no-param-reassign
      onSave(newNote);
    }

    render() {
      const { note } = this.props;

      if (note) {
        return (
          <NoteItem
            note={note}
            onSaveClicked={this.onSaveClicked}
            buttonName="Save"
          />
        );
      }
      return <span>Loading...</span>;
    }
}

function mapStateToProps(state, ownProps) {
  const noteId = ownProps.match.params.id;
  return {
    note: getNotice(state, noteId),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSave: note => dispatch(requestUpdateNotice(note)),
  };
}

EditNoteContainer.defaultProps = {
  note: { id: 0 },
};

EditNoteContainer.propTypes = {
  note: PropTypes.shape({ id: PropTypes.number }),
  onSave: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditNoteContainer);
