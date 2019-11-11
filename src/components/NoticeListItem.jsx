import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import TextInput from './TextInput';

const NoticeListItem = (props) => {
  const {
    onDeleteClicked, notice, onClicked, onNameClicked, editMode, onInputCompleted, onCancelled,
    name,
  } = props;

  return (
    <NoticeListItemBox>
      <NoticeListItemIcon>
        <i className="far fa-sticky-note fa-3x" onClick={onClicked} />
        <i className="far fa-times-circle fa-lg remove-note" onClick={onDeleteClicked} />
      </NoticeListItemIcon>
      <div>
        { editMode
          ? (
            <TextInput
              text={name}
              onInputCompleted={onInputCompleted}
              onInputCanceled={onCancelled}
            />)
          : (<span onDoubleClick={onNameClicked}>{notice.title}</span>)
        }
      </div>
    </NoticeListItemBox>);
};

const NoticeListItemIcon = styled.div`
    padding: 5px;
    position: relative;
`;

const NoticeListItemBox = styled.div`
    text-align: center;
    color: black;
    cursor: pointer;
`;

NoticeListItem.propTypes = {
  name: PropTypes.string.isRequired,
  onInputCompleted: PropTypes.func.isRequired,
  onCancelled: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
  onDeleteClicked: PropTypes.func.isRequired,
  notice: PropTypes.shape({ title: PropTypes.string }).isRequired,
  onClicked: PropTypes.func.isRequired,
  onNameClicked: PropTypes.func.isRequired,
};

export default NoticeListItem;
