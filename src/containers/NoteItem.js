import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { goBack } from 'connected-react-router';
import NoteItem from '../components/NoteItem';
import { getAllTags } from '../redux-modules/tags/selectors';
import { getSelectedDirectoryId, getNoticesOperationInProgress } from '../reducers/uiReducer';
import BusyIndicator from '../busyComponents/BusyIndicator';

const titleRegex = /^([a-zA-Z]|[0-9])+$/;

class NoteItemContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.note && props.note.title,
      description: props.note && props.note.description,
      selectedTags: (props.note
        && props.note.tags.map(i => ({ label: i.id, value: i.name }))) || [],
    };
  }

    onTitleChange = (event) => {
      this.setState({ title: event.target.value });
    }

    onDescriptionChange = (event) => {
      this.setState({ description: event.target.value });
    }

    onSaveClicked = (e) => {
      const { onSaveClicked, directoryId } = this.props;
      const {
        title, description, selectedTags,
      } = this.state;

      onSaveClicked({
        title,
        description,
        directoryId,
        tags: selectedTags.map(i => ({ id: i.value, name: i.value })),
      });
      e.preventDefault();
    }

    onTagChange = (newValue) => {
      this.setState({
        selectedTags: newValue,
      });
    }

    isValidTitle = () => {
      const { title } = this.state;
      return titleRegex.test(title);
    }

    render() {
      const { tags, buttonName, onBackClicked } = this.props;
      const { title, description, selectedTags } = this.state;
      return (
        <NoteItem
          title={title}
          description={description}
          selectedTags={selectedTags}
          tags={tags}
          buttonName={buttonName}
          onBackClicked={onBackClicked}
          onSaveClicked={this.onSaveClicked}
          onTitleChange={this.onTitleChange}
          onDescriptionChange={this.onDescriptionChange}
          onTagChange={this.onTagChange}
          isValidTitle={this.isValidTitle}
        />);
    }
}

function mapStateToProps(state) {
  return {
    tags: getAllTags(state),
    directoryId: getSelectedDirectoryId(state),
    isBusy: getNoticesOperationInProgress(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onBackClicked: () => {
      dispatch(goBack());
    },
  };
}

NoteItemContainer.defaultProps = {
  note: { title: '', description: '', tags: [] },
  tags: [],
};

NoteItemContainer.propTypes = {
  note: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string, name: PropTypes.string })),
  }),
  tags: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string, name: PropTypes.string })),
  buttonName: PropTypes.string.isRequired,
  directoryId: PropTypes.number.isRequired,
  onSaveClicked: PropTypes.func.isRequired,
  onBackClicked: PropTypes.func.isRequired,
};

const BusyWrapper = BusyIndicator(NoteItemContainer);

export default connect(mapStateToProps, mapDispatchToProps)(BusyWrapper);
