import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import { push } from 'connected-react-router';
import styled from 'styled-components';
import { getSelectedDirectoryId } from '../reducers/uiReducer';
import { Routes } from '../common/constants';
import Button from '../components/Button';

const AddNoteLink = (props) => {
  const { selectedDirectoryId, onClicked } = props;
  const disabled = !selectedDirectoryId;
  const toolTipText = !selectedDirectoryId ? 'Choose directory first' : 'Add notice';

  return (
    <DivContainer>
      <Button onClick={onClicked} data-tip={toolTipText} data-for="addNotice" className={`fas fa-plus-circle fa-lg${disabled ? ' disabled' : ''}`} />
      <ReactTooltip id="addNotice" effect="solid" type="dark" />
    </DivContainer>);
};

function mapStateToProps(state) {
  return {
    selectedDirectoryId: getSelectedDirectoryId(state),
  };
}

function mergeProps(stateProps, dispatchProps) {
  const { selectedDirectoryId } = stateProps;
  const { dispatch } = dispatchProps;

  const disabled = !selectedDirectoryId;

  const onClicked = () => { if (!disabled) { dispatch(push(`/${selectedDirectoryId}/${Routes.noticePath}/add`)); } };

  return {
    ...stateProps,
    onClicked,
  };
}

AddNoteLink.defaultProps = {
  selectedDirectoryId: null,
};

AddNoteLink.propTypes = {
  selectedDirectoryId: PropTypes.number,
  onClicked: PropTypes.func.isRequired,
};

const DivContainer = styled.div`
display: inline-block;
`;

export default connect(mapStateToProps, null, mergeProps)(AddNoteLink);
