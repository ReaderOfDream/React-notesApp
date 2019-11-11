import React from 'react';
import { PropTypes } from 'prop-types';
import Select from 'react-select/lib/Creatable';
import styled from 'styled-components';

const NoteItem = (props) => {
  const {
    tags, selectedTags, onTitleChange, title, onDescriptionChange, isValidTitle,
    description, onTagChange, onBackClicked, onSaveClicked, buttonName,
  } = props;
  const options = tags.map(tag => ({ value: tag.id, label: tag.name }));

  const saveButtonOpt = {};
  if (!isValidTitle()) {
    saveButtonOpt.disabled = 'disabled';
  }

  return (
    <form className="note-item-form">
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          className={`form-control${!isValidTitle() ? ' is-invalid' : ''}`}
          placeholder="Enter title"
          onChange={onTitleChange}
          value={title}
          required
        />
        {!isValidTitle()
            && (
              <div className="invalid-feedback">
                Please provide a title.
              </div>
            )
        }
      </div>
      <div className="form-group">
        <label htmlFor="desc">Description</label>
        <textarea
          rows="10"
          type="text"
          id="desc"
          className="form-control"
          placeholder="Enter description"
          onChange={onDescriptionChange}
          value={description}
        />
      </div>
      <div className="form-group">
        <label htmlFor="tags">Tags</label>
        <Select
          isMulti
          isClearable
          isSearchable
          placeholder="choose tags"
          onChange={onTagChange}
          value={selectedTags}
          options={options}
        />
      </div>
      <button type="button" className="btn btn-primary" onClick={onBackClicked}>Back</button>
      <SaveButton type="button" {...saveButtonOpt} className="btn btn-success" onClick={onSaveClicked}>{buttonName}</SaveButton>
    </form>
  );
};

const SaveButton = styled.button`
    float: right;
`;

NoteItem.defaultProps = {
  title: '',
  description: '',
  selectedTags: [],
  tags: [],
};

NoteItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  selectedTags: PropTypes.arrayOf(PropTypes.object),
  tags: PropTypes.arrayOf(PropTypes.object),
  buttonName: PropTypes.string.isRequired,
  onBackClicked: PropTypes.func.isRequired,
  onSaveClicked: PropTypes.func.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onDescriptionChange: PropTypes.func.isRequired,
  onTagChange: PropTypes.func.isRequired,
  isValidTitle: PropTypes.func.isRequired,
};

export default NoteItem;
