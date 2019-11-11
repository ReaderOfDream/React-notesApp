import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import NoticeList from '../components/NoticeList';
import { requestNotices, changeNoticeItemsPosition } from '../redux-modules/notices/actions';
import { getFilteredNotices } from '../redux-modules/notices/selectors';
import BusyIndicator from '../busyComponents/BusyIndicator';
import { getNoticesOperationInProgress, getNoticesLoading } from '../reducers/uiReducer';

const NoticeListContainer = (props) => {
  const { notices, onPositionChanged } = props;
  return (
    <NoticeList
      notices={notices}
      canDrag
      onPositionChanged={onPositionChanged}
    />
  );
};

const mapStateToProps = state => ({
  notices: getFilteredNotices(state),
  isBusy: getNoticesOperationInProgress(state),
  isLoading: getNoticesLoading(state),
});

const mergeProps = (stateProps, dispatchProps) => {
  const { notices } = stateProps;
  const { dispatch } = dispatchProps;

  return {
    ...stateProps,
    onRequestNotes: () => {
      dispatch(requestNotices());
    },
    onPositionChanged: (notice) => {
      const noticeIndex = notices.findIndex(i => i.id === notice.id);
      notices.splice(noticeIndex, 1);
      notices.splice(notice.position, 0, notice);
      notices.forEach((item, index) => {
        if (item.id !== notice.id) {
          item.position = index; // eslint-disable-line no-param-reassign
        }
      });
      dispatch(changeNoticeItemsPosition(notices));
    },
  };
};

NoticeListContainer.propTypes = {
  notices: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number, position: PropTypes.number }),
  ).isRequired,
  onPositionChanged: PropTypes.func.isRequired,
};

const BusyNoticeListContainer = BusyIndicator(NoticeListContainer);

// let LoadingNoticeListContainer = LoadingIndicator(BusyNoticeListContainer)

export default connect(mapStateToProps, null, mergeProps)(BusyNoticeListContainer);
