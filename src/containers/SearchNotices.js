import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import NoticeList from '../components/NoticeList';
import { getSearchedNotices } from '../redux-modules/notices/selectors';
import { getSearchFilter } from '../reducers/uiReducer';

const SearchNoticesContainer = (props) => {
  const { notices } = props;
  return (
    <NoticeList
      notices={notices}
      canDrag={false}
    />
  );
};

const mapStateToProps = (state) => {
  const searchFilter = getSearchFilter(state);
  return {
    notices: getSearchedNotices(state,
      {
        text: searchFilter ? searchFilter.text : '',
        isAdvancedSearch: (searchFilter && searchFilter.isAdvancedSearch) || false,
      }),
  };
};

SearchNoticesContainer.propTypes = {
  notices: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, null)(SearchNoticesContainer);
