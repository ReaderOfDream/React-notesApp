import React from 'react';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import { PropTypes } from 'prop-types';
import Button from './Button';

const DirectoriesButtonPanel = (props) => {
  const { isDeleteDisabled, onAddClicked, onDeleteClicked } = props;

  const deleteTooltip = isDeleteDisabled ? 'Choose directory first' : 'Delete directory';
  return (
    <ButtonPanel>
      <Button data-tip="Add directory" data-for="addDirectory" onClick={onAddClicked} className="fas fa-plus-circle fa-lg" />
      <Button data-tip={deleteTooltip} data-for="deleteDirectory" onClick={onDeleteClicked} className={`fas fa-trash-alt fa-lg${isDeleteDisabled ? ' disabled' : ''}`} />
      <ReactTooltip id="addDirectory" place="top" effect="solid" type="dark" />
      <ReactTooltip id="deleteDirectory" place="top" effect="solid" type="dark" />
    </ButtonPanel>);
};

const ButtonPanel = styled.div`
    display: inline-block;
    margin: 5px;
`;

DirectoriesButtonPanel.propTypes = {
  onAddClicked: PropTypes.func.isRequired,
  onDeleteClicked: PropTypes.func.isRequired,
  isDeleteDisabled: PropTypes.bool.isRequired,
};

export default DirectoriesButtonPanel;
