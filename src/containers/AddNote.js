import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { requestAddNotice } from '../redux-modules/notices/actions';
import NoteItem from './NoteItem';

const AddNoteContainer = props => (
  <NoteItem
    onSaveClicked={props.onAddClicked} // eslint-disable-line react/destructuring-assignment
    buttonName="Add"
  />
);

function mapDispatchToProps(dispatch) {
  return {
    onAddClicked: (note) => { dispatch(requestAddNotice(note)); },
  };
}

AddNoteContainer.propTypes = {
  onAddClicked: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(AddNoteContainer);
