import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { PropTypes } from 'prop-types';
import SearchBar from '../components/SearchBar';
import { getAllTags } from '../redux-modules/tags/selectors';
import { getAllNotes } from '../redux-modules/notices/selectors';
import { ENTER_KEY_CODE } from '../common/constants';
import { getSearchFilter } from '../reducers/uiReducer';

const WAIT_INTERVAL = 1000;

class SearchBarContainer extends React.Component {
  constructor(props) {
    super(props);
    this.timer = null;
    this.state = {
      searchText: props.searchText,
      isAdvancedSearch: props.isAdvancedSearch,
    };
  }

    onModeToggle = (e) => {
      const val = e.target.checked;
      const { searchText } = this.state;
      this.setState({
        isAdvancedSearch: val,
      });

      if (searchText) {
        this.triggerChange(searchText, val);
      }
    }

    onChange = (e) => {
      const { value } = e.target;
      const { isAdvancedSearch } = this.state;
      clearTimeout(this.timer);
      this.setState({
        searchText: value,
      });
      this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL, value, isAdvancedSearch);
    }

    triggerChange = (searchText, isAdvancedSearch) => {
      const { onChange } = this.props;
      onChange(searchText, isAdvancedSearch);
    }

    onSelected = (val) => {
      const { isAdvancedSearch } = this.state;
      this.setState({
        searchText: val,
      });
      this.triggerChange(val, isAdvancedSearch);
    }

    onKeyUp = (e) => {
      const { isAdvancedSearch, searchText } = this.state;
      if (e.keyCode === ENTER_KEY_CODE) {
        clearTimeout(this.timer);
        this.triggerChange(searchText, isAdvancedSearch);
      }
    }

    render() {
      const { isAdvancedSearch, searchText } = this.state;
      const { tags, notes } = this.props;
      let items;
      if (isAdvancedSearch) {
        items = tags.map(i => ({ name: i.name, type: 'tag' })).concat(notes.map(i => ({ name: i.description, type: 'note' })));
      } else {
        items = notes.map(i => ({ name: i.title }));
      }

      return (
        <SearchBar
          items={items}
          searchText={searchText}
          onSelected={this.onSelected}
          toggle={isAdvancedSearch}
          onChange={this.onChange}
          onKeyUp={this.onKeyUp}
          onToggleChange={this.onModeToggle}
        />
      );
    }
}

function mapStateToProps(state) {
  const searchProps = getSearchFilter(state);
  return {
    notes: getAllNotes(state),
    tags: getAllTags(state),
    searchText: searchProps ? searchProps.text : '',
    isAdvancedSearch: (searchProps && searchProps.isAdvancedSearch) || false,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onChange: (text, advancedMode) => {
      dispatch(push(`/search?q=${text}&advancedMode=${advancedMode}`, { text, advancedMode }));
    },
  };
}

SearchBarContainer.defaultProps = {
  searchText: '',
};

SearchBarContainer.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({ title: PropTypes.string })).isRequired,
  tags: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })).isRequired,
  searchText: PropTypes.string,
  isAdvancedSearch: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBarContainer);
